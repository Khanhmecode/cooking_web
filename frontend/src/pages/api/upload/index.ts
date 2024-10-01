import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log(Buffer.from(req.body).toString('base64'))
    res.status(200).json({
      message: 'OK',      
    })
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

export default handler;