const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { Nutricionistas } = require('./database/models');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: 'sanhalertbot@gmail.com',
    pass: 'tqbd nqor cfit ltpm',
  },
});

const enviarEmail = async () => {
  try {
    const nutricionistas = await Nutricionistas.findAll();

    nutricionistas.forEach(async (nutricionista) => {
      const info = await transporter.sendMail({
        from: 'sanhalertbot@gmail.com',
        to: nutricionista.email,
        subject: 'HORA DE VERIFICAR SEUS PACIENTES',
        text: 'Olá nutri 😃, já verificou seus pacientes hoje ?',
      });

      console.log('E-mail enviado:', info.response);
    });
  } catch (error) {
    console.error(error);
  }
};

// Agendar o envio de e-mails a cada 3 dias (a partir da meia-noite)
cron.schedule('0 0 */3 * *', async () => {
  console.log('Enviando e-mails...');
  await enviarEmail();
});

module.exports = { enviarEmail };