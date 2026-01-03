"use client";
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../admin/AdminLayout';
import { uploadPhoto } from '../../services/servicesapis';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

// Define the TeamMember interface for TypeScript
interface TeamMember {
  name: string;
  image_url: string;
  designation: string;
  experience_in_years: number;
  certified_by: string;
  linkedIn_url: string;
  position: number;
  category: string;
  joined_date?: string;
  description: string;
  type?: string;
}

// Define the TeamMemberWithId interface for client-side use (includes _id from MongoDB)
interface TeamMemberWithId extends TeamMember {
  _id: string;
}

// Modal component for Add/Edit form
const TeamMemberModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: TeamMember) => Promise<void>;
  initialData?: TeamMember;
  title: string;
  adminEmail: string;
}> = ({ isOpen, onClose, onSubmit, initialData, title, adminEmail }) => {
  const [formData, setFormData] = useState<TeamMember>({
    name: '',
    image_url: '',
    designation: '',
    experience_in_years: 0,
    certified_by: '',
    linkedIn_url: '',
    position: 0,
    category: '',
    joined_date: '',
    description: '',
    type: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Update formData when initialData changes (for editing) or reset when modal opens for new member
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        image_url: initialData.image_url || '',
        designation: initialData.designation || '',
        experience_in_years: initialData.experience_in_years || 0,
        certified_by: initialData.certified_by || '',
        linkedIn_url: initialData.linkedIn_url || '',
        position: initialData.position || 0,
        category: initialData.category || '',
        joined_date: initialData.joined_date || '',
        description: initialData.description || '',
        type: initialData.type || '',
      });
      setPreviewUrl(initialData.image_url || null);
    } else if (isOpen) {
      // Reset form when opening modal for new member
      setFormData({
        name: '',
        image_url: '',
        designation: '',
        experience_in_years: 0,
        certified_by: '',
        linkedIn_url: '',
        position: 0,
        category: '',
        joined_date: '',
        description: '',
        type: '',
      });
      setPreviewUrl(null);
      setError(null);
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: name === 'experience_in_years' || name === 'position' ? Number(value) : value,
      };
      return updated;
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setError('Please select a valid image file (jpg, jpeg, or png).');
        return;
      }
      setError(null);
      setPreviewUrl(URL.createObjectURL(file));

      // Call uploadPhoto with file and adminEmail
      const uploadedUrl = await uploadPhoto(file, adminEmail);
      if (uploadedUrl) {
        setFormData((prev) => ({
          ...prev,
          image_url: uploadedUrl,
        }));
      } else {
        setError('Failed to upload image. Please try again.');
      }
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validate required fields
    if (!formData.description || formData.description.trim() === '') {
      setError('Description is required.');
      setIsSubmitting(false);
      return;
    }
    
    // Validate description length
    const descriptionLength = formData.description.trim().length;
    if (descriptionLength < 50) {
      setError('Description must be at least 50 characters long.');
      setIsSubmitting(false);
      return;
    }
    
    if (descriptionLength > 258) {
      setError('Description must not exceed 258 characters.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Ensure type is included in the submitted data
      const submitData = {
        ...formData,
        type: formData.type || '',
      };
      console.log(submitData,'submitData');
      await onSubmit(submitData);
      onClose();
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <input
              type="file"
              name="image_file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
              className="p-2 border rounded w-full"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Photo Preview"
                className="w-24 h-24 object-cover rounded mt-2"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g., Software Engineer"
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
            <input
              type="number"
              name="experience_in_years"
              value={formData.experience_in_years}
              onChange={handleChange}
              placeholder="e.g., 5"
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Certified By</label>
            <input
              type="text"
              name="certified_by"
              value={formData.certified_by}
              onChange={handleChange}
              placeholder="e.g., AWS, Microsoft"
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
            <input
              type="text"
              name="linkedIn_url"
              value={formData.linkedIn_url}
              onChange={handleChange}
              placeholder="e.g., https://linkedin.com/in/johndoe"
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="number"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., 1"
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Development, Design"
              className="p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Member Type</label>
            <select
              name="type"
              value={formData.type ?? ''}
              onChange={handleTypeChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Select member type</option>
              <option value="core">Core</option>
              <option value="franchise">Franchise</option>
              <option value="advisor">Advisor</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 font-normal ml-2">(50-258 characters)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter team member description/biography"
              className="p-2 border rounded w-full min-h-[100px] resize-y"
              minLength={50}
              maxLength={258}
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              {formData.description.length}/258 characters
              {formData.description.length > 0 && formData.description.length < 50 && (
                <span className="text-red-500 ml-2">Minimum 50 characters required</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Joined Date</label>
            <input
              type="date"
              name="joined_date"
              value={formData.joined_date}
              onChange={handleChange}
              placeholder="e.g., 2023-01-15"
              className="p-2 border rounded w-full"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 text-white rounded ${isSubmitting ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Save'} Member
          </button>
        </div>
      </div>
    </div>
  );
};

// TeamMemberCard component - Styled similar to franchise cards
const TeamMemberCard: React.FC<{
  member: TeamMemberWithId;
  onEdit: (member: TeamMemberWithId) => void;
  onDelete: (id: string) => Promise<void>;
}> = ({ member, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(member._id);
      toast.success('Team member deleted successfully.');
      setShowDeleteDialog(false);
    } catch (err) {
      console.error('Failed to delete:', err);
      toast.error('Failed to delete team member. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const joinedDate = member.joined_date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
            <div className="flex items-center mb-2">
              <p className="text-sm text-gray-600"><strong>Category:</strong> {member.category}</p>
            </div>
            {member.type && (
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-600"><strong>Type:</strong> <span className="capitalize">{member.type}</span></p>
              </div>
            )}
            <p className="text-sm text-gray-600 mb-2"><strong>Designation:</strong> {member.designation}</p>
            <div className="space-y-1 text-sm text-gray-500">
              <p><strong>Experience:</strong> {member.experience_in_years} years</p>
              <p><strong>Certified By:</strong> {member.certified_by}</p>
            </div>
            {member.description && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-1"><strong>Description:</strong></p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            )}
            {member.linkedIn_url && (
              <a href={member.linkedIn_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm mt-2 block">
                LinkedIn Profile
              </a>
            )}
          </div>
          <img
            src={member.image_url}
            alt={member.name}
            className="w-20 h-20 rounded-full object-cover ml-4 flex-shrink-0"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => onEdit(member)}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleting}
            className={`bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete {member.name}?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 text-white rounded ${isDeleting ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main TeamMemberPage component
const TeamMemberPage: React.FC<{ adminEmail: string }> = ({ adminEmail }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberWithId[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberWithId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch team members on mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${backendUrl}/team/team-members`);
        if (!response.ok) throw new Error('Failed to fetch team members');
        const data: TeamMemberWithId[] = await response.json();
        setTeamMembers(data.sort((a, b) => a.position - b.position));
      } catch (err) {
        setError('Failed to load team members. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  const openModal = (member?: TeamMemberWithId) => {
    setEditingMember(member || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const addTeamMember = async (member: TeamMember) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      // Ensure type field is included in the add payload
      const payload = {
        ...member,
        type: member.type || '',
      };
      const response = await fetch(`${backendUrl}/team/team-members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to add team member');
      const newMember: TeamMemberWithId = await response.json();
      setTeamMembers((prev) => [...prev, newMember].sort((a, b) => a.position - b.position));
    } catch (err) {
      throw new Error('Failed to add team member');
    }
  };

  const updateTeamMember = async (updatedMember: TeamMember) => {
    console.log(updatedMember,'updatedMember');
    if (!editingMember?._id) return;
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      // Send the complete member data including type
      const response = await fetch(`${backendUrl}/team/team-members/${editingMember._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMember),
      });
      if (!response.ok) throw new Error('Failed to update team member');
      const updated: TeamMemberWithId = await response.json();
      setTeamMembers((prev) =>
        prev
          .map((member) => (member._id === updated._id ? updated : member))
          .sort((a, b) => a.position - b.position)
      );
    } catch (err) {
      throw new Error('Failed to update team member');
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/team/team-members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete team member');
      setTeamMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (err) {
      throw new Error('Failed to delete team member');
    }
  };

  const handleSubmit = editingMember ? updateTeamMember : addTeamMember;

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Team Members Management</h1>
            <p className="text-gray-600">Manage team members and their profiles</p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Member</span>
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading ? (
          <p className="text-center">Loading team members...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member._id}
                member={member}
                onEdit={openModal}
                onDelete={deleteTeamMember}
              />
            ))}
          </div>
        )}
        <TeamMemberModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          initialData={editingMember || undefined}
          title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
          adminEmail={adminEmail}
        />
      </div>
    </AdminLayout>
  );
};

export default TeamMemberPage;