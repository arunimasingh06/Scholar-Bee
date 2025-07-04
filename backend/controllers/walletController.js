const Wallet = require('../models/walletModel');
const Application = require('../models/applicationModel');
const Scholarship = require('../models/scholarshipModel');
const xss = require('xss');

// Get student wallet
exports.getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ studentId: req.user.id })
      .populate('transactions.scholarshipId', 'title category')
      .populate('transactions.applicationId', 'essayText submittedAt');

    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = new Wallet({
        studentId: req.user.id,
        upiId: req.user.upiId || 'Not set'
      });
      await wallet.save();
    }

    res.json({
      success: true,
      wallet: {
        balance: wallet.balance,
        totalEarned: wallet.totalEarned,
        totalWithdrawn: wallet.totalWithdrawn,
        upiId: wallet.upiId,
        isActive: wallet.isActive,
        transactions: wallet.transactions.slice(-10) // Last 10 transactions
      }
    });
  } catch (err) {
    console.error('❌ Get wallet error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch wallet' });
  }
};

// Update UPI ID
exports.updateUpiId = async (req, res) => {
  try {
    const { upiId } = req.body;
    
    if (!upiId || !upiId.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid UPI ID (e.g., username@bank)' 
      });
    }

    let wallet = await Wallet.findOne({ studentId: req.user.id });
    
    if (!wallet) {
      wallet = new Wallet({
        studentId: req.user.id,
        upiId: xss(upiId)
      });
    } else {
      wallet.upiId = xss(upiId);
    }
    
    await wallet.save();
    
    res.json({ 
      success: true, 
      message: 'UPI ID updated successfully',
      upiId: wallet.upiId 
    });
  } catch (err) {
    console.error('❌ Update UPI ID error:', err);
    res.status(500).json({ success: false, message: 'Failed to update UPI ID' });
  }
};

// Get transaction history
exports.getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 20, type } = req.query;
    const skip = (page - 1) * limit;

    let wallet = await Wallet.findOne({ studentId: req.user.id });
    if (!wallet) {
      return res.json({ success: true, transactions: [], totalPages: 0, currentPage: 1 });
    }

    let query = { studentId: req.user.id };
    if (type && ['credit', 'debit'].includes(type)) {
      query['transactions.type'] = type;
    }

    const transactions = await Wallet.aggregate([
      { $match: { studentId: wallet.studentId } },
      { $unwind: '$transactions' },
      ...(type ? [{ $match: { 'transactions.type': type } }] : []),
      { $sort: { 'transactions.createdAt': -1 } },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: 'scholarships',
          localField: 'transactions.scholarshipId',
          foreignField: '_id',
          as: 'scholarship'
        }
      },
      {
        $lookup: {
          from: 'applications',
          localField: 'transactions.applicationId',
          foreignField: '_id',
          as: 'application'
        }
      },
      {
        $project: {
          _id: '$transactions._id',
          type: '$transactions.type',
          amount: '$transactions.amount',
          description: '$transactions.description',
          status: '$transactions.status',
          upiTransactionId: '$transactions.upiTransactionId',
          createdAt: '$transactions.createdAt',
          scholarship: { $arrayElemAt: ['$scholarship', 0] },
          application: { $arrayElemAt: ['$application', 0] }
        }
      }
    ]);

    const totalTransactions = await Wallet.aggregate([
      { $match: { studentId: wallet.studentId } },
      { $unwind: '$transactions' },
      ...(type ? [{ $match: { 'transactions.type': type } }] : []),
      { $count: 'total' }
    ]);

    const total = totalTransactions[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      transactions,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalTransactions: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    console.error('❌ Get transactions error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
  }
};

// Credit wallet (when scholarship is approved)
exports.creditWallet = async (req, res) => {
  try {
    const { applicationId, amount, description } = req.body;
    
    if (!applicationId || !amount || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Verify application exists and belongs to student
    const application = await Application.findOne({
      _id: applicationId,
      studentId: req.user.id
    });

    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    let wallet = await Wallet.findOne({ studentId: req.user.id });
    if (!wallet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wallet not found. Please set up your UPI ID first.' 
      });
    }

    // Add transaction
    wallet.transactions.push({
      type: 'credit',
      amount: parseFloat(amount),
      description: xss(description),
      scholarshipId: application.scholarshipId,
      applicationId: applicationId,
      status: 'completed',
      upiTransactionId: `UPI_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

    // Update wallet balance
    wallet.balance += parseFloat(amount);
    wallet.totalEarned += parseFloat(amount);
    wallet.lastUpdated = new Date();

    await wallet.save();

    res.json({
      success: true,
      message: 'Wallet credited successfully',
      newBalance: wallet.balance,
      transaction: wallet.transactions[wallet.transactions.length - 1]
    });
  } catch (err) {
    console.error('❌ Credit wallet error:', err);
    res.status(500).json({ success: false, message: 'Failed to credit wallet' });
  }
};

// Withdraw funds
exports.withdrawFunds = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid amount' 
      });
    }

    let wallet = await Wallet.findOne({ studentId: req.user.id });
    if (!wallet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wallet not found' 
      });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient balance' 
      });
    }

    // Simulate UPI transfer (in real app, integrate with UPI API)
    const upiTransactionId = `UPI_WITHDRAW_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Add withdrawal transaction
    wallet.transactions.push({
      type: 'debit',
      amount: parseFloat(amount),
      description: `Withdrawal to ${wallet.upiId}`,
      status: 'completed',
      upiTransactionId
    });

    // Update wallet balance
    wallet.balance -= parseFloat(amount);
    wallet.totalWithdrawn += parseFloat(amount);
    wallet.lastUpdated = new Date();

    await wallet.save();

    res.json({
      success: true,
      message: `₹${amount} withdrawn successfully to ${wallet.upiId}`,
      newBalance: wallet.balance,
      transaction: wallet.transactions[wallet.transactions.length - 1]
    });
  } catch (err) {
    console.error('❌ Withdraw funds error:', err);
    res.status(500).json({ success: false, message: 'Failed to withdraw funds' });
  }
};

// Get wallet statistics
exports.getWalletStats = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ studentId: req.user.id });
    
    if (!wallet) {
      return res.json({
        success: true,
        stats: {
          balance: 0,
          totalEarned: 0,
          totalWithdrawn: 0,
          totalTransactions: 0,
          thisMonth: 0,
          lastMonth: 0
        }
      });
    }

    // Calculate monthly stats
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const thisMonthEarnings = wallet.transactions
      .filter(t => t.type === 'credit' && t.createdAt >= thisMonth)
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthEarnings = wallet.transactions
      .filter(t => t.type === 'credit' && t.createdAt >= lastMonth && t.createdAt < thisMonth)
      .reduce((sum, t) => sum + t.amount, 0);

    res.json({
      success: true,
      stats: {
        balance: wallet.balance,
        totalEarned: wallet.totalEarned,
        totalWithdrawn: wallet.totalWithdrawn,
        totalTransactions: wallet.transactions.length,
        thisMonth: thisMonthEarnings,
        lastMonth: lastMonthEarnings
      }
    });
  } catch (err) {
    console.error('❌ Get wallet stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch wallet statistics' });
  }
}; 