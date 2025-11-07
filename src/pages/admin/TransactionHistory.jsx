import React from 'react'
import TransactionTable from '../../components/admin/TransactionTable'
import { useNavigate } from 'react-router-dom';

export default function TransactionHistory() {
  const navigate = useNavigate();
  return (
    <div className="transaction-history-container" style={{position:'relative'}}>
      <button
        className="admin-back-button"
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 100,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '2rem',
          padding: '0.7rem 1.6rem',
          fontWeight: 700,
          fontSize: '1.1rem',
          boxShadow: '0 4px 16px rgba(76,81,191,0.13)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
        }}
        onClick={() => navigate('/admin/adminpage')}
      >
        ← Back
      </button>
      <TransactionTable/>
    </div>
  )
} 
