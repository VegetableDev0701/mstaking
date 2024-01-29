import type { NextApiRequest, NextApiResponse } from 'next'
import { Collection } from '@/interface/collection'
export default async function handler(req: NextApiRequest, res: NextApiResponse<Collection | Object>) {
  const reqData = req.body
  try {
    const response = await fetch(
      `${process.env.API_SERVER}/api/collection/`,
      {
        method: 'POST',
        body: JSON.stringify(reqData)
      }
    );
    if (response.statusText !== 'OK') {
      const errorData = await response.json();
      res.status(response.status).json({status: false});
      return false;
    }  
    const data = await response.json();
    res.status(response.status || 200).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({status: false});
  }
}