/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export function useCloudinaryUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        return data.secure_url;
      } else {
        setError("Upload failed");
        throw new Error("Upload failed");
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { upload, imageUrl, loading, error };
}
