# BhokBhoj - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running (if applicable)

---

## 📦 Installation

```bash
# Navigate to the frontend directory
cd Frontend/mitho_bites

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will start on **http://localhost:5173** (or 5174 if 5173 is in use)

---

## 🎨 What's New in BhokBhoj

### Rebranding Complete ✅
- **Brand Name:** MithoBites → BhokBhoj
- **Color Scheme:** Orange/Red → Teal/Amber/Burgundy
- **Hero Section:** Multi-image slider → Single hero image
- **All Features:** Preserved and working

### New Color Palette
```css
Primary:    #008B8B (Deep Teal)
Secondary:  #FFA500 (Warm Amber)
Accent:     #8B0000 (Rich Burgundy)
Background: #FFF8DC (Cream)
```

---

## 🔧 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Testing
```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
```

### Linting
```bash
npm run lint         # Run ESLint
```

---

## 📁 Project Structure

```
Frontend/mitho_bites/
├── src/
│   ├── api/              # API calls
│   ├── assets/           # Images, fonts, etc.
│   ├── auth/             # Authentication logic
│   ├── components/       # Reusable components
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Layout components
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin pages
│   │   └── client/       # Client pages
│   ├── routers/          # Routing configuration
│   ├── services/         # Business logic
│   ├── state_manage/     # State management
│   └── utils/            # Utility functions
├── public/               # Static assets
└── index.html           # Entry HTML file
```

---

## 🔐 User Roles

### Admin Access
- **Route:** `/admin/adminpage`
- **Features:**
  - User Management
  - Product Management
  - Category Management
  - Restaurant Management
  - Order Management
  - Transaction History
  - Business Analytics

### Regular User Access
- **Route:** `/dashboard`
- **Features:**
  - Browse Menu
  - Add to Cart
  - Place Orders
  - Order History
  - Profile Management
  - Settings

---

## 🌐 Key Routes

### Public Routes
```
/                    # Homepage
/menu                # Browse Menu
/about               # About Page
/contact             # Contact Page
/login               # Login Page
/register            # Signup Page
```

### User Routes (Protected)
```
/dashboard           # User Dashboard
/cart                # Shopping Cart
/paymentmethod       # Payment Options
/settings            # User Settings
/more/profile        # User Profile
/more/update-profile # Update Profile
```

### Admin Routes (Protected)
```
/admin/adminpage              # Admin Dashboard
/admin/users                  # User Management
/admin/users/create           # Create User
/admin/users/:id/edit         # Edit User
/admin/product                # Product Management
/admin/category               # Category Management
/admin/category/create        # Create Category
/admin/restaurant             # Restaurant Management
/admin/restaurant/create      # Create Restaurant
/admin/transaction-history    # Transactions
/admin/business-rise-flows    # Analytics
```

---

## 🎯 Features

### For Customers
- ✅ Browse restaurants and menus
- ✅ Search and filter food items
- ✅ Add items to cart
- ✅ Place orders
- ✅ Track order history
- ✅ Update profile
- ✅ Multiple payment methods
- ✅ Real-time notifications

### For Admins
- ✅ Manage users
- ✅ Manage products
- ✅ Manage categories
- ✅ Manage restaurants
- ✅ View transactions
- ✅ Business analytics
- ✅ Order management

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically try 5174, 5175, etc.

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear cache and rebuild
npm run build -- --force
```

### Hot Reload Not Working
```bash
# Restart the dev server
# Press Ctrl+C to stop
npm run dev
```

---

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=BhokBhoj
```

---

## 🔄 Recent Updates

### v1.0.0 - BhokBhoj Rebrand
- ✅ Complete rebranding from MithoBites to BhokBhoj
- ✅ New color scheme implementation
- ✅ Single hero image design
- ✅ Fixed CreateUser component
- ✅ Updated all CSS files
- ✅ All features working

---

## 📞 Support

### Documentation
- `REBRANDING_SUMMARY.md` - Complete rebranding details
- `COLOR_SCHEME_GUIDE.md` - Color palette reference
- `DEPLOYMENT_CHECKLIST.md` - Deployment guide
- `FIXED_ISSUES.md` - Recent bug fixes

### Need Help?
- Check the documentation files
- Review the code comments
- Check browser console for errors
- Verify backend API is running

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` folder.

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

### Traditional Hosting
Upload the contents of the `dist/` folder to your web server.

---

## ✅ Checklist Before Going Live

- [ ] Update logo images with BhokBhoj branding
- [ ] Update favicon
- [ ] Configure environment variables
- [ ] Test all user flows
- [ ] Test all admin functions
- [ ] Verify API connections
- [ ] Check responsive design
- [ ] Test on multiple browsers
- [ ] Set up error tracking
- [ ] Configure analytics

---

## 🎉 You're All Set!

Your BhokBhoj application is ready to serve delicious food! 🍽️

**Current Status:** ✅ Running on http://localhost:5174/

Happy coding! 🚀
