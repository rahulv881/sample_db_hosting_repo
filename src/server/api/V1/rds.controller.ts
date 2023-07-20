// projectController.ts
import { Request, Response } from 'express';
import {
  getTasksByProjectId
} from '../../services/project.service';
import { responses as ModifiedResponse } from '../../utils/V1/responses';
import { GlobalUtils } from '../../utils';

export const getTasksByProjectIdController = async (object, options): Promise<void> => {
  const response = GlobalUtils.responseObject();
  try {
    const project = await getTasksByProjectId();
    if (project) {
      return ModifiedResponse.sendSuccess(response, project);
    } else {
      return ModifiedResponse.sendFailure(response, 'No table found');
    }
  } catch (error) {
    console.error(error);
    return ModifiedResponse.sendFailure(response, 'Internal server error' + error);
  }
};