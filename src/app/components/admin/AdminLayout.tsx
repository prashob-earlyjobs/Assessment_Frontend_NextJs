
import React, { ReactNode } from 'react';
import { SidebarProvider } from '../../components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 px-4  py-6 bg-white sm:px-6 lg:px-8 ">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
