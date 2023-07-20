import { DataTypes, Model} from 'sequelize';
import { DB_CONN } from '../../dbConnection';
import { MODELS, TABLES } from '../../../constants';
import Project from './Project';
import Employee from './Employee';

class Task extends Model {
  public TASK_ID: number;
  public PROJECT_ID: number;
  public USER_ID: number;
  public TASK_NAME: string;
  public TASK_DESC: string;
  public PRIORITY: string;
  public START_DATE: Date;
  public END_DATE: Date;
  public DAILY_LOCK_HOURS: string;
  public STATUS: string;
  public CREATED_ON: Date;
  public CREATED_BY!: number;
  public UPDATED_ON: Date;
  public UPDATED_BY!: number;
}

Task.init(
  {
    TASK_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PROJECT_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    USER_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TASK_NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    TASK_DESC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PRIORITY: {
      type: DataTypes.STRING,
      allowNull: true
    },
    START_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    END_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    DAILY_LOCK_HOURS: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    CREATED_ON: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    CREATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    UPDATED_ON: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UPDATED_BY: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    STATUS: {
      type: DataTypes.ENUM('C', 'P', 'D'),
      allowNull: false,
      comment: 'C:Complete, P:Pending D: Deployed'
    }
  },
  {
    sequelize: DB_CONN.RMS,
    tableName: TABLES.RMS.T_USR_USER_TASK,
    modelName: MODELS.RMS.T_USR_USER_TASK,
    timestamps: false
  }
);

Task.belongsTo(Project, {
  foreignKey: 'PROJECT_ID',
  as: 'TaskProject'
});

Task.belongsTo(Employee, {
  foreignKey: 'USER_ID',
  as: 'TaskUsers'
});

export default Task;
