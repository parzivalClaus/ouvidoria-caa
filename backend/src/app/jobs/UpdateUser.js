import Mail from '../../lib/Mail';

class UpdateUser {
  get key() {
    return 'UpdateUser';
  }

  async handle({ data }) {
    const { name } = data;

    await Mail.sendMail({
      to: 'Ouvidoria <ouvidoria@clubearamacan.com.br>',
      subject: 'Usuário atualizado',
      template: 'updateUser',
      context: {
        user: name,
      },
    });
  }
}

export default new UpdateUser();
