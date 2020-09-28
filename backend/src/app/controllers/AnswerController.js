import * as Yup from 'yup';
import Manifestation from '../models/Manifestation';
import User from '../models/User';

class AnswerController {
  async index(req, res) {
    const { questionProtocol } = req.params;

    try {
      const answers = await Manifestation.findAndCountAll({
        where: {
          protocol: questionProtocol,
          type: 'answer',
        },
        attributes: ['id', 'message'],
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['name', 'email'],
          },
        ],
      });
      return res.json(answers);
    } catch (err) {
      return res.json(err);
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      message: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos' });
    }

    const { questionProtocol } = req.params;

    const question = await Manifestation.findOne({
      where: { protocol: questionProtocol },
    });

    if (!question) {
      return res.status(400).json('Pergunta não encontrada');
    }

    try {
      const creatorId = req.userId;
      const { message } = req.body;

      const result = await Manifestation.create({
        creator_id: creatorId,
        type: 'answer',
        message,
        protocol: question.protocol,
        category: question.category,
        closed: null,
      });

      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new AnswerController();
