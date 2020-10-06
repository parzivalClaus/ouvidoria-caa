import * as Yup from 'yup';
import { Op } from 'sequelize';
import Manifestation from '../models/Manifestation';
import User from '../models/User';

import CreateManifestation from '../jobs/CreateManifestation';
import Queue from '../../lib/Queue';

class ManifestationController {
  async index(req, res) {
    const { closed } = req.query || '';
    const { q, id } = req.query;
    const { questionProtocol } = req.params;
    const title = q || '';
    const creatorId = id || '';

    if (questionProtocol) {
      try {
        const manifestation = await Manifestation.findAndCountAll({
          where: {
            protocol: questionProtocol,
          },
          attributes: [
            'id',
            'protocol',
            'title',
            'message',
            'category',
            'closed',
            'created_at',
          ],
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

    if (creatorId) {
      const manifestations = await Manifestation.findAndCountAll({
        where: {
          closed: { [Op.iLike]: `%${closed}%` },
          title: { [Op.iLike]: `%${title}%` },
          creator_id: creatorId,
        },
        attributes: [
          'id',
          'protocol',
          'title',
          'message',
          'category',
          'closed',
          'type',
          'creator_id',
          'created_at',
        ],
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

    const manifestations = await Manifestation.findAndCountAll({
      where: {
        closed: { [Op.iLike]: `%${closed}%` },
        title: { [Op.iLike]: `%${title}%` },
      },
      attributes: [
        'id',
        'protocol',
        'title',
        'message',
        'category',
        'closed',
        'type',
        'creator_id',
        'created_at',
      ],
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
      title: Yup.string().required(),
      message: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos' });
    }

    try {
      const creatorId = req.userId;
      const { type, title, message, category } = req.body;

      const result = await Manifestation.create({
        creator_id: creatorId,
        type,
        title,
        message,
        category,
        closed: 'false',
      });

      const { name, email } = await User.findByPk(creatorId);

      const { protocol } = result;

      await Queue.add(CreateManifestation.key, {
        protocol,
        name,
        email,
      });

      return res.json(result);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new ManifestationController();
