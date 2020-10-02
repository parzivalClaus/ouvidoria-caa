import Mail from '../../lib/Mail';

class NewPass {
  get key() {
    return 'NewPass';
  }

  async handle({ data }) {
    const { newPass, email, name } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Nova senha de acesso',
      template: 'newPass',
      context: {
        name,
        newPass,
        email,
      },
    });
  }
}

export default new NewPass();
