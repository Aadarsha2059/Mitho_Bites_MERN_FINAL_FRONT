# Burp Suite Embedded Browser Setup

## Access Frontend in Burp Suite Embedded Browser

The frontend is configured to be accessible from Burp Suite's embedded browser.

## Configuration

### Vite Server Settings
- **Host:** `0.0.0.0` (allows external connections)
- **Port:** `5173`
- **CORS:** Enabled
- **Proxy:** Disabled by default (for Burp Suite interception)

## How to Access in Burp Suite

### Method 1: Direct Access
1. Open **Burp Suite Pro**
2. Go to **Proxy** → **Intercept** (or use HTTP history)
3. In Burp Suite's embedded browser, navigate to:
   ```
   http://localhost:5173
   ```
   or
   ```
   http://127.0.0.1:5173
   ```

### Method 2: Via Burp Suite Proxy
1. Configure Burp Suite proxy: `127.0.0.1:8080`
2. In Burp Suite embedded browser, visit:
   ```
   http://localhost:5173
   ```
3. All requests will be intercepted by Burp Suite

## Troubleshooting

### Issue: Can't Access localhost:5173 in Burp Suite Browser

**Solution 1: Check Vite Server is Running**
```bash
cd Frontend/mitho_bites
npm run dev
```

You should see:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://0.0.0.0:5173/
```

**Solution 2: Try 127.0.0.1 Instead**
If `localhost` doesn't work, try:
```
http://127.0.0.1:5173
```

**Solution 3: Check Firewall**
- Windows Firewall might be blocking port 5173
- Allow Node.js through firewall

**Solution 4: Check Burp Suite Proxy Settings**
- Make sure Burp Suite proxy is running
- Check Proxy → Options → Proxy Listeners
- Should show "Running" on port 8080

## Verify It's Working

1. Start Vite dev server: `npm run dev`
2. Open Burp Suite
3. In Burp Suite embedded browser, visit: `http://localhost:5173`
4. You should see your frontend application
5. Try registering/login - requests will appear in Burp Suite

## Notes

- The frontend is accessible on `0.0.0.0:5173` (all network interfaces)
- This allows Burp Suite's embedded browser to connect
- API requests go directly to `http://localhost:5050/api` (bypassing Vite proxy)
- All API requests will be intercepted by Burp Suite when proxy is configured

