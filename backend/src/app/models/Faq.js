import Sequelize, { Model } from 'sequelize';

class Faq extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        category: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Faq;
