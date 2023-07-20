// UserProject.ts
import { DataTypes, Model } from 'sequelize';
import Project from './Project';
import { DB_CONN } from '../../dbConnection';
import { MODELS, TABLES } from '../../../constants';
import Employee from './Employee';
import UsrUserTask from './UsrUserTask';

class UserProject extends Model {}

UserProject.init(
  {
    USR_PROJECT_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PROJECT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: DB_CONN.RMS,
    tableName: TABLES.RMS.T_USR_USER_PROJECT,
    modelName: MODELS.RMS.T_USR_USER_PROJECT,
    timestamps: false
  }
);

// UserProject.belongsTo(Project, { foreignKey: 'PROJECT_ID' });
// UserProject.hasMany(Employee, {foreignKey: ''})
UserProject.belongsTo(Employee, { foreignKey: 'USER_ID', as: 'userProjectEmployeeAlias' });
Employee.hasMany(UserProject, { foreignKey: 'USER_ID', as: 'employeeProjectsAlias' });
UserProject.hasMany(UsrUserTask, {
  sourceKey: 'USR_PROJECT_ID',
  foreignKey: 'USR_PROJECT_ID',
  as: 'userProjectTaskAlias'
});

export default UserProject;
