import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        access_level: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
