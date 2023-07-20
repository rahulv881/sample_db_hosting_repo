// Employee.ts
import { DataTypes, Model, literal } from 'sequelize';
import { DB_CONN } from '../../dbConnection';
import { MODELS, TABLES } from '../../../constants';
import Role from './Role';
import UserProject from './UserProject';
import Department from './Department';

class Employee extends Model {}

Employee.init(
  {
    USER_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ROLE_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DEP_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FNAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    LNAME: {
      type: DataTypes.STRING(50)
    },
    EMP_ID: {
      type: DataTypes.STRING(6),
      allowNull: false
    },
    EMAIL_ID: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    CONTACT: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    STATUS: {
      type: DataTypes.ENUM('A', 'I', 'T'),
      allowNull: false
    },
    CREATED_ON: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    CREATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UPDATED_ON: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UPDATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize: DB_CONN.RMS,
    tableName: TABLES.RMS.T_USR_USER,
    modelName: MODELS.RMS.T_USR_USER,
    timestamps: true,
    createdAt: 'CREATED_ON',
    updatedAt: 'UPDATED_ON'
  }
);

// Employee.belongsTo(Role, { foreignKey: 'ROLE_ID' });
// Employee.hasMany(UserProject, { foreignKey: 'USER_ID', as: 'TUsrUserProjects' });
Employee.hasOne(Role, { foreignKey: 'ROLE_ID', as: 'employeeRole' });
Employee.belongsTo(Role, { foreignKey: 'ROLE_ID', as: 'EmployeeRole' });

export default Employee;
