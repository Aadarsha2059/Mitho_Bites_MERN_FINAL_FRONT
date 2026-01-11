@echo off
REM Generate SSL certificates for React Frontend using OpenSSL (Windows)

echo 🔐 Generating SSL certificates for React Frontend...

REM Create ssl directory if it doesn't exist
if not exist "ssl" mkdir ssl

REM Generate private key
echo 📝 Generating private key (4096 bits)...
openssl genrsa -out ssl\key.pem 4096

REM Generate certificate signing request
echo 📝 Generating certificate signing request...
openssl req -new -key ssl\key.pem -out ssl\cert.csr -subj "/C=NP/ST=Bagmati/L=Kathmandu/O=BHOKBHOJ/OU=Development/CN=localhost"

REM Generate self-signed certificate (valid for 1 year)
echo 📝 Generating self-signed certificate...
openssl x509 -req -days 365 -in ssl\cert.csr -signkey ssl\key.pem -out ssl\cert.pem

REM Clean up CSR file
del ssl\cert.csr

echo.
echo ✅ SSL certificates generated successfully!
echo 📁 Location: Frontend\bhokbhoj\ssl\
echo    - cert.pem (Certificate)
echo    - key.pem (Private Key)
echo.
echo 📋 Certificate Details:
echo    - Common Name: localhost
echo    - Organization: BHOKBHOJ
echo    - Country: Nepal (NP)
echo    - Valid for: 1 year
echo    - Key Size: RSA 4096 bits
echo.
echo ⚠️  Note: These are self-signed certificates for development only.
echo 🚀 Ready to start HTTPS frontend!
echo    Run: npm run dev

pause
