# HTTPS Setup for Frontend Development

## Current Status

The frontend is configured to use HTTPS with self-signed SSL certificates for development.

## Browser "Not Secure" Warning

**This is normal and expected** for self-signed certificates. The browser shows "Not Secure" because the certificate is not issued by a trusted Certificate Authority (CA).

## How to Accept the Certificate

### Chrome/Edge:
1. When you see "Your connection is not private" page
2. Click **"Advanced"** button
3. Click **"Proceed to localhost (unsafe)"** or **"Continue to localhost"**
4. The site will load with HTTPS (you'll see a lock icon with a warning, but it's encrypted)

### Firefox:
1. When you see "Warning: Potential Security Risk Ahead"
2. Click **"Advanced"** button
3. Click **"Accept the Risk and Continue"**
4. The site will load with HTTPS

### Safari:
1. When you see "This Connection Is Not Private"
2. Click **"Show Details"**
3. Click **"visit this website"**
4. Click **"Visit Website"** in the confirmation dialog

## Generate New Certificates

If certificates are missing or expired, run:

```bash
node generate-ssl-cert.js
```

This will create:
- `ssl/cert.pem` - SSL Certificate
- `ssl/key.pem` - Private Key

## Disable HTTPS (Use HTTP)

If you want to use HTTP instead of HTTPS for development:

1. Remove or rename the `ssl/` directory
2. Restart the dev server
3. Access at: `http://localhost:5173`

## Production

For production, use certificates from a trusted CA like:
- Let's Encrypt (free)
- Cloudflare
- AWS Certificate Manager
- Other commercial CAs

## Current Configuration

- **HTTPS URL**: `https://localhost:5173`
- **HTTP URL**: `http://localhost:5173` (if HTTPS disabled)
- **Certificate Type**: Self-signed (development only)
- **Valid For**: 1 year from generation date
