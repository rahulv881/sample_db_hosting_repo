import { DataTypes, Model } from 'sequelize';
import { DB_CONN } from '../../dbConnection';
import { MODELS, TABLES } from '../../../constants';
import Department from './Department';

class Role extends Model {}

Role.init(
  {
    ROLE_ID: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true
    },
    DEP_ID: {
      type: DataTypes.TINYINT,
      defaultValue: null
    },
    ROLE: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    STATUS: {
      type: DataTypes.ENUM('A', 'I'),
      allowNull: false,
      defaultValue: 'A',
      comment: 'A:Active, I:Inactive'
    }
  },
  {
    sequelize: DB_CONN.RMS,
    tableName: TABLES.RMS.T_USR_ROLE_MASTER,
    modelName: MODELS.RMS.T_USR_ROLE_MASTER,
    timestamps: false
  }
);

export default Role;

Role.belongsTo(Department, { foreignKey: 'DEP_ID', as: 'RoleDepartment' });
