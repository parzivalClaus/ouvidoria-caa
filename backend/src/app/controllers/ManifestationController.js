import * as Yup from 'yup';
import { Op } from 'sequelize';
import Manifestation from '../models/Manifestation';
import User from '../models/User';

class ManifestationController {
  async index(req, res) {
    const { closed } = req.query || '';
    const { questionProtocol } = req.params;

    if (questionProtocol) {
      try {
        const manifestation = await Manifestation.findAndCountAll({
          where: {
            protocol: questionProtocol,
          },
          attributes: ['id', 'protocol', 'message', 'category'],
          include: [
            {
              model: User,
              as: 'creator',
              attributes: ['name', 'email'],
            },
          ],
        });
        return res.json(manifestation);
      } catch (err) {
        return res.json(err);
      }
    }

    const manifestations = await Manifestation.findAndCountAll({
      where: {
        closed: { [Op.iLike]: `%${closed}%` },
        type: 'question',
      },
      attributes: ['id', 'protocol', 'message', 'category'],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.json(manifestations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      category: Yup.string().required(),
      message: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos' });
    }

    try {
      const creatorId = req.userId;
      const { type, message, category } = req.body;

      const result = await Manifestation.create({
        creator_id: creatorId,
        type,
        message,
        category,
        closed: 'false',
      });

      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new ManifestationController();
