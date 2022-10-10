module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};