// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };
import nodemailer from 'nodemailer';

export default function handler(
  req,
  res,
) {
    const message = {
        from: req.body.email,
        to: req.body.reciever,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.message,
      };

      const transporter = nodemailer.createTransport({
        host: 'stmp.gmail.com',
        port: 587,
        service: 'gmail',
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });
      if (req.method === 'POST') {
        
        transporter.sendMail(message, (err, info) => {
    
          if (err) {
            res.status(404).json({
                error: `Connection refused at ${err.address}`
            });
          } else {
            res.status(250).json({
                success: `Message delivered to ${info.accepted}`
            });
          }
        });
      }

}
