import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class Manifestation extends Model {
  static init(sequelize) {
    super.init(
      {
        protocol: Sequelize.STRING,
        type: Sequelize.STRING,
        creator_id: Sequelize.INTEGER,
        title: Sequelize.STRING,
        message: Sequelize.STRING,
        closed: Sequelize.STRING,
        category: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async (manifestation) => {
      if (manifestation.type === 'question') {
        manifestation.protocol = uuid();
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'creator_id', as: 'creator' });
  }
}

export default Manifestation;
