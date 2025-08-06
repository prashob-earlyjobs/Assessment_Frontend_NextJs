import React, { ReactNode, useState } from 'react';
import { SidebarProvider } from '../../components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gray-50">
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          className="flex-1 flex flex-col transition-all duration-300"
          style={{ marginLeft: collapsed ? '4rem' : '16rem' }}
        >
          <AdminHeader />
          <main className="flex-1 px-4 py-6 bg-white sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
