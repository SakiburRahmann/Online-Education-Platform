"""
Admin configuration for Payments app.
"""
from django.contrib import admin
from .models import Payment, UserTestAccess


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    """Admin for Payment model."""
    
    list_display = ('transaction_id', 'get_user_info', 'test', 'amount', 'payment_method', 'status', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('transaction_id', 'contact_name', 'contact_phone', 'user__username')
    ordering = ('-created_at',)
    readonly_fields = ('id', 'created_at', 'updated_at', 'verified_at')
    
    fieldsets = (
        (None, {'fields': ('test', 'amount', 'payment_method', 'transaction_id')}),
        ('User Info', {'fields': ('user', 'contact_name', 'contact_phone', 'contact_email')}),
        ('Payment Proof', {'fields': ('screenshot',)}),
        ('Verification', {'fields': ('status', 'verified_by', 'verification_notes', 'verified_at')}),
        ('Metadata', {'fields': ('id', 'created_at', 'updated_at')}),
    )
    
    def get_user_info(self, obj):
        """Get user information."""
        if obj.user:
            return obj.user.username
        return obj.contact_name or obj.contact_phone or 'N/A'
    get_user_info.short_description = 'User/Contact'
    
    actions = ['mark_as_verified', 'mark_as_rejected']
    
    def mark_as_verified(self, request, queryset):
        """Bulk action to mark payments as verified."""
        count = 0
        for payment in queryset.filter(status='pending'):
            payment.mark_as_verified(request.user, 'Bulk verified from admin')
            count += 1
        self.message_user(request, f'{count} payments marked as verified.')
    mark_as_verified.short_description = 'Mark selected payments as verified'
    
    def mark_as_rejected(self, request, queryset):
        """Bulk action to mark payments as rejected."""
        count = 0
        for payment in queryset.filter(status='pending'):
            payment.mark_as_rejected(request.user, 'Bulk rejected from admin')
            count += 1
        self.message_user(request, f'{count} payments marked as rejected.')
    mark_as_rejected.short_description = 'Mark selected payments as rejected'


@admin.register(UserTestAccess)
class UserTestAccessAdmin(admin.ModelAdmin):
    """Admin for UserTestAccess model."""
    
    list_display = ('user', 'test', 'is_active', 'times_attempted', 'granted_at', 'granted_by')
    list_filter = ('is_active', 'granted_at')
    search_fields = ('user__username', 'test__name')
    ordering = ('-granted_at',)
    readonly_fields = ('id', 'granted_at', 'last_attempted_at')
    
    fieldsets = (
        (None, {'fields': ('user', 'test', 'payment')}),
        ('Access Control', {'fields': ('is_active', 'granted_by')}),
        ('Usage', {'fields': ('times_attempted', 'last_attempted_at')}),
        ('Metadata', {'fields': ('id', 'granted_at')}),
    )
