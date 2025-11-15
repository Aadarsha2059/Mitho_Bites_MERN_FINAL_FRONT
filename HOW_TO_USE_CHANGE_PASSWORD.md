# How to Use the ChangePassword Component

## Quick Integration Guide

### Option 1: Add to User Settings Page

```jsx
import React, { useState } from 'react';
import ChangePassword from '../components/authh/ChangePassword';

function UserSettings() {
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="settings-page">
      <h2>Account Settings</h2>
      
      {/* Other settings */}
      
      <div className="security-section">
        <h3>Security</h3>
        <button onClick={() => setShowChangePassword(true)}>
          🔐 Change Password
        </button>
      </div>

      {/* Modal for Change Password */}
      {showChangePassword && (
        <div className="modal-overlay" onClick={() => setShowChangePassword(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ChangePassword onClose={() => setShowChangePassword(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
```

### Option 2: Add to Profile Page

```jsx
import React from 'react';
import ChangePassword from '../components/authh/ChangePassword';

function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-info">
        {/* User profile information */}
      </div>
      
      <div className="password-section">
        <h3>Change Password</h3>
        <ChangePassword onClose={() => console.log('Password changed')} />
      </div>
    </div>
  );
}
```

### Option 3: Standalone Page

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../components/authh/ChangePassword';

function ChangePasswordPage() {
  const navigate = useNavigate();

  return (
    <div className="change-password-page">
      <ChangePassword onClose={() => navigate('/profile')} />
    </div>
  );
}

export default ChangePasswordPage;
```

## Modal Overlay CSS (if using modal)

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-overlay > div {
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}
```

## Example: Complete Settings Page Integration

```jsx
// src/pages/client/Settings.jsx
import React, { useState } from 'react';
import ChangePassword from '../../components/authh/ChangePassword';
import './Settings.css';

export default function Settings() {
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>⚙️ Account Settings</h1>
        <p>Manage your BHOKBHOJ account preferences</p>
      </div>

      <div className="settings-sections">
        {/* Profile Section */}
        <div className="settings-card">
          <h2>👤 Profile Information</h2>
          <button className="edit-btn">Edit Profile</button>
        </div>

        {/* Security Section */}
        <div className="settings-card">
          <h2>🔐 Security</h2>
          <p>Keep your account secure</p>
          <button 
            className="change-password-btn"
            onClick={() => setShowChangePassword(true)}
          >
            Change Password
          </button>
        </div>

        {/* Notifications Section */}
        <div className="settings-card">
          <h2>🔔 Notifications</h2>
          <button className="edit-btn">Manage Notifications</button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowChangePassword(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ChangePassword 
              onClose={() => setShowChangePassword(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

## Router Setup (if creating standalone page)

```jsx
// src/routers/AppRouter.jsx
import ChangePasswordPage from '../pages/ChangePasswordPage';

// Add to your routes
<Route path="/change-password" element={<ChangePasswordPage />} />
```

## Component Props

### ChangePassword Component

```typescript
interface ChangePasswordProps {
  onClose?: () => void;  // Callback when user closes or completes
}
```

## Features Included

✅ Old password verification  
✅ New password with strength indicator  
✅ Confirm password validation  
✅ Real-time feedback  
✅ Loading states  
✅ Error handling  
✅ Success notifications  
✅ Email confirmation  
✅ Modern UI with BHOKBHOJ branding  

## User Flow

1. User clicks "Change Password" button
2. Modal/form appears with ChangePassword component
3. User enters current password
4. User enters new password (sees strength indicator)
5. User confirms new password
6. User clicks "Change Password" button
7. System validates old password
8. System updates password
9. User sees success message
10. User receives confirmation email
11. Modal closes (if using onClose callback)

## Styling Tips

The component comes with its own CSS (`ChangePassword.css`), but you can customize:

```css
/* Override modal background */
.modal-overlay {
  background: rgba(20, 184, 166, 0.2);
  backdrop-filter: blur(8px);
}

/* Customize button in settings */
.change-password-btn {
  background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.change-password-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.3);
}
```

## Testing

```javascript
// Test the component
import { render, screen, fireEvent } from '@testing-library/react';
import ChangePassword from './ChangePassword';

test('renders change password form', () => {
  render(<ChangePassword />);
  expect(screen.getByText('Change Password')).toBeInTheDocument();
});

test('validates old password', async () => {
  render(<ChangePassword />);
  const submitBtn = screen.getByText('Change Password');
  fireEvent.click(submitBtn);
  expect(await screen.findByText('Current password is required')).toBeInTheDocument();
});
```

## Common Issues & Solutions

### Issue: Component not showing
**Solution:** Check that you've imported the component correctly and the modal overlay is visible.

### Issue: Password not updating
**Solution:** Ensure user is authenticated and token is valid in localStorage/cookies.

### Issue: Email not sending
**Solution:** Check backend EMAIL_USER and EMAIL_PASS environment variables.

### Issue: Styling conflicts
**Solution:** The component uses scoped CSS classes. Check for naming conflicts.

## Best Practices

1. **Always use in authenticated routes** - User must be logged in
2. **Handle onClose callback** - Close modal or navigate after success
3. **Show loading states** - Component handles this automatically
4. **Test email delivery** - Verify confirmation emails work
5. **Mobile responsive** - Component is responsive by default

## Example: Full Implementation in Settings

See the complete example in `src/pages/client/Settings.jsx` for a production-ready implementation with:
- Modal overlay
- Proper state management
- Error handling
- Success feedback
- Mobile responsive design

---

**Ready to use!** Just import the component and add it to your desired page. 🚀
