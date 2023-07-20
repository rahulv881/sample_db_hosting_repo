import { masterProject } from '../../db/daos';
import { DB_CONN } from '../../db/dbConnection';

export const getProjectList = async (option: { limit: number; start: number }): Promise<any[]> => {
  try {
    const limit = option.limit;
    const start = option.start;
    const projects = await masterProject.findAllProject(limit, start);
    return projects;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch project list');
  }
};

export const createProject = async (projectData: any): Promise<any> => {
  try {
    const project = await masterProject.createProject(projectData);
    return project;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create project');
  }
};

export const getEmployeesByProjectId = async (
  projectId: number,
  date: { month: number; year: number }
): Promise<any | null> => {
  try {
    const project = await masterProject.findEmployeesInProject(projectId, date);
    // userProject -> userProjectEmployeeAlias
    const employeesRaw = project?.userProject ?? [];
    const employees = employeesRaw.map(data => {
      const { USER_ID, LNAME, FNAME } = data.userProjectEmployeeAlias;
      const TASKS = data.userProjectTaskAlias.map(task => {
        const {
          TASK_ID,
          TASK_NAME,
          START_DATE,
          END_DATE,
          DAILY_LOCK_HOURS,
          STATUS,
          CREATED_ON,
          UPDATED_ON
        } = task;
        return {
          TASK_ID,
          TASK_NAME,
          START_DATE,
          END_DATE,
          DAILY_LOCK_HOURS,
          STATUS,
          CREATED_ON,
          UPDATED_ON
        };
      });
      return {
        USER_ID,
        FNAME,
        LNAME,
        TASKS
      };
    });
    return employees;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch project');
  }
};

export const getTasksByProjectId = async (): Promise<any | null> => {
  try {
    // const project = await masterProject.findTasksInProject(projectId);
    const tables = await DB_CONN.RMS.query('SHOW TABLES;');
    return tables;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch project');
  }
};

export const getProjectById = async (projectId: number): Promise<any | null> => {
  try {
    const project = await masterProject.findById(projectId);
    return project;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch project');
  }
};

export const updateProject = async (projectId: number, projectData: any): Promise<any | null> => {
  try {
    const project = await masterProject.findByPk(projectId);
    if (project) {
      await masterProject.updateProject(projectId, projectData);
      return true;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update project');
  }
};

export const deleteProject = async (projectId: number): Promise<boolean> => {
  try {
    const project = await masterProject.findByPk(projectId);
    if (project) {
      await masterProject.deleteProject(projectId);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete project');
  }
};
