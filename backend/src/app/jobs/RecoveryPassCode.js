import Mail from '../../lib/Mail';

class RecoveryPassCode {
  get key() {
    return 'RecoveryPassCode';
  }

  async handle({ data }) {
    const { recoveryPass, email, name } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Link para recuperação de senha',
      template: 'recoveryPassCode',
      context: {
        name,
        recoveryPass,
        email,
      },
    });
  }
}

export default new RecoveryPassCode();
