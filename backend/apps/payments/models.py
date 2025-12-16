"""
Payment models for tracking bKash payments and test purchases.
"""
import uuid
from django.db import models
from django.conf import settings


class Payment(models.Model):
    """
    Payment model for tracking test purchases.
    Initially supports manual bKash payment verification.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending Verification'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('bkash', 'bKash'),
        ('nagad', 'Nagad'),
        ('rocket', 'Rocket'),
        ('bank', 'Bank Transfer'),
        ('other', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # User and test relationship
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='payments',
        null=True,
        blank=True,
        help_text="User will be linked after payment verification"
    )
    test = models.ForeignKey(
        'tests.Test',
        on_delete=models.CASCADE,
        related_name='payments'
    )
    
    # Payment details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        default='bkash'
    )
    transaction_id = models.CharField(
        max_length=255,
        blank=True,
        help_text="bKash transaction ID or reference number"
    )
    
    # Contact information (before user account is created)
    contact_name = models.CharField(max_length=255, blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    contact_email = models.EmailField(blank=True)
    
    # Payment screenshot
    screenshot = models.ImageField(
        upload_to='payments/screenshots/',
        blank=True,
        null=True,
        help_text="Screenshot of bKash payment"
    )
    
    # Status and verification
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='verified_payments'
    )
    verification_notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    verified_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        app_label = 'payments'
        db_table = 'payments'
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', '-created_at']),
            models.Index(fields=['user']),
            models.Index(fields=['transaction_id']),
        ]
    
    def __str__(self):
        user_info = self.user.username if self.user else self.contact_name
        return f"Payment #{self.transaction_id} - {user_info} - {self.status}"
    
    @property
    def is_pending(self):
        """Check if payment is pending verification."""
        return self.status == 'pending'
    
    @property
    def is_verified(self):
        """Check if payment is verified."""
        return self.status == 'verified'
    
    def mark_as_verified(self, admin_user, notes=''):
        """Mark payment as verified."""
        from django.utils import timezone
        
        self.status = 'verified'
        self.verified_by = admin_user
        self.verification_notes = notes
        self.verified_at = timezone.now()
        self.save()
    
    def mark_as_rejected(self, admin_user, notes=''):
        """Mark payment as rejected."""
        self.status = 'rejected'
        self.verified_by = admin_user
        self.verification_notes = notes
        self.save()


class UserTestAccess(models.Model):
    """
    Track which tests users have access to (after payment verification).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='test_access'
    )
    test = models.ForeignKey(
        'tests.Test',
        on_delete=models.CASCADE,
        related_name='user_access'
    )
    payment = models.ForeignKey(
        Payment,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='test_access'
    )
    
    # Access control
    is_active = models.BooleanField(default=True)
    granted_at = models.DateTimeField(auto_now_add=True)
    granted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='granted_access'
    )
    
    # Usage tracking
    times_attempted = models.IntegerField(default=0)
    last_attempted_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        app_label = 'payments'
        db_table = 'user_test_access'
        verbose_name = 'User Test Access'
        verbose_name_plural = 'User Test Access'
        unique_together = ['user', 'test']
        ordering = ['-granted_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.test.name}"
    
    def increment_attempts(self):
        """Increment attempt count."""
        from django.utils import timezone
        
        self.times_attempted += 1
        self.last_attempted_at = timezone.now()
        self.save()
