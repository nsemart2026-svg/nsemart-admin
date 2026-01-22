import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  return NextResponse.json({ message: "Sign image API is working" });
}

export async function POST(req: NextRequest) {
  try {
    const { paramsToSign } = await req.json();
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({ signature });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to sign request" },
      { status: 500 }
    );
  }
}

// /* eslint-disable @typescript-eslint/no-unused-vars */
// const uploadToCloudinary = async (file: File) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "unsigned_preset");

//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await response.json();
//   return data.secure_url;
// };
