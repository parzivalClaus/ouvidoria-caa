module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'ouvidoria',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
