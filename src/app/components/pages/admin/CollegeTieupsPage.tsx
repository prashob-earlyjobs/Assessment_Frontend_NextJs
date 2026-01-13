"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from '../../admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Plus, MoreVertical, Edit, Trash2, GraduationCap, Upload, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';
import { uploadFile } from '../../services/companiesapi';
import axiosInstance from '../../services/apiinterseptor';

interface College {
  _id?: string;
  collegeName: string;
  logoUrl: string; // URL of the logo
  location: string;
  order: number;
}

// Utility function to create image from URL
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

// Utility function to get cropped image as base64 (PNG only, preserves original state)
const getCroppedImgAsBase64 = async (
  imageSrc: string,
  pixelCrop: Area,
  maxSizeMB: number = 2
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: false });

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Set canvas size to 2000x2000
  canvas.width = 2000;
  canvas.height = 2000;

  // Don't clear or fill - let the canvas be transparent by default
  // This preserves the original image's transparency and background

  // Calculate scale factors
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Calculate crop coordinates
  const cropX = pixelCrop.x * scaleX;
  const cropY = pixelCrop.y * scaleY;
  const cropWidth = pixelCrop.width * scaleX;
  const cropHeight = pixelCrop.height * scaleY;

  // Draw the cropped image scaled to 2000x2000
  // This preserves the original image's transparency, background, and all original states
  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    2000,
    2000
  );

  // Convert canvas to base64 as PNG only (preserves all original image properties)
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // 2MB in bytes
  let base64 = canvas.toDataURL('image/png');
  let base64Size = (base64.length * 3) / 4;
  
  // If PNG is too large, reduce canvas size while maintaining aspect ratio
  if (base64Size > maxSizeBytes) {
    const scaleFactor = Math.sqrt(maxSizeBytes / base64Size);
    const newWidth = Math.floor(2000 * scaleFactor);
    const newHeight = Math.floor(2000 * scaleFactor);
    
    // Create new smaller canvas
    const smallCanvas = document.createElement('canvas');
    const smallCtx = smallCanvas.getContext('2d');
    
    if (!smallCtx) {
      throw new Error('No 2d context');
    }
    
    smallCanvas.width = newWidth;
    smallCanvas.height = newHeight;
    
    // Draw scaled down (preserves original image state)
    smallCtx.drawImage(canvas, 0, 0, newWidth, newHeight);
    base64 = smallCanvas.toDataURL('image/png');
  }
  
  return base64;
};

