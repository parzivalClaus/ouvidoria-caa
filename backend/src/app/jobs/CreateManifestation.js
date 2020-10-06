import Mail from '../../lib/Mail';

class CreateManifestation {
  get key() {
    return 'CreateManifestation';
  }

  async handle({ data }) {
    const { name, email, protocol } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Sua manifestação foi registrada com sucesso.',
      template: 'createManifestation',
      context: {
        name,
        email,
        protocol,
      },
    });
  }
}

export default new CreateManifestation();
