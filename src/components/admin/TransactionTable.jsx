import './TransactionTable.css'
import React, { useState, useEffect } from 'react'
import { FaEye, FaTrash, FaDownload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DeleteModal from '../DeleteModal'

const TransactionTable = () => {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPaymentMode, setFilterPaymentMode] = useState('all')

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        setError('Authentication required. Please log in.')
        return
      }
      
      const response = await fetch('http://localhost:5050/api/admin/paymentmethod', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.status === 401) {
        setError('Authentication failed. Please log in again.')
        return
      }
      
      if (response.status === 403) {
        setError('Access denied. Admin privileges required.')
        return
      }
      
      const data = await response.json()
      
      if (data.success) {
        console.log('Fetched transactions:', data.data)
        console.log('Total transactions:', data.data.length)
        console.log('Sample transaction:', data.data[0])
        setTransactions(data.data)
      } else {
        console.error('API Error:', data.message)
        setError(data.message || 'Failed to fetch transactions')
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (transactionId) => {
    setDeleteId(transactionId)
  }

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5050/api/admin/paymentmethod/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success('Transaction deleted successfully!')
        setDeleteId(null)
        fetchTransactions() // Refresh the list
      } else {
        toast.error(data.message || 'Failed to delete transaction')
      }
    } catch (error) {
      console.error('Error deleting transaction:', error)
      toast.error('Error deleting transaction')
    }
  }

  const handleViewDetails = (transaction) => {
    navigate(`/admin/transaction-details/${transaction._id}`)
  }

  const handleExportData = () => {
    // Create CSV data
    const csvData = [
      ['ID', 'Food Items', 'Quantity', 'Total Price', 'Payment Mode', 'Date'],
      ...transactions.map(t => [
        t._id,
        t.food,
        t.quantity,
        `₹${t.totalprice}`,
        t.paymentmode,
        new Date(t.createdAt || Date.now()).toLocaleDateString()
      ])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transaction_history_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success('Transaction data exported successfully!')
  }

  // Filter transactions based on search term and payment mode
  const filteredTransactions = transactions.filter(transaction => {
    // ✅ FIX: Add null/undefined checks to prevent toLowerCase error
    const food = transaction.food || ''
    const paymentmode = transaction.paymentmode || ''
    const matchesSearch = food.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paymentmode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPaymentMode = filterPaymentMode === 'all' || paymentmode === filterPaymentMode
    return matchesSearch && matchesPaymentMode
  })

  // Calculate summary statistics (with null checks)
  const totalRevenue = transactions.reduce((sum, t) => sum + (t.totalprice || 0), 0)
  const totalTransactions = transactions.length
  const onlinePayments = transactions.filter(t => t.paymentmode === 'online').length
  const codPayments = transactions.filter(t => t.paymentmode === 'cod').length
  const esewaPayments = transactions.filter(t => t.paymentmode === 'esewa').length
  const khaltiPayments = transactions.filter(t => t.paymentmode === 'khalti').length
  const cardPayments = transactions.filter(t => t.paymentmode === 'card').length

  if (loading) {
    return <div className="loading">Loading transactions...</div>
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={fetchTransactions} className="retry-btn">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="transaction-table-container">
      <div className="transaction-header">
        <div>
          <h1 className="table-title">💳 Transaction History</h1>
          <p>View and manage all payment transactions</p>
        </div>
        <button className="export-btn" onClick={handleExportData}>
          <FaDownload /> Export Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Total Transactions</h3>
          <p>{totalTransactions}</p>
        </div>
        <div className="summary-card">
          <h3>Online Payments</h3>
          <p>{onlinePayments + esewaPayments + khaltiPayments + cardPayments}</p>
        </div>
        <div className="summary-card">
          <h3>Cash on Delivery</h3>
          <p>{codPayments}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="payment-filter">
          <select
            value={filterPaymentMode}
            onChange={(e) => setFilterPaymentMode(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Payment Modes</option>
            <option value="online">Online</option>
            <option value="cod">Cash on Delivery</option>
            <option value="esewa">eSewa</option>
            <option value="khalti">Khalti</option>
            <option value="card">Card</option>
          </select>
        </div>
      </div>

      <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Food Items</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Payment Mode</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction._id} className="transaction-row">
                <td className="transaction-id">{transaction._id ? transaction._id.slice(-8) : 'N/A'}</td>
                <td className="food-items">{transaction.food || 'N/A'}</td>
                <td>{transaction.quantity || 0}</td>
                <td className="price">NPR {transaction.totalprice || 0}</td>
                <td>
                  <span className={`payment-mode ${transaction.paymentmode || 'unknown'}`}>
                    {transaction.paymentmode || 'N/A'}
                  </span>
                </td>
                <td>
                  {new Date(transaction.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="actions-cell">
                  <button
                    className="btn view-btn"
                    onClick={() => handleViewDetails(transaction)}
                    title="View Details"
                  >
                    View
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(transaction._id)}
                    title="Delete Transaction"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {filteredTransactions.length === 0 && (
        <div className="no-data">
          <p>No transactions found</p>
        </div>
      )}

      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
      />
    </div>
  )
}

export default TransactionTable 
