const cloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
};

export default cloudinaryConfig;
