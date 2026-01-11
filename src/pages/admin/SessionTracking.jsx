import React, { useState, useEffect } from 'react';
import axios from '../../api/api';
import './SessionTracking.css';

const SessionTracking = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fetch all sessions
  const fetchSessions = async () => {
    try {
      const response = await axios.get('/admin/sessions/all-sessions');
      if (response.data.success) {
        setSessions(response.data.data);
        setLastUpdate(new Date().toISOString());
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError(err.response?.data?.message || 'Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  // Real-time updates using Server-Sent Events
  useEffect(() => {
    // Initial fetch
    fetchSessions();

    // Set up real-time connection
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Not authenticated');
      return;
    }

    // EventSource doesn't support custom headers, so pass token as query param
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api'}/admin/sessions/realtime-sessions?token=${encodeURIComponent(token)}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'state_update') {
          setSessions(data.sessions);
          setLastUpdate(data.timestamp);
        } else if (data.type === 'session_created') {
          console.log('New session created:', data.session);
          fetchSessions(); // Refresh list
        } else if (data.type === 'session_ended') {
          console.log('Session ended:', data.sessionId);
          fetchSessions(); // Refresh list
        } else if (data.type === 'activity_updated') {
          console.log('Session activity updated:', data.session);
          fetchSessions(); // Refresh list
        }
      } catch (err) {
        console.error('Error parsing SSE data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      // Fallback to polling if SSE fails
      const interval = setInterval(() => {
        fetchSessions();
      }, 5000);
      
      return () => {
        clearInterval(interval);
        eventSource.close();
      };
    };

    // Polling fallback every 5 seconds
    const pollingInterval = setInterval(() => {
      fetchSessions();
    }, 5000);

    return () => {
      eventSource.close();
      clearInterval(pollingInterval);
    };
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Format time remaining
  const formatTimeRemaining = (minutes) => {
    if (minutes < 0) return 'Expired';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="session-tracking-container">
        <div className="loading">Loading sessions...</div>
      </div>
    );
  }

  return (
    <div className="session-tracking-container">
      <div className="session-header">
        <h1>🔐 Real-Time Session Tracking</h1>
        <div className="session-stats">
          <span className="stat-item">
            <strong>Active Sessions:</strong> {sessions.length}
          </span>
          {lastUpdate && (
            <span className="stat-item">
              <strong>Last Update:</strong> {formatDate(lastUpdate)}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="no-sessions">
          No active sessions found
        </div>
      ) : (
        <div className="sessions-grid">
          {sessions.map((session) => (
            <div key={session._id} className={`session-card ${session.isExpired ? 'expired' : 'active'}`}>
              <div className="session-card-header">
                <div className="session-user-main">
                  <div className="user-info-main">
                    <strong className="username">{session.username || 'Unknown'}</strong>
                    {session.fullname && <span className="fullname">{session.fullname}</span>}
                  </div>
                  <span className={`role-badge ${session.userRole}`}>
                    {session.userRole || 'user'}
                  </span>
                </div>
                <span className={`status-badge ${session.isExpired ? 'expired' : 'active'}`}>
                  {session.isExpired ? 'Expired' : 'Active'}
                </span>
              </div>

              <div className="session-card-body">
                <div className="session-info-row">
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{session.userEmail || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">IP Address:</span>
                    <span className="info-value">{session.ipAddress || 'N/A'}</span>
                  </div>
                </div>

                <div className="session-info-row">
                  <div className="info-item">
                    <span className="info-label">Device:</span>
                    <span className="info-value">{session.deviceType} - {session.browser} ({session.os})</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Time Remaining:</span>
                    <span className={`info-value ${session.timeUntilExpiry.minutes < 5 ? 'warning' : ''}`}>
                      {session.timeUntilExpiry.formatted || formatTimeRemaining(session.timeUntilExpiry.minutes)}
                    </span>
                  </div>
                </div>

                <div className="session-info-row">
                  <div className="info-item">
                    <span className="info-label">Created:</span>
                    <span className="info-value">{formatDate(session.createdAt)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Activity:</span>
                    <span className="info-value">{formatDate(session.lastActivity)}</span>
                  </div>
                </div>

                <div className="session-info-row">
                  <div className="info-item full-width">
                    <span className="info-label">Expires:</span>
                    <span className="info-value">{formatDate(session.expiresAt)}</span>
                  </div>
                </div>

                {session.expressSession ? (
                  <div className="express-session-section">
                    <div className="section-title">🔐 Express-Session Cookie Data</div>
                    <div className="cookie-grid">
                      <div className="cookie-item">
                        <span className="cookie-label">Session ID:</span>
                        <span className="cookie-value">{session.expressSession.sessionId.substring(0, 12)}...</span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">originalMaxAge:</span>
                        <span className="cookie-value">{session.expressSession.cookie.originalMaxAge ? `${Math.floor(session.expressSession.cookie.originalMaxAge / 1000 / 60)} min` : 'N/A'}</span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">expires:</span>
                        <span className="cookie-value">{formatDate(session.expressSession.cookie.expires)}</span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">secure:</span>
                        <span className={`cookie-value ${session.expressSession.cookie.secure ? 'true-value' : 'false-value'}`}>
                          {session.expressSession.cookie.secure ? 'true' : 'false'}
                        </span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">httpOnly:</span>
                        <span className={`cookie-value ${session.expressSession.cookie.httpOnly ? 'true-value' : 'false-value'}`}>
                          {session.expressSession.cookie.httpOnly ? 'true' : 'false'}
                        </span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">path:</span>
                        <span className="cookie-value">{session.expressSession.cookie.path}</span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">sameSite:</span>
                        <span className="cookie-value">{session.expressSession.cookie.sameSite}</span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">userId:</span>
                        <span className="cookie-value">{session.expressSession.userId}</span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">username:</span>
                        <span className="cookie-value">{session.expressSession.username}</span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">email:</span>
                        <span className="cookie-value">{session.expressSession.email || 'N/A'}</span>
                      </div>
                      <div className="cookie-item">
                        <span className="cookie-label">role:</span>
                        <span className="cookie-value">{session.expressSession.role}</span>
                      </div>
                      {session.expressSession.loginTime && (
                        <div className="cookie-item">
                          <span className="cookie-label">loginTime:</span>
                          <span className="cookie-value">{formatDate(session.expressSession.loginTime)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="no-express-session-section">
                    <span className="no-express-session">⚠️ No express-session data available</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionTracking;
