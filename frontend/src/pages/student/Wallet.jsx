import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import { 
  Wallet as WalletIcon, 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Upload,
  CreditCard,
  History,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Minus,
  RefreshCw
} from 'lucide-react';

const Wallet = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchWalletData();
    fetchTransactions();
    fetchStats();
  }, [currentPage, filterType]);

  const fetchWalletData = async () => {
    try {
      const response = await fetch('/api/wallet', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setWallet(data.wallet);
        setUpiId(data.wallet.upiId);
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(filterType !== 'all' && { type: filterType })
      });

      const response = await fetch(`/api/wallet/transactions?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setTransactions(data.transactions);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/wallet/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (parseFloat(withdrawAmount) > wallet.balance) {
      alert('Insufficient balance');
      return;
    }

    try {
      const response = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount: parseFloat(withdrawAmount) })
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setShowWithdrawModal(false);
        setWithdrawAmount('');
        fetchWalletData();
        fetchStats();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      alert('Failed to withdraw funds');
    }
  };

  const handleUpdateUpi = async () => {
    if (!upiId || !upiId.includes('@')) {
      alert('Please enter a valid UPI ID (e.g., username@bank)');
      return;
    }

    try {
      const response = await fetch('/api/wallet/upi', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ upiId })
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setShowUpiModal(false);
        fetchWalletData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating UPI ID:', error);
      alert('Failed to update UPI ID');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 text-green-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wallet</h1>
          <p className="text-gray-600">Manage your scholarship earnings and withdrawals</p>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <WalletIcon className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">Available Balance</h3>
                  <p className="text-green-100 text-sm">Ready to withdraw</p>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold mb-4">
              ₹{wallet?.balance?.toLocaleString() || '0'}
            </div>
            <button
              onClick={() => setShowWithdrawModal(true)}
              disabled={!wallet?.balance || wallet.balance <= 0}
              className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Withdraw Funds
            </button>
          </div>

          {/* Total Earned */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total Earned</h3>
                  <p className="text-gray-500 text-sm">All time earnings</p>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              ₹{wallet?.totalEarned?.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-gray-500">
              This month: ₹{stats?.thisMonth?.toLocaleString() || '0'}
            </div>
          </div>

          {/* Total Withdrawn */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <TrendingDown className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total Withdrawn</h3>
                  <p className="text-gray-500 text-sm">Funds transferred</p>
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ₹{wallet?.totalWithdrawn?.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-gray-500">
              {stats?.totalTransactions || 0} transactions
            </div>
          </div>
        </div>

        {/* UPI Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">UPI Settings</h3>
            </div>
            <button
              onClick={() => setShowUpiModal(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Update UPI</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Current UPI ID</p>
              <p className="text-lg font-medium text-gray-900">
                {wallet?.upiId || 'Not set'}
              </p>
            </div>
            {wallet?.upiId && wallet.upiId !== 'Not set' ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-500" />
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <History className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Transaction History</h3>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Transactions</option>
                  <option value="credit">Credits</option>
                  <option value="debit">Withdrawals</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <WalletIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No transactions yet</p>
                <p className="text-sm text-gray-400">Your transaction history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <Plus className="w-5 h-5 text-green-600" />
                        ) : (
                          <Minus className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                        {transaction.scholarship && (
                          <p className="text-xs text-green-600">{transaction.scholarship.title}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {getStatusIcon(transaction.status)}
                        <span className="text-xs text-gray-500 capitalize">{transaction.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Withdraw Funds</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                max={wallet?.balance}
              />
              <p className="text-sm text-gray-500 mt-1">
                Available: ₹{wallet?.balance?.toLocaleString() || '0'}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Funds will be transferred to: <span className="font-medium">{wallet?.upiId}</span>
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPI Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Update UPI ID</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@bank"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Example: john.doe@okicici
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowUpiModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUpi}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet; 