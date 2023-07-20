import { ExtendedJoi as joi } from '../../../utils/validation';

export const joiValidate = {
  employee: {
    employeeProjectsQuery: joi.object().keys({
      date: joi.date().required(),
      // employeeIds: joi
      //   .array()
      //   .items(joi.number().integer().positive().required())
      //   .unique()
      //   .required(),
      employeeIds: joi.string().required(),
      // projectIds: joi
      //   .array()
      //   .items(joi.number().integer().positive().required())
      //   .unique()
      //   .required(),
      projectIds: joi.string().required()
    }),
    projectEmployeeQuery: joi.object().keys({
      month: joi.number().integer().positive().required(),
      year: joi.number().integer().positive().required()
    }),
    create: joi.object().keys({
      ROLE_ID: joi.number().required(),
      DEP_ID: joi.number().required(),
      EMP_ID: joi.number().required(),
      EMAIL_ID: joi.string().required(),
      CONTACT: joi.string().required(),
      STATUS: joi.string().default('A'),
      FNAME: joi.string().required(),
      LNAME: joi.string().required(),
      CREATED_BY: joi.number().optional(),
      UPDATED_BY: joi.number().optional()
    }),
    update: joi.object().keys({
      USER_ID: joi.number().required(),
      ROLE_ID: joi.number().optional(),
      DEP_ID: joi.number().optional(),
      EMP_ID: joi.number().optional(),
      EMAIL_ID: joi.string().optional(),
      CONTACT: joi.string().optional(),
      STATUS: joi.string().optional().valid('A', 'I'),
      FNAME: joi.string().optional(),
      LNAME: joi.string().optional(),
      CREATED_BY: joi.number().optional(),
      UPDATED_BY: joi.number().optional()
    })
  },
  task: {
    getTask: joi.object().keys({
      limit: joi.string().optional(),
      start: joi.string().optional()
    }),
    create: joi.object().keys({
      PROJECT_ID: joi.number().optional(),
      USER_ID: joi.number().optional(),
      TASK_NAME: joi.string().required(),
      START_DATE: joi.date().required(),
      END_DATE: joi.date().required(),
      DAILY_LOCK_HOURS: joi.string().required(),
      STATUS: joi.string().required().valid('P', 'C', 'D')
    }),
    update: joi
      .object()
      .keys({
        PROJECT_ID: joi.number().optional(),
        USER_ID: joi.number().optional(),
        TASK_NAME: joi.string().optional(),
        START_DATE: joi.date().optional(),
        END_DATE: joi.date().optional(),
        DAILY_LOCK_HOURS: joi.string().optional(),
        STATUS: joi.string().optional().valid('P', 'C', 'D')
      })
      .or(
        'USER_ID',
        'PROJECT_ID',
        'TASK_NAME',
        'START_DATE',
        'END_DATE',
        'DAILY_LOCK_HOURS',
        'STATUS'
      )
      .required()
  }
};
