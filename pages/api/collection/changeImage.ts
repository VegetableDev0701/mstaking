import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server';
import { Collection } from '@/interface/collection'
export default async function handler(req: NextRequest, res: NextApiResponse<Object>) {
  const reqData = await req.formData()
  try {
    const response = await fetch(
      `${process.env.API_SERVER}/api/collection/changeBkg`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: reqData
      }
    );
    if (response.statusText !== 'OK') {
      const errorData = await response.json();
      res.status(response.status).json({status: false});
      return false;
    }  
    const data = await response.json();
    res.status(response.status || 200).json({status: true});
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({status: false});
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
}