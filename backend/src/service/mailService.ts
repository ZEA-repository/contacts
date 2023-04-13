import nodemailer, { Transporter } from 'nodemailer'

const MailService = () => {
  return nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: Number(process.env.SMPT_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD,
    },
  })
}

const transporter: Transporter = MailService()

export const sendActivationMail = async (to: string, link: string) => {
  await transporter.sendMail({
    from: process.env.SMPT_USER,
    to,
    subject: 'Активация аккаунта на ' + process.env.API_URL,
    text: 'текст',
    html: ` <div>
              <h1>Для активации перейдите по ссылке</h1>
              <a href="${link}">${link}</a>
          </div>
        `,
  })
}
