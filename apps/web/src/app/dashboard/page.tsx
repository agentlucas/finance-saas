'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-bold text-gray-900">Finance SaaS</h1>
              <div className="flex items-center space-x-4">
                <a href="/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </a>
                <a href="/dashboard/accounts" className="text-gray-700 hover:text-gray-900">
                  Accounts
                </a>
                <a href="/dashboard/transactions" className="text-gray-700 hover:text-gray-900">
                  Transactions
                </a>
                <div className="border-l pl-4 ml-4 flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    {user?.name} {user?.role === 'ADMIN' && '(Admin)'}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-3xl font-bold text-gray-900">$0.00</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm text-gray-600">This Month Income</p>
                <p className="text-3xl font-bold text-green-600">$0.00</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm text-gray-600">This Month Expenses</p>
                <p className="text-3xl font-bold text-red-600">$0.00</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <p className="text-gray-500">No transactions yet. Add your first account to get started!</p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
