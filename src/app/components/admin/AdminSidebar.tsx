'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart,
  Users,
  User,
  Calendar,
  Settings,
  Repeat,
  Tag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: BarChart,
    permission: 'view_analytics',
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: Users,
    permission: 'view_all_users',
  },
  {
    title: 'Candidates',
    url: '/admin/candidates',
    icon: User,
    permission: 'view_candidates',
  },
  {
    title: 'Assessments',
    url: '/admin/assessments',
    icon: Calendar,
    permission: 'manage_assessments',
  },
  {
    title: 'Franchises',
    url: '/admin/franchises',
    icon: Users,
    permission: 'manage_franchises',
  },
  {
    title: 'Transactions',
    url: '/admin/transactions',
    icon: Repeat,
    permission: 'candidate_transactions',
  },
  {
    title: 'Offers',
    url: '/admin/offers',
    icon: Tag,
    permission: 'manage_offers',
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
    permission: 'system_settings',
  },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { hasPermission } = useAdmin();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) =>
    pathname === path || (path !== '/admin' && pathname.startsWith(path));

  const filteredItems = menuItems.filter((item) => hasPermission(item.permission));

  return (
    <div
      className={`relative h-screen bg-white border-r transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo section */}
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <img
          src="/images/logo.png"
          alt="EarlyJobs"
          className={`${collapsed ? 'w-8 h-8' : 'w-10 h-10'} object-contain`}
        />
        {!collapsed && (
          <div>
            <h2 className="font-semibold text-gray-900">EarlyJobs</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <div className="flex justify-end px-3 pb-3">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-1 rounded hover:bg-gray-100 transition"
          style={{position: 'absolute', top: '10px', right: '10px'}}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu section */}
      <div className="px-2">
        {!collapsed && (
          <div className="text-xs font-semibold text-gray-400 px-2 mb-2 uppercase">
            Management
          </div>
        )}
        <ul className="space-y-1">
          {filteredItems.map((item) => (
            <li key={item.title}>
              <Link href={item.url}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    isActive(item.url)
                      ? 'bg-orange-100 text-orange-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!collapsed && <span>{item.title}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
