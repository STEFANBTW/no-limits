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
    <div className="pt-28 pb-12 px-6 md:px-12 xl:px-24 flex-1 flex flex-col gap-16 max-w-[1600px] w-full mx-auto overflow-y-auto">
      {/* Page Header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-headline text-4xl lg:text-5xl text-on-surface tracking-tight">Team & Accounts</h1>
        <p className="font-body text-on-surface-variant text-base max-w-2xl">Manage atelier access, review registered customers, and configure system activity.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column (Users List) */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* Admin Team Grid */}
          <section className="bg-surface-container rounded-xl p-6 lg:p-8 flex flex-col gap-8 shadow-lg border border-outline-variant/10">
            <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
              <div>
                <h2 className="font-headline text-2xl text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">shield_person</span>
                  Administrators
                </h2>
                <p className="font-body text-sm text-on-surface-variant mt-1">Staff with full access to the CMS.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {admins.map((user) => (
                <div key={user.id} className="bg-surface-container-low p-5 rounded-lg flex flex-col gap-4 border border-outline-variant/10 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center text-on-surface font-headline text-xl border border-outline-variant/20">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body font-medium text-on-surface">{user.name}</span>
                      <span className="font-label text-xs text-primary tracking-widest uppercase">{user.role}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-outline-variant/10 font-mono text-xs text-on-surface-variant">
                    {user.email}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Customers List */}
          <section className="bg-surface-container rounded-xl p-6 lg:p-8 flex flex-col gap-8 shadow-lg border border-outline-variant/10">
            <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
              <div>
                <h2 className="font-headline text-2xl text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">group</span>
                  Registered Customers
                </h2>
              </div>
              <span className="text-sm font-label uppercase tracking-widest text-on-surface-variant">{customers.length} Accounts</span>
            </div>
            
            <div className="flex flex-col gap-0 border border-outline-variant/10 rounded-md overflow-hidden bg-surface-container-low">
              {customers.map((user, idx) => (
               <div key={user.id} className={`group flex justify-between items-center p-4 bg-surface hover:bg-surface-container-high transition-colors ${idx !== customers.length - 1 ? 'border-b border-outline-variant/10' : ''}`}>
                 <div className="flex items-center gap-4">
                   <div className="flex flex-col">
                     <span className="font-body text-on-surface font-medium">{user.name}</span>
                     <span className="font-label text-xs text-on-surface-variant tracking-wider">{user.email}</span>
                   </div>
                 </div>
                 <div className="font-mono text-xs text-on-surface-variant opacity-50 group-hover:opacity-100 transition-opacity">
                   ID: {user.id}
                 </div>
               </div>
              ))}
              {customers.length === 0 && (
                <p className="text-sm font-body text-on-surface-variant text-center py-6">No customers registered yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column (Logs & Stats) */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <h2 className="font-headline text-xl text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">monitoring</span>
              Directory Stats
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
                <div className="flex flex-col">
                  <span className="font-body text-sm text-on-surface">Total Accounts</span>
                  <span className="font-label text-xs text-on-surface-variant mt-0.5">Across all roles</span>
                </div>
                <span className="font-headline text-3xl text-on-surface">{users.length}</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-surface-container p-4 rounded border border-outline-variant/5 flex justify-between items-center">
                  <span className="text-sm font-body text-on-surface-variant">Administrative</span>
                  <span className="font-mono text-primary">{admins.length}</span>
                </div>
                <div className="bg-surface-container p-4 rounded border border-outline-variant/5 flex justify-between items-center">
                  <span className="text-sm font-body text-on-surface-variant">Standard</span>
                  <span className="font-mono text-on-surface">{customers.length}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
