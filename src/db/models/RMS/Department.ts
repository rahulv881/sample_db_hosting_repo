// Department.ts
import { DataTypes, Model } from 'sequelize';
import { DB_CONN } from '../../dbConnection';
import { MODELS, TABLES } from '../../../constants';

class Department extends Model {}

Department.init(
  {
    DEP_ID: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true
    },
    NAME: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    STATUS: {
      type: DataTypes.ENUM('A', 'I'),
      allowNull: false
    }
  },
  {
    sequelize: DB_CONN.RMS,
    tableName: TABLES.RMS.T_GLOBAL_DEPARTMENT_MASTER,
    modelName: MODELS.RMS.T_GLOBAL_DEPARTMENT_MASTER,
    timestamps: false
  }
);

export default Department;
