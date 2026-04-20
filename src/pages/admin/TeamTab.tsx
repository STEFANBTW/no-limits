import React, { useEffect, useState } from 'react';
import { User } from '../../context/AuthContext';

export const TeamTab = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Read from our mock DB in localStorage
    const usersDb = JSON.parse(localStorage.getItem('nolimits_users_db') || '[]');
    setUsers(usersDb);
  }, []);

  return (
    <div className="pt-28 pb-12 px-12 xl:px-24 flex-1 flex flex-col gap-16 max-w-[1600px] w-full mx-auto overflow-y-auto">
      {/* Page Header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-headline text-4xl lg:text-5xl text-on-surface tracking-tight">Team & Accounts</h1>
        <p className="font-body text-on-surface-variant text-base max-w-2xl">Manage atelier access, review registered customers, and configure system activity.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column (Users List) */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          {/* Team Members Bento */}
          <section className="bg-surface-container rounded-xl p-8 flex flex-col gap-8 shadow-lg border border-outline-variant/10">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-headline text-2xl text-on-surface">Registered Users</h2>
                <p className="font-body text-sm text-on-surface-variant mt-1">All active customers and administrators in the system.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              {users.map((user) => (
                <div key={user.id} className="bg-surface-container-low p-5 rounded-lg flex items-center justify-between group hover:bg-surface-container-high transition-colors duration-300 border border-outline-variant/5 hover:border-outline-variant/20">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface font-headline text-xl border border-outline-variant/20">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body font-medium text-on-surface text-base">{user.name}</span>
                      <span className="font-label text-xs text-on-surface-variant">{user.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`font-label text-[10px] px-3 py-1 rounded-full border uppercase tracking-widest ${
                      user.role === 'admin' 
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-secondary/10 text-secondary border-secondary/20'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Logs & Stats) */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <h2 className="font-headline text-xl text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-lg">admin_panel_settings</span>
              Quick Stats
            </h2>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-body text-sm text-on-surface">Total Users</span>
                  <span className="font-label text-xs text-on-surface-variant mt-0.5">Across all roles</span>
                </div>
                <span className="font-headline text-2xl text-primary">{users.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-body text-sm text-on-surface">Admins</span>
                  <span className="font-label text-xs text-on-surface-variant mt-0.5">Staff & Management</span>
                </div>
                <span className="font-headline text-2xl text-secondary">{users.filter(u => u.role === 'admin').length}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
