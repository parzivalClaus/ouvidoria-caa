export default {
  host: process.env.MAIL_HOST,
  secure: false,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe Ouvidoria C.A.A. <noreply@clubearamacan.com.br',
  },
};
