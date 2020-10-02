import * as Yup from 'yup';
import { uuid } from 'uuidv4';
import bcrypt from 'bcryptjs';
import User from '../models/User';

import RecoveryPassCode from '../jobs/RecoveryPassCode';
import NewPass from '../jobs/NewPass';
import Queue from '../../lib/Queue';

class RecoveryPassController {
  async store(req, res) {
    const { email } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação, confira seus dados' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        error: 'Usuário não existe, por favor confira o e-mail digitado',
      });
    }

    const recoveryPass = uuid();

    await user.update({ recovery_pass_code: recoveryPass });

    await Queue.add(RecoveryPassCode.key, {
      recoveryPass,
      email,
      name: user.name,
    });

    return res.json({ recoveryPass });
  }

  async index(req, res) {
    const { activeCode, email } = req.query;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ error: 'Este usuário não foi localizado.' });
    }

    if (activeCode !== user.recovery_pass_code) {
      return res
        .status(401)
        .json({ error: 'O código de recuperação de senha não confere.' });
    }

    const newPass = uuid();

    const bcryptPass = await bcrypt.hash(newPass, 8);

    await user.update({ recovery_pass_code: null, password_hash: bcryptPass });

    await Queue.add(NewPass.key, {
      newPass,
      email,
      name: user.name,
    });

    return res.json({
      sucess:
        'Sua nova senha foi enviada no e-mail. Você poderá alterá-la após o login',
    });
  }
}

export default new RecoveryPassController();
