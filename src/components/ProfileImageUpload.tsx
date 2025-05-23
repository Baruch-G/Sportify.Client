import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  Avatar,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AccountCircle from '@mui/icons-material/AccountCircle';

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

interface ProfileImageUploadProps {
  token: string;
  onSubmit: () => void;
}

function ProfileImageUpload({ token, onSubmit }: ProfileImageUploadProps) {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, logout, setImage } = useAuth();

  console.log(user);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError("Please upload an image file");
        return;
      }

      setSelectedImage(file);
      setError(null);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Max width for the image
        const MAX_HEIGHT = 800; // Max height for the image
        
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with reduced quality
        const base64 = canvas.toDataURL('image/jpeg', 0.7); // 0.7 is the quality (0-1)
        resolve(base64);
      };
      
      img.onerror = reject;
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      // Skip image upload if no image selected
      onSubmit();
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch(`${serverURL}/users/upload-profile-image/${user?.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type header - browser will set it automatically with boundary for FormData
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload profile image');
      }

      const data = await response.json();
      if (data.imageUrl) {
        // The server now handles both upload and profile update in one step
        setImage(data.imageUrl);
        onSubmit();
      } else {
        throw new Error('No image URL received from server');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to upload profile image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        alignItems: 'center'
    }}>
        <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                mb: 1
            }}
        >
            Add a Profile Photo
        </Typography>

        <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 2 }}
        >
            Upload a photo to help others recognize you
        </Typography>

        <Box
            sx={{
                width: '100%',
                maxWidth: 300,
                aspectRatio: '1',
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                border: 2,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                    borderColor: 'primary.main',
                    '& .upload-overlay': {
                        opacity: 1
                    }
                }
            }}
        >
            {imagePreview ? (
                <img
                    src={imagePreview}
                    alt="Profile preview"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.secondary'
                    }}
                >
                    <AccountCircle sx={{ fontSize: 64 }} />
                    <Typography variant="body2">No photo selected</Typography>
                </Box>
            )}

            <Box
                className="upload-overlay"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s'
                }}
            >
                <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="profile-image-upload">
                    <Button
                        component="span"
                        variant="contained"
                        startIcon={<CloudUpload />}
                        disabled={isUploading}
                        sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: 2,
                            '&:hover': {
                                boxShadow: 4,
                            },
                        }}
                    >
                        Choose Photo
                    </Button>
                </label>
            </Box>
        </Box>

        <Typography 
            variant="caption" 
            color="text.secondary" 
            align="center"
        >
            Max size: 5MB, JPG/PNG
        </Typography>

        <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            width: '100%',
            maxWidth: 300
        }}>
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isUploading}
                fullWidth
                sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: 2,
                    '&:hover': {
                        boxShadow: 4,
                    },
                }}
            >
                {isUploading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    'Continue'
                )}
            </Button>
            <Button
                variant="outlined"
                onClick={() => onSubmit()}
                disabled={isUploading}
                fullWidth
                sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2,
                    },
                }}
            >
                Skip
            </Button>
        </Box>
    </Box>
  );
}

export default ProfileImageUpload; 