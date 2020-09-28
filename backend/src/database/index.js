import Sequelize from 'sequelize';

import User from '../app/models/User';
import Manifestation from '../app/models/Manifestation';
import Faq from '../app/models/Faq';

import databaseConfig from '../config/database';

const models = [User, Manifestation, Faq];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) =>
          model && model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