const CollegeTieupsPage: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [deleteCollegeId, setDeleteCollegeId] = useState<string | null>(null);
  const [formData, setFormData] = useState<College>({
    collegeName: '',
    logoUrl: '',
    location: '',
    order: 0,
  });

  // Image cropping states
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [croppedBase64, setCroppedBase64] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch colleges on mount
  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setIsLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axiosInstance.get(`${backendUrl}/admin/college-tieups`);

      console.log('response', response?.data?.data);  
      setColleges(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      // For now, use mock data if API doesn't exist
      setColleges([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type - PNG only
      if (file.type !== 'image/png') {
        toast.error('Please select a PNG image file');
        return;
      }

      // Create object URL for preview
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
        setPreviewUrl('');
      });
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async () => {
    if (!imgSrc || !croppedAreaPixels) {
      toast.error('Please select and crop an image');
      return;
    }

    try {
      setIsSubmitting(true);
      // Convert to base64 with 2MB max size
      const base64 = await getCroppedImgAsBase64(imgSrc, croppedAreaPixels, 2);
      
      // Check size
      const base64SizeMB = (base64.length * 3) / 4 / (1024 * 1024);
      if (base64SizeMB > 2) {
        toast.error('Image is too large. Please try a smaller image or crop a smaller area.');
        setIsSubmitting(false);
        return;
      }
      
      // Store the base64 and create preview
      setCroppedBase64(base64);
      setPreviewUrl(base64); // base64 can be used directly as image src
      setImgSrc(''); // Clear the crop view
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      toast.success(`Image cropped successfully (${base64SizeMB.toFixed(2)}MB). Click "Save" to upload.`);
    } catch (error) {
      console.error('Error cropping image:', error);
      toast.error('Failed to crop image');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({
      ...prev,
      logo: '',
    }));
    setPreviewUrl('');
    setImgSrc('');
    setCroppedFile(null);
    setCroppedBase64(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    // Clean up object URL if it exists
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleAddClick = () => {
    setSelectedCollege(null);
    setFormData({
      collegeName: '',
      logoUrl: '',
      location: '',
      order: 0,
    });
    setPreviewUrl('');
    setImgSrc('');
    setCroppedFile(null);
    setCroppedBase64(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (college: College) => {
    setSelectedCollege(college);
    setFormData({
      collegeName: college.collegeName,
      logoUrl: college.logoUrl,
      location: college.location,
      order: college.order,
    });
    setPreviewUrl(college.logoUrl);
    setImgSrc('');
    setCroppedFile(null);
    setCroppedBase64(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (collegeId: string) => {
    setDeleteCollegeId(collegeId);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.collegeName || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    // For new entries, require a logo. For edits, either new logo or existing logo
    if (!selectedCollege && !croppedBase64) {
      toast.error('Please upload and crop a logo');
      return;
    }

    if (selectedCollege && !croppedBase64 && !formData.logoUrl) {
      toast.error('Please upload and crop a logo or keep the existing one');
      return;
    }

    try {
      setIsSubmitting(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const url = selectedCollege
        ? `${backendUrl}/admin/college-tieups/${selectedCollege._id}`
        : `${backendUrl}/admin/college-tieups`;

      // Create JSON payload with base64 logo
      const payload: any = {
        collegeName: formData.collegeName,
        location: formData.location,
        order: formData.order,
      };

      // If there's a new cropped base64, include it. Otherwise, if editing, keep existing logo URL
      if (croppedBase64) {
        payload.logoUrl = croppedBase64;
      } else if (selectedCollege && formData.logoUrl) {
        // For edits without new file, send existing logo URL
        payload.logoUrl = formData.logoUrl;
      }

      const response = await axiosInstance.post(url, payload);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          selectedCollege
            ? 'College updated successfully'
            : 'College added successfully'
        );
        setIsDialogOpen(false);
        // Clean up preview URL if it was a blob
        if (previewUrl && previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(previewUrl);
        }
        // Reset form
        setFormData({
          collegeName: '',
          logoUrl: '',
          location: '',
          order: 0,
        });
        setPreviewUrl('');
        setCroppedFile(null);
        setCroppedBase64(null);
        fetchColleges();
      } else {
        const error = response.data.message;
        toast.error(error.message || 'Failed to save college');
      }
    } catch (error) {
      console.error('Error saving college:', error);
      toast.error('Failed to save college. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCollegeId) return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axiosInstance.delete(
        `${backendUrl}/admin/college-tieups/${deleteCollegeId}`);

      if (response.status === 200) {
        toast.success('College deleted successfully');
        setIsDeleteDialogOpen(false);
        setDeleteCollegeId(null);
        fetchColleges();
      } else {
        const error = response.data.message;
        toast.error(error.message || 'Failed to delete college');
      }
    } catch (error) {
      console.error('Error deleting college:', error);
      toast.error('Failed to delete college. Please try again.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? Number(value) : value,
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">College Tieups</h1>
            <p className="text-gray-600 mt-1">
              Manage college partnerships and collaborations
            </p>
          </div>
          <Button
            onClick={handleAddClick}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add College
          </Button>
        </div>

        <Card className="border-gray-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              College Partnerships
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading colleges...</p>
              </div>
            ) : colleges.length === 0 ? (
              <div className="text-center py-8">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-semibold">
                  No colleges found
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Click "Add College" to get started
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Logo
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        College Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Location
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Order
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {colleges
                      .sort((a, b) => a.order - b.order)
                      .map((college) => (
                        <tr
                          key={college._id}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            {college.logoUrl ? (
                              <img
                                src={college.logoUrl}
                                alt={college.collegeName}
                                className="h-12 w-12 object-contain rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/images/logo.png';
                                }}
                              />
                            ) : (
                              <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                                <GraduationCap className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-900">
                              {college.collegeName}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-gray-600">
                              {college.location}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-gray-600">
                              {college.order}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleEditClick(college)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteClick(college._id || '')
                                  }
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCollege ? 'Edit College' : 'Add New College'}
            </DialogTitle>
            <DialogDescription>
              {selectedCollege
                ? 'Update college partnership information'
                : 'Fill in the details to add a new college partnership'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Logo Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="logo">College Logo * (PNG only - will be cropped to 2000x2000, max 2MB)</Label>
              {!imgSrc && !previewUrl && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <span className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </span>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG only (Max 10MB) - Original image state will be preserved
                  </p>
                </div>
              )}

              {/* Image Crop View */}
              {imgSrc && (
                <div className="space-y-4">
                  <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden">
                    <Cropper
                      image={imgSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                      cropShape="rect"
                      showGrid={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="zoom" className="w-20">
                        Zoom: {zoom.toFixed(1)}x
                      </Label>
                      <input
                        id="zoom"
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={handleCropComplete}
                        disabled={!croppedAreaPixels || isSubmitting}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        {isSubmitting ? 'Processing...' : 'Crop Image'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setImgSrc('');
                          setCrop({ x: 0, y: 0 });
                          setZoom(1);
                          setCroppedAreaPixels(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Drag to move, use zoom slider to adjust. Image will be cropped to 2000x2000 pixels. Click "Crop Image" to preview, then "Save" to upload.
                    </p>
                  </div>
                </div>
              )}

              {/* Preview Cropped Logo */}
              {previewUrl && !imgSrc && (
                <div className="space-y-2">
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="College logo preview"
                      className="h-32 w-32 object-contain border border-gray-300 rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveLogo}
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {croppedBase64 && (
                    <p className="text-xs text-green-600 font-medium">
                      ✓ Image cropped and ready. Click "Save" to upload.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Name and Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">College Name *</Label>
                <Input
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  placeholder="Enter college name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  required
                />
              </div>
            </div>

            {/* Order */}
            <div className="space-y-2">
              <Label htmlFor="order">Order *</Label>
              <Input
                id="order"
                name="order"
                type="number"
                value={formData.order}
                onChange={handleInputChange}
                placeholder="Display order (lower numbers appear first)"
                required
                min="0"
              />
              <p className="text-xs text-gray-500">
                Lower numbers appear first in the list
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : selectedCollege ? 'Update' : 'Add'} College
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              college partnership record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default CollegeTieupsPage;

