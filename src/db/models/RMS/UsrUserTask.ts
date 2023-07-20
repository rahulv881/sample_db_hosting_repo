// UsrUserTask.ts
import { DataTypes, Model } from 'sequelize';
import Project from './Project';
import { DB_CONN } from '../../dbConnection';
import { MODELS, TABLES } from '../../../constants';
import Employee from './Employee';
import UserProject from './UserProject';

class UsrUserTask extends Model {}

UsrUserTask.init(
  {
    TASK_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    USR_PROJECT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
      // references: {
      //   model: 't_usr_user_project',
      //   key: 'USR_PROJECT_ID'
      // }
    },
    TASK_NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    START_DATE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    END_DATE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DAILY_LOCK_HOURS: {
      type: DataTypes.TIME,
      allowNull: false
    },
    STATUS: {
      type: DataTypes.ENUM('C', 'P', 'D'),
      allowNull: false,
      comment: 'C:Completed, P:Pending, D:Delayed'
    },
    CREATED_ON: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CREATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UPDATED_ON: {
      type: DataTypes.DATE,
      allowNull: false
    },
    UPDATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: DB_CONN.RMS,
    tableName: TABLES.RMS.T_USR_USER_TASK,
    modelName: MODELS.RMS.T_USR_USER_TASK,
    timestamps: true,
    createdAt: 'CREATED_ON',
    updatedAt: 'UPDATED_ON'
  }
);

// UsrUserTask.belongsTo(Project, { foreignKey: 'PROJECT_ID' });
// UsrUserTask.hasMany(Employee, {foreignKey: ''})
UsrUserTask.hasOne(Employee, { foreignKey: 'USER_ID', as: 'UsrUserTaskEmployeeAlias' });

export default UsrUserTask;
