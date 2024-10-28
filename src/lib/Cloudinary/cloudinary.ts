import { Cloudinary } from '@cloudinary/url-gen';
export const myCld = new Cloudinary({
  cloud: {
        cloudName:process.env.NEXT_PUBLIC_CLOUD_NAME,
        apiKey:process.env.NEXT_CLOUD_API_KEY,
    apiSecret:process.env.NEXT_API_SECRET,
  }
});


 