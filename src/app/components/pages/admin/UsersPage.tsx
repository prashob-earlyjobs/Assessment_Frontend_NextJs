"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { AdminLayout } from '../../../components/admin/AdminLayout';
import { UserManagement } from '../../../components/admin/UserManagement';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Plus, Eye, EyeOff } from 'lucide-react';
import { User } from '@/app/types/admin'; 
import { toast } from 'sonner';
import { setUserStatusAactivity } from '../../../components/services/servicesapis';
import axiosInstance from '../../../components/services/apiinterseptor';

const UsersPage: React.FC = () => {
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    phone: '',
    role: 'candidate',
    location: ''
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // Mock data - in real app this would come from API
  const [users, setUsers] = useState<User[]>([]);

  const handleEditUser = (user: User) => {
    // In real app, open edit modal or navigate to edit page
    toast.success(`Opening edit form for ${user.name}`);
  };

  const handleToggleUserStatus = async (userId: string, role: string, newStatus: boolean) => {
    if (role === 'super_admin' || role === 'franchise_admin') {
      return toast.error(`Cannot change status of ${role}`);
    }

    try {
      const response = await setUserStatusAactivity(userId, newStatus);
      if (!response.success) {
        throw new Error(response.message);
      }

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, isActive: response.data.user.isActive } : user
        )
      );

    }
    catch (error) {
      toast.error("An error occurred. Please try again later");
      return;
    }


    const user = users.find(u => u._id === userId);
    toast.success(`${user?.name} has been ${newStatus ? 'enabled' : 'disabled'}`);
  };

  const handleCreateUser = () => {
    if (!newUser.name?.trim() || !newUser.email?.trim() || !newUser.phone?.trim()) {
      return toast.error('Name, Email and Phone are required');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      return toast.error('Enter a valid email address');
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(newUser.phone)) {
      return toast.error('Enter a valid 10-digit phone number');
    }
    if (!password || password.length < 6) {
      return toast.error('Enter a valid password (min 6 chars)');
    }

    const payload = {
      name: newUser.name!.trim(),
      email: newUser.email!.trim(),
      password,
      mobile: newUser.phone!.trim(),
      role: (newUser.role as string) || 'candidate'
    };

    axiosInstance
      .post('/admin/addUser', payload)
      .then((res) => {
        const data = res.data || {};
        const created: User = {
          _id: data?.data?.user?._id || Math.random().toString(36).slice(2),
          name: payload.name,
          email: payload.email,
          phone: payload.mobile,
          role: (payload.role as User['role']) || 'candidate',
          registrationDate: new Date().toISOString().slice(0, 10),
          isActive: true,
          location: newUser.location || ''
        };
        setUsers(prev => [created, ...prev]);
        toast.success(`${payload.name} added successfully`);
        setIsAddOpen(false);
        setNewUser({ name: '', email: '', phone: '', role: 'candidate', location: '' });
        setPassword('');
      })
      .catch((err: any) => {
        const msg = err?.response?.data?.message || err?.message || 'Failed to add user';
        toast.error(msg);
      });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-2">Manage all platform users and their access.</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <UserManagement
          users={users}
          setUsers={setUsers}
          onEditUser={handleEditUser}
          onToggleUserStatus={handleToggleUserStatus}
        />

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>Fill the details to create a new user.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Full Name</label>
                <Input
                  placeholder="Ex: John Doe"
                  value={newUser.name || ''}
                  onChange={(e) => setNewUser(u => ({ ...u, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={newUser.email || ''}
                  onChange={(e) => setNewUser(u => ({ ...u, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="StrongP@ssw0rd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-700">Phone</label>
                <Input
                  placeholder="9876543210"
                  value={newUser.phone || ''}
                  onChange={(e) => setNewUser(u => ({ ...u, phone: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Role</label>
                <Select value={(newUser.role as string) || 'candidate'} onValueChange={(v) => setNewUser(u => ({ ...u, role: v as User['role'] }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate">Candidate</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                    <SelectItem value="creator">Creator</SelectItem>
                    <SelectItem value="franchise_admin">Franchise Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-gray-700">Location</label>
                <Input
                  placeholder="City / Location"
                  value={newUser.location || ''}
                  onChange={(e) => setNewUser(u => ({ ...u, location: e.target.value }))}
                />
              </div>
              
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleCreateUser}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
