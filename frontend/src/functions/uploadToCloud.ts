import {v2 as cloudinary}  from "cloudinary";
import streamifier from "streamifier";

// cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUD_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUD_SECRET,
});
// End cloudinary

let streamUpload = (buffer: string): any => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloud = async (buffer: string) => {
  let result = await streamUpload(buffer);
  return result.url;
}

export default uploadToCloud;