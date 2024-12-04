'use client'

import React, { useState } from 'react';
import { SignedIn, SignedOut,  SignInButton } from '@clerk/nextjs';

export default function UploadPage() {
  const [file, setFile] = useState< File | null>(null);
  const [uploadStatus, setUploadStatus] =  useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile( selectedFile );
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) return ;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus('Upload failed');
      }
    } catch (error) {
      setUploadStatus('Error uploading file');
    }
  };

  return (
    <div className="  flex flex-col items-center justify-center">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      
      <SignedIn>
        <div className="w-full max-w-md p-8 space-y-4">
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="w-full p-2 border rounded"
          />
          <button 
            onClick={handleUpload} 
            disabled={!file}
            className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Upload PDF
          </button>
          {uploadStatus && (
            <p className="text-center mt-4">{uploadStatus}</p>
          )}
        </div>
      </SignedIn>
    </div>
  );
}