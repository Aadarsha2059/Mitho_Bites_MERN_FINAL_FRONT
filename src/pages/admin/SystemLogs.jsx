import React, { useState, useEffect } from 'react';
import { FaSearch, FaSyncAlt, FaDownload, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import api from '../../api/api';
import './SystemLogs.css';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalLogs: 0, errorLogs: 0, todayLogs: 0 });
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchStats();
    fetchLogs();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/audit/stats');
      if (response.data && response.data.success) {
        setStats({
          totalLogs: response.data.data?.totalLogs || 0,
          errorLogs: response.data.data?.errorLogs || 0,
          todayLogs: response.data.data?.todayLogs || 0
        });
      } else {
        // If API returns data but not in expected format, try to extract from response
        console.warn('Stats API response format unexpected:', response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // On error, try to get stats from logs count
      try {
        const logsResponse = await api.get('/admin/audit', { params: { limit: 1, page: 1 } });
        if (logsResponse.data && logsResponse.data.pagination) {
          setStats({
            totalLogs: logsResponse.data.pagination.total || 0,
            errorLogs: 0,
            todayLogs: 0
          });
        }
      } catch (err) {
        console.error('Error fetching logs for stats fallback:', err);
        // Keep default values (0, 0, 0)
      }
    }
  };

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = {
        limit: 100,
        page: 1
      };

      if (searchTerm) {
        params.search = searchTerm;
      }

      if (levelFilter !== 'all') {
        params.status = levelFilter.toUpperCase();
      }

      if (startDate) {
        params.startDate = startDate;
      }

      if (endDate) {
        params.endDate = endDate;
      }

      const response = await api.get('/admin/audit', { params });
      
      if (response.data.success) {
        setLogs(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStats();
    fetchLogs();
  };

  const handleExport = async () => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await api.get('/admin/audit/export/csv', { 
        params,
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit-logs-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting logs:', error);
    }
  };

  const toggleRow = (logId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedRows(newExpanded);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');
  };

  const getLevelIcon = (status) => {
    switch (status) {
      case 'ERROR':
      case 'FAILURE':
        return <span className="level-icon error">⚠️</span>;
      case 'WARNING':
        return <span className="level-icon warning">⚠️</span>;
      case 'SUCCESS':
        return <span className="level-icon success">ℹ️</span>;
      default:
        return <span className="level-icon info">ℹ️</span>;
    }
  };

  const getLevelClass = (status) => {
    switch (status) {
      case 'ERROR':
      case 'FAILURE':
        return 'error';
      case 'WARNING':
        return 'warning';
      case 'SUCCESS':
        return 'success';
      default:
        return 'info';
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLogs();
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    const sorted = [...logs].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'desc' 
        ? dateB - dateA 
        : dateA - dateB;
    });
    setLogs(sorted);
  };

  const filteredLogs = logs.filter(log => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        log.description?.toLowerCase().includes(searchLower) ||
        log.userEmail?.toLowerCase().includes(searchLower) ||
        log.username?.toLowerCase().includes(searchLower) ||
        log.endpoint?.toLowerCase().includes(searchLower) ||
        log.ipAddress?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="system-logs-container">
      <div className="system-logs-header">
        <div className="header-title">
          <span className="header-icon">📋</span>
          <div>
            <h1>BhokBhoj System Logs</h1>
            <p>View and manage system activity logs</p>
          </div>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Logs</h3>
            <div className="stat-value">{stats.totalLogs}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon error">⚠️</div>
          <div className="stat-content">
            <h3>Error Logs</h3>
            <div className="stat-value">{stats.errorLogs}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Today's Logs</h3>
            <div className="stat-value">{stats.todayLogs}</div>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Levels</option>
            <option value="success">SUCCESS</option>
            <option value="error">ERROR</option>
            <option value="failure">FAILURE</option>
            <option value="warning">WARNING</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
            placeholder="dd/mm/yyyy"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
            placeholder="dd/mm/yyyy"
          />
          <button type="button" onClick={handleRefresh} className="action-button">
            <FaSyncAlt />
          </button>
          <button type="button" onClick={handleExport} className="action-button">
            <FaDownload />
          </button>
        </form>
      </div>

      <div className="logs-table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th></th>
              <th onClick={handleSort} className="sortable">
                Timestamp {sortOrder === 'desc' ? '↓' : '↑'}
              </th>
              <th>Level</th>
              <th>Message</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="loading-cell">
                  Loading logs...
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-cell">
                  No logs found
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => {
                const isExpanded = expandedRows.has(log._id);
                return (
                  <React.Fragment key={log._id}>
                    <tr className="log-row">
                      <td className="expand-cell">
                        <button
                          onClick={() => toggleRow(log._id)}
                          className="expand-button"
                        >
                          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </td>
                      <td className="timestamp-cell">
                        {formatTimestamp(log.timestamp)}
                      </td>
                      <td className="level-cell">
                        <span className={`level-badge ${getLevelClass(log.status)}`}>
                          {getLevelIcon(log.status)}
                          {log.status || 'INFO'}
                        </span>
                      </td>
                      <td className="message-cell">
                        {log.description || log.action || 'User activity'}
                      </td>
                      <td className="user-cell">
                        {log.userEmail || log.username || 'Anonymous'}
                      </td>
                      <td className="action-cell">
                        {log.method} {log.endpoint || log.action}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="expanded-row">
                        <td colSpan="6" className="expanded-content">
                          <div className="expanded-details">
                            <div className="detail-section">
                              <h4>Request Details</h4>
                              <div className="detail-item">
                                <strong>Session ID:</strong>
                                <span className="detail-value">{log.sessionId || 'N/A'}</span>
                              </div>
                              <div className="detail-item">
                                <strong>IP Address:</strong>
                                <span className="detail-value">{log.ipAddress || 'N/A'}</span>
                              </div>
                              <div className="detail-item">
                                <strong>User Agent:</strong>
                                <span className="detail-value">{log.userAgent || 'N/A'}</span>
                              </div>
                            </div>
                            <div className="detail-section">
                              <h4>Additional Data</h4>
                              <pre className="json-data">
                                {JSON.stringify(
                                  {
                                    body: log.requestBody || {},
                                    response: log.responseData || {},
                                    details: log.details || {}
                                  },
                                  null,
                                  2
                                )}
                              </pre>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemLogs;
