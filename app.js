import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { createTransport } from 'nodemailer';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

async function enviarEmail ({ subject, text, toEmail }) {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.usermail,
      pass: process.env.passwordmail
    }
  };

  const transporter = createTransport(config);

  const message = {
    from: process.env.usermail,
    to: "carlamalenapiazza@gmail.com",
    subject: "Titulo",
    text: "tonta"
  };

  return await transporter.sendMail(message);
}

app.post('/', async (req, res) => {
  try {
    const sentInfo = await enviarEmail(req.body);

    res.status(200).json(sentInfo);
  } catch (error) {
    console.log(error);

    res.send('error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
