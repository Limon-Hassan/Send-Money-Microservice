'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Users,
  Pencil,
  Trash2,
  Lock,
  X,
  CheckCircle2,
  XOctagon,
  ChevronDown,
} from 'lucide-react';
import {
  systemRoles,
  systemRolesTotalCount,
  permissionModulesList,
  permissionLevelLabels,
  permissionLevelOrder,
  roleOverviewStats,
  type PermissionLevel2,
} from '@/lib/data';

const levelStyles: Record<PermissionLevel2, string> = {
  full: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  view: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  none: 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500',
};

const Page = () => {
  const [roles, setRoles] = useState(systemRoles);
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(
    systemRoles[0]?.id ?? null,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [deletingRoleId, setDeletingRoleId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const filteredRoles = roles.filter(
    (r) =>
      !searchQuery ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const cyclePermission = (roleId: string, module: string) => {
    setRoles((prev) =>
      prev.map((role) => {
        if (role.id !== roleId) return role;
        return {
          ...role,
          permissions: role.permissions.map((p) => {
            if (p.module !== module) return p;
            const currentIdx = permissionLevelOrder.indexOf(p.level);
            const nextLevel =
              permissionLevelOrder[
              (currentIdx + 1) % permissionLevelOrder.length
              ];
            return { ...p, level: nextLevel };
          }),
        };
      }),
    );
  };

  const openAddModal = () => {
    setForm({ name: '', description: '' });
    setEditingRoleId(null);
    setShowAddModal(true);
  };

  const openEditModal = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;
    setForm({ name: role.name, description: role.description });
    setEditingRoleId(roleId);
    setShowAddModal(true);
  };

  const handleSaveRole = () => {
    if (!form.name.trim()) {
      showToast('Please enter a role name.');
      return;
    }

    if (editingRoleId) {
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editingRoleId
            ? { ...r, name: form.name, description: form.description }
            : r,
        ),
      );
      showToast('Role updated successfully!');
    } else {
      const newRole = {
        id: `role-${Date.now()}`,
        name: form.name,
        description: form.description || 'Custom role.',
        color:
          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
        userCount: 0,
        isSystemRole: false,
        permissions: permissionModulesList.map((m) => ({
          module: m,
          level: 'none' as const,
        })),
      };
      setRoles([...roles, newRole]);
      setExpandedRoleId(newRole.id);
      showToast('Role created successfully!');
    }

    setShowAddModal(false);
    setEditingRoleId(null);
  };

  const confirmDelete = () => {
    if (!deletingRoleId) return;
    const role = roles.find((r) => r.id === deletingRoleId);
    setRoles((prev) => prev.filter((r) => r.id !== deletingRoleId));
    setDeletingRoleId(null);
    showToast(`${role?.name} deleted`);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Add/Edit Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {editingRoleId ? 'Edit Role' : 'Create New Role'}
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
                  Role Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Regional Manager"
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Briefly describe this role's responsibilities..."
                  rows={3}
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
                />
              </div>

              {!editingRoleId && (
                <p className="text-xs text-slate-400">
                  You can set module permissions after creating the role.
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
              >
                {editingRoleId ? 'Save Changes' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deletingRoleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
              Delete this role?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {roles.find((r) => r.id === deletingRoleId)?.name}
              </span>{' '}
              will be permanently removed. Users with this role will need to
              be reassigned.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeletingRoleId(null)}
                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Roles & Permissions
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Define roles and control what each role can access.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
        >
          <Plus size={16} />
          New Role
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {roleOverviewStats.map((stat) => (
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
            {stat.change !== 0 ? (
              <p className="text-xs mt-1 text-emerald-600 dark:text-emerald-400">
                ↑ {stat.change}%{' '}
                <span className="text-slate-400">{stat.changeLabel}</span>
              </p>
            ) : (
              <p className="text-xs mt-1 text-slate-400">{stat.changeLabel}</p>
            )}
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <div className="relative max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-3 text-slate-400"
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
      </div>

      {/* Role Cards (expandable permission matrix) */}
      <div className="space-y-3">
        {filteredRoles.map((role) => {
          const isExpanded = expandedRoleId === role.id;
          return (
            <div
              key={role.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
            >
              {/* Role Header */}
              <button
                onClick={() =>
                  setExpandedRoleId(isExpanded ? null : role.id)
                }
                className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium shrink-0 ${role.color}`}
                  >
                    {role.name}
                  </span>
                  {role.isSystemRole && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
                      <Lock size={11} />
                      System
                    </span>
                  )}
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                    {role.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Users size={13} />
                    {role.userCount} users
                  </span>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(role.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition cursor-pointer"
                  >
                    <Pencil size={15} />
                  </span>

                  {!role.isSystemRole && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingRoleId(role.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </span>
                  )}

                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''
                      }`}
                  />
                </div>
              </button>

              {/* Permission Matrix (expanded) */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <p className="text-xs text-slate-400 mb-3">
                    Click a permission badge to cycle: No Access → View Only →
                    Full Access
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {role.permissions.map((perm) => (
                      <button
                        key={perm.module}
                        onClick={() => cyclePermission(role.id, perm.module)}
                        disabled={role.isSystemRole && role.name === 'Super Admin'}
                        className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition text-left ${role.isSystemRole && role.name === 'Super Admin'
                            ? 'cursor-not-allowed opacity-70'
                            : 'cursor-pointer'
                          }`}
                      >
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                          {perm.module}
                        </span>
                        <span
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium shrink-0 ${levelStyles[perm.level]}`}
                        >
                          {perm.level === 'full' && <CheckCircle2 size={11} />}
                          {perm.level === 'none' && <XOctagon size={11} />}
                          {permissionLevelLabels[perm.level]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredRoles.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-sm text-slate-400">
            No roles match your search.
          </div>
        )}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
        Showing {filteredRoles.length} of {systemRolesTotalCount} roles
      </p>
    </div>
  );
};

export default Page;