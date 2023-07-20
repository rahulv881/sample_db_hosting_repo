import { CONSTANT_CONFIG } from '../../../config/CONSTANT_CONFIG';
const AWS = require('aws-sdk');

// Configure AWS credentials and region
AWS.config.update({
  accessKeyId: CONSTANT_CONFIG.DYNAMO_DB.ACCESS_KEY_ID,
  secretAccessKey: CONSTANT_CONFIG.DYNAMO_DB.SECRET_ACCESS_KEY,
  region: CONSTANT_CONFIG.DYNAMO_DB.REGION
});

// Create a DynamoDB instance
const dynamoDB = new AWS.DynamoDB();

export default dynamoDB;
