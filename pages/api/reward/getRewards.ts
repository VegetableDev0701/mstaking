import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      `${process.env.API_SERVER}/api/rewardGET/getreward`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: req.body
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
    console.log('reward', data)
    res.status(response.status || 200).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}