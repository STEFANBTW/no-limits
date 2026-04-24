import React, { useEffect, useState } from 'react';
import { User, useAuth } from '../../context/AuthContext';

export const TeamTab = ({ searchQuery = '' }: { searchQuery?: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const { getAllUsers } = useAuth();

  useEffect(() => {
    // Read from our mock DB in Context
    setUsers(getAllUsers());
  }, [getAllUsers]);

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const admins = filteredUsers.filter((u) => u.role === 'admin');
  const customers = filteredUsers.filter((u) => u.role === 'user');

  return (
    <div className="flex-1 overflow-y-auto animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-3 bg-[var(--dash-bg-page)]/50 border-b border-[var(--dash-border-subtle)] p-4 md:p-6">
        <div className="max-w-2xl">
          <h1 className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)] mb-1">Directorate & Personnel</h1>
          <p className="dash-font-body text-[var(--dash-text-muted)]">Monitor organizational access, review client telemetry, and supervise systemic integrity.</p>
        </div>
      </div>

      <div className="px-4 md:px-6 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Users List) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Admin Team Grid */}
          <section className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] overflow-hidden">
            <div className="p-5 border-b border-[var(--dash-border-subtle)] bg-[var(--dash-bg-page)]/30 flex justify-between items-center">
                <h2 className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)] flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--dash-accent)] !text-[20px]">verified_user</span>
                  Administrative Directorate
                </h2>
                <span className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest">{admins.length} Staff</span>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {admins.map((user) => (
                <div key={user.id} className="bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] p-3 hover:border-[var(--dash-accent)] transition-all group">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[var(--dash-accent-muted)] border border-[var(--dash-accent)]/20 flex items-center justify-center text-[var(--dash-accent)] font-serif italic text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <span className="dash-font-body font-semibold text-[var(--dash-text-primary)] block truncate leading-tight">{user.name}</span>
                      <span className="dash-font-card-title text-[var(--dash-accent)] font-bold tracking-widest uppercase leading-tight">{user.role}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[var(--dash-border-subtle)] dash-font-card-title font-mono text-[var(--dash-text-muted)] truncate group-hover:text-[var(--dash-text-primary)] transition-colors">
                    {user.email}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Customers List */}
          <section className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] overflow-hidden">
            <div className="p-5 border-b border-[var(--dash-border-subtle)] bg-[var(--dash-bg-page)]/30 flex justify-between items-center">
                <h2 className="dash-font-section-title font-serif italic text-[var(--dash-text-primary)] flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--dash-text-muted)] !text-[20px]">fingerprint</span>
                  Client Registry
                </h2>
                <span className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest">{customers.length} Entries</span>
            </div>
            
            <div className="divide-y divide-[var(--dash-border-subtle)]">
              {customers.map((user, idx) => (
               <div key={user.id} className="group grid grid-cols-12 gap-3 items-center p-4 bg-[var(--dash-bg-surface)] hover:bg-[var(--dash-bg-page)] transition-all">
                 <div className="col-span-12 md:col-span-8 flex items-center gap-4">
                   <div className="w-10 h-10 bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] flex items-center justify-center text-[var(--dash-text-muted)] font-mono text-sm">
                     {idx + 1}
                   </div>
                   <div className="min-w-0">
                     <span className="dash-font-body font-semibold text-[var(--dash-text-primary)] block">{user.name}</span>
                     <span className="dash-font-card-title text-[var(--dash-text-muted)] font-mono tracking-tight">{user.email}</span>
                   </div>
                 </div>
                 <div className="col-span-12 md:col-span-4 text-right hidden md:block">
                   <div className="dash-font-card-title font-mono text-[var(--dash-text-muted)] opacity-40 group-hover:opacity-100 transition-opacity">
                     UID: {user.id.slice(0, 16)}
                   </div>
                 </div>
               </div>
              ))}
              {customers.length === 0 && (
                <div className="p-12 text-center text-[var(--dash-text-muted)] italic dash-font-body">
                   No client records detected within the secure buffer.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column (Stats) */}
        <div className="lg:col-span-4">
          <section className="bg-[var(--dash-bg-surface)] border border-[var(--dash-border-subtle)] p-5">
            <h2 className="dash-font-body font-bold uppercase tracking-widest text-[var(--dash-accent)] mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined !text-[18px]">analytics</span>
              Directory Statistics
            </h2>
            <div className="space-y-8">
              <div className="flex items-end justify-between">
                <div>
                  <span className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest block mb-1">Total Identities</span>
                  <p className="dash-font-body text-[var(--dash-text-muted)]">Verified across all sectors</p>
                </div>
                <span className="dash-font-page-title font-serif italic text-[var(--dash-text-primary)] leading-none">{users.length}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] p-4">
                  <span className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest block mb-2">Directorate</span>
                  <span className="dash-font-section-title font-semibold text-[var(--dash-accent)]">{admins.length}</span>
                </div>
                <div className="bg-[var(--dash-bg-page)] border border-[var(--dash-border-subtle)] p-4">
                  <span className="dash-font-card-title text-[var(--dash-text-muted)] font-bold uppercase tracking-widest block mb-2">Standard</span>
                  <span className="dash-font-section-title font-semibold text-[var(--dash-text-primary)]">{customers.length}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--dash-border-subtle)]">
                 <div className="p-4 bg-[var(--dash-accent-muted)] border border-[var(--dash-accent)]/20 dash-font-card-title text-[var(--dash-accent)] italic">
                   System integrity verified. Automated redundancy backups are synchronized with the primary node.
                 </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
