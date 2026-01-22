"use client";

import { useState } from "react";
import Image from "next/image";

interface CloudinaryUploaderProps {
  onUpload: (url: string) => void; // callback to send uploaded url
}

export default function CloudinaryUploader({ onUpload }: CloudinaryUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async () => {
    if (!file) return;
    setUploading(true);

    // 1. Ask backend for signed params
    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ params: {} }),
      headers: { "Content-Type": "application/json" },
    });
    const { signature, timestamp, cloudName, apiKey } = await res.json();

    // 2. Upload directly to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await uploadRes.json();
    setUploadedUrl(data.secure_url);
    setUploading(false);

    // 🔥 Send URL to parent
    if (data.secure_url) {
      onUpload(data.secure_url);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Upload Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div className="mt-3 relative w-40 h-40">
          <Image
            src={preview}
            alt="preview"
            fill
            className="object-cover rounded-lg"
            unoptimized // required for blob: URL
          />
        </div>
      )}

      <button
        onClick={uploadImage}
        disabled={!file || uploading}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="mt-3">
          <p className="text-sm text-green-600">Image saved:</p>
          
        </div>
      )}
    </div>
  );
}
