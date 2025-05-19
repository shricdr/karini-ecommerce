'use client'; // This component needs to run in the browser

import React, { useState, ChangeEvent, useCallback } from 'react';

interface FileUploadProps {
  onUploadSuccess: () => void;
  onUploadError: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:3000/api/product/uploadProducts', { 
        method: 'POST',
        // headers:{'Content-Type':'multipart/form-data'},
        body: formData,
      });

      if (response.ok) {
        setSelectedFile(null);
        setUploading(false);
        onUploadSuccess();
      } else {
        const errorData = await response.json();
        setUploading(false);
        onUploadError(errorData?.message || 'File upload failed.');
      }
    } catch (error: any) {
      setUploading(false);
      onUploadError(error.message || 'Network error during file upload.');
    }
  }, [selectedFile, onUploadSuccess, onUploadError]);

  return (
    <div>
      <input type="file" name='file' accept=".json" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? 'Uploading...' : 'Upload Data'}
      </button>
    </div>
  );
};

export default FileUpload;