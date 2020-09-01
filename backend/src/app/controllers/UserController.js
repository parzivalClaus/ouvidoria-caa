import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    try {
      const { id, name, email, access_level } = await User.create(req.body);

      return res.json({
        id,
        name,
        email,
        access_level,
      });
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new UserController();
