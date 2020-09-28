import Manifestation from '../models/Manifestation';

class CloseManifestationController {
  async update(req, res) {
    const { questionProtocol } = req.params;

    const question = await Manifestation.findOne({
      where: { protocol: questionProtocol, type: 'question' },
    });

    if (!question) {
      return res.status(400).json({ error: 'Pergunta não encontrada' });
    }

    try {
      await question.update({
        closed: 'true',
      });

      return res.json(question);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new CloseManifestationController();
