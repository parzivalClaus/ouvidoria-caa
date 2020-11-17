import * as Yup from 'yup';
import { Op } from 'sequelize';
import Faq from '../models/Faq';

class FaqController {
  async index(req, res) {
    const { q } = req.query;
    const title = q || '';
    const { category } = req.query;
    const cat = category || '';

    try {
      const result = await Faq.findAndCountAll({
        where: {
          question: { [Op.iLike]: `%${title}%` },
          category: { [Op.iLike]: `%${cat}%` },
        },
      });

      return res.json(result);
    } catch (err) {
      return res.json(err);
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
      answer: Yup.string().required(),
      category: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro nos dados, por favor confira todos os campos' });
    }

    try {
      const result = await Faq.create(req.body);

      return res.json(result);
    } catch (err) {
      return res.json(err);
    }
  }

  async update(req, res) {
    try {
      const { faqId } = req.params;

      const faq = await Faq.findByPk(faqId);

      if (!faq) {
        return res.status(400).json({ error: 'FAQ não localizado.' });
      }

      const { question, answer, category } = await faq.update(req.body);

      return res.json({ question, answer, category });
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new FaqController();
