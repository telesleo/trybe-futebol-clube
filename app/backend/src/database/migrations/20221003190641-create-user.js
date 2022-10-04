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
        allowNull: true,
        type: Sequelize.STRING(256),
      },
      role: {
        allowNull: true,
        type: Sequelize.STRING(256),
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(256),
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING(256),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};