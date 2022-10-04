import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: true,
    type: STRING(256),
  },
  role: {
    allowNull: true,
    type: STRING(256),
  },
  email: {
    allowNull: true,
    type: STRING(256),
  },
  password: {
    allowNull: true,
    type: STRING(256),
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default User;
