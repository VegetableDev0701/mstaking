import type { NextApiRequest, NextApiResponse } from 'next'
import { IACollection } from '@/constants/collection'
import { IErrorResponse } from '@/constants/index'
import { Collection } from '@/interface/collection';
export default async function handler(req: NextApiRequest, res: NextApiResponse<Collection[] | IErrorResponse>) {
  try {
    const response = await fetch(
      `${process.env.API_SERVER}/api/collection/all`,
      {
        method: 'GET',
      }
    );
    if (response.statusText !== 'OK') {
      const errorData = await response.json();
      res.status(response.status).json({ 
        error: errorData.text,
        code: errorData.code
      });
      return;
    }  
    const data = await response.json();
    console.log(data);
    res.status(response.status || 200).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}