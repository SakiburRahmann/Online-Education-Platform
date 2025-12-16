"""
Utility for generating device fingerprints from request data.
"""
import hashlib
from django.conf import settings


def generate_device_fingerprint(user_agent, ip_address, additional_data=''):
    """
    Generate a device fingerprint based on user agent and IP address.
    This is a server-side fingerprint - client sends browser fingerprint separately.
    
    Args:
        user_agent: Browser user agent string
        ip_address: Client IP address
        additional_data: Any additional data to include in fingerprint
    
    Returns:
        Hashed fingerprint string
    """
    # Combine data
    fingerprint_data = f"{user_agent}|{ip_address}|{additional_data}|{settings.DEVICE_FINGERPRINT_SALT}"
    
    # Hash using SHA256
    fingerprint = hashlib.sha256(fingerprint_data.encode()).hexdigest()
    
    return fingerprint


def get_client_ip(request):
    """Extract client IP address from request."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
