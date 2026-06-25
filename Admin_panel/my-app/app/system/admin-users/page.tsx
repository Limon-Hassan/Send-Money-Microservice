'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Pencil,
  Lock,
  Unlock,
  Trash2,
  MoreVertical,
  X,
  ShieldCheck,
  ShieldOff,
} from 'lucide-react';
import {
  allAdminUsers,
  allAdminUsersTotalCount,
  adminUserStatusTabsFull,
  adminUserRoleOptionsFull,
  adminUserBranchOptions,
  adminUserRoleBadgeStylesFull,
  adminUserStatusBadgeStylesFull,
  adminUserOverviewStats,
  type AdminUserStatus2,
} from '@/lib/data';

const Page = () => {
  const [users, setUsers] = useState(allAdminUsers);
  const [activeTab, setActiveTab] = useState<AdminUserStatus2 | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    role: 'Support Agent',
    branch: 'Head Office',
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const filteredUsers = users.filter((u) => {
    const statusMatch = activeTab === 'All' || u.status === activeTab;
    const searchMatch =
      !searchQuery ||
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  const resetForm = () =>
    setForm({
      fullName: '',
      username: '',
      email: '',
      role: 'Support Agent',
      branch: 'Head Office',
    });

  const openAddModal = () => {
    resetForm();
    setEditingUserId(null);
    setShowAddModal(true);
  };

  const openEditModal = (userId: string) => {
    const u = users.find((x) => x.id === userId);
    if (!u) return;
    setForm({
      fullName: u.fullName,
      username: u.username,
      email: u.email,
      role: u.role,
      branch: u.branch,
    });
    setEditingUserId(userId);
    setShowAddModal(true);
    setOpenMenuId(null);
  };

  const handleSaveUser = () => {
    if (!form.fullName.trim() || !form.username.trim()) {
      showToast('Please fill in full name and username.');
      return;
    }

    if (editingUserId) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUserId
            ? {
              ...u,
              fullName: form.fullName,
              username: form.username,
              email: form.email,
              role: form.role as any,
              branch: form.branch,
            }
            : u,
        ),
      );
      showToast('Admin user updated successfully!');
    } else {
      const newUser = {
        id: `usr-${Date.now()}`,
        userId: `USR-${Date.now().toString().slice(-9)}`,
        fullName: form.fullName,
        username: form.username,
        email: form.email || `${form.username}@company.com`,
        avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 60) + 1}`,
        role: form.role as any,
        branch: form.branch,
        status: 'Active' as const,
        twoFactorEnabled: false,
        lastLogin: 'Never',
        createdAt: 'Just now',
      };
      setUsers([newUser, ...users]);
      showToast('Admin user added successfully!');
    }

    setShowAddModal(false);
    setEditingUserId(null);
    resetForm();
  };

  const toggleSuspend = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
            ...u,
            status: u.status === 'Suspended' ? 'Active' : 'Suspended',
          }
          : u,
      ),
    );
    const u = users.find((x) => x.id === userId);
    showToast(
      u?.status === 'Suspended'
        ? `${u.fullName} reactivated`
        : `${u?.fullName} suspended`,
    );
    setOpenMenuId(null);
  };

  const toggleTwoFactor = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, twoFactorEnabled: !u.twoFactorEnabled } : u,
      ),
    );
    setOpenMenuId(null);
  };

  const confirmDelete = () => {
    if (!deletingUserId) return;
    const u = users.find((x) => x.id === deletingUserId);
    setUsers((prev) => prev.filter((x) => x.id !== deletingUserId));
    setDeletingUserId(null);
    showToast(`${u?.fullName} removed`);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {editingUserId ? 'Edit Admin User' : 'Add Admin User'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                  Full Name
                </label>
                <input
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Sadia Rahman"
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                  Username
                </label>
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="e.g. sadia.rahman"
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                  Email
                </label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. sadia.rahman@company.com"
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                  >
                    {adminUserRoleOptionsFull
                      .filter((r) => r !== 'All Roles')
                      .map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Branch
                  </label>
                  <select
                    value={form.branch}
                    onChange={(e) => setForm({ ...form, branch: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                  >
                    {adminUserBranchOptions
                      .filter((b) => b !== 'All Branches')
                      .map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
              >
                {editingUserId ? 'Save Changes' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deletingUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              Remove this user?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This action will permanently remove{' '}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {users.find((u) => u.id === deletingUserId)?.fullName}
              </span>{' '}
              from the system.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeletingUserId(null)}
                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Admin Users
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage administrative accounts and their access.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminUserOverviewStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              {stat.label}
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </p>
            <p
              className={`text-xs mt-1 ${stat.change >= 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-500'
                }`}
            >
              {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%{' '}
              <span className="text-slate-400">{stat.changeLabel}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        {/* Top Filters */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {adminUserStatusTabsFull.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${activeTab === tab.status
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-1.5 text-xs opacity-70">{tab.count}</span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2 relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-slate-400"
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, username or email..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <select className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200">
              {adminUserRoleOptionsFull.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <select className="flex-1 px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200">
                {adminUserBranchOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>

              <button className="px-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <Filter size={15} />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-275">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr className="text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Branch</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">2FA</th>
                <th className="px-5 py-4">Last Login</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.fullName}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                          {u.fullName}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${adminUserRoleBadgeStylesFull[u.role]}`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {u.branch}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${adminUserStatusBadgeStylesFull[u.status]}`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleTwoFactor(u.id)}
                      className={`flex items-center gap-1.5 text-xs font-medium transition ${u.twoFactorEnabled
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-400'
                        }`}
                      title="Toggle 2FA"
                    >
                      {u.twoFactorEnabled ? (
                        <ShieldCheck size={14} />
                      ) : (
                        <ShieldOff size={14} />
                      )}
                      {u.twoFactorEnabled ? 'On' : 'Off'}
                    </button>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {u.lastLogin}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {u.createdAt}
                  </td>

                  <td className="px-5 py-4">
                    <div className="relative flex items-center justify-center gap-1">
                      <button
                        onClick={() => showToast(`Viewing ${u.fullName}`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => openEditModal(u.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => toggleSuspend(u.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition"
                        title={u.status === 'Suspended' ? 'Reactivate' : 'Suspend'}
                      >
                        {u.status === 'Suspended' ? (
                          <Unlock size={15} />
                        ) : (
                          <Lock size={15} />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === u.id ? null : u.id)
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <MoreVertical size={15} />
                      </button>

                      {openMenuId === u.id && (
                        <div className="absolute right-0 top-9 z-20 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">
                          <button
                            onClick={() => openEditModal(u.id)}
                            className="w-full text-left px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                          >
                            Edit user
                          </button>
                          <button
                            onClick={() => toggleSuspend(u.id)}
                            className="w-full text-left px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                          >
                            {u.status === 'Suspended'
                              ? 'Reactivate'
                              : 'Suspend account'}
                          </button>
                          <button
                            onClick={() => {
                              setDeletingUserId(u.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                          >
                            Remove user
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-10 text-center text-sm text-slate-400"
                  >
                    No users match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing 1-{filteredUsers.length} of {allAdminUsersTotalCount} users
          </p>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`w-8 h-8 rounded-lg border text-sm transition ${num === 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;