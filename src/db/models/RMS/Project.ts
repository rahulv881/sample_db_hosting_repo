// Project.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { DB_CONN } from '../../dbConnection';
import { MODELS, TABLES } from '../../../constants';
import Department from './Department';
import UserProject from './UserProject';

class Project extends Model {
  public PROJECT_ID: number;
  public NAME: string;
  public START_DATE: Date;
  public END_DATE: Date;
  public STATUS: string;
  public CREATED_ON: Date;
  public CREATED_BY!: number;
  public UPDATED_ON: Date;
  public UPDATED_BY!: number;
}

Project.init(
  {
    PROJECT_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    NAME: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    START_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    END_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    STATUS: {
      type: DataTypes.ENUM('A', 'I', 'D'),
      allowNull: false
    },
    CREATED_ON: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CREATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UPDATED_ON: {
      type: DataTypes.DATE,
      allowNull: false
    },
    UPDATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize: DB_CONN.RMS,
    modelName: MODELS.RMS.T_GLOBAL_PROJECT_MASTER,
    tableName: TABLES.RMS.T_GLOBAL_PROJECT_MASTER,
    timestamps: true,
    createdAt: 'CREATED_ON',
    updatedAt: 'UPDATED_ON'
  }
);

// Project.belongsTo(Department, { foreignKey: 'DEP_ID' });
Project.hasMany(UserProject, { foreignKey: 'PROJECT_ID', as: 'userProject' });

export default Project;
