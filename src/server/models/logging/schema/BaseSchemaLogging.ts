import { Schema } from 'mongoose';
import {MongoUtils} from './../../../utils/MongoUtils';

export const dbLoggingMetaSchema = MongoUtils.newSubSchema(
  {
    appName: { type: Schema.Types.String, required: true },
    useCaseName: { type: Schema.Types.String, required: true }
  },
  true
);

export const dbTransactionSchema = MongoUtils.newSubSchema({
  nameAPI: { type: String, required: true },
  transactionId: { type: String, required: true },
  associatedTransactionIds: { type: [String], required: true }
});

export const dbDebugMetaSchema = MongoUtils.newSubSchema({
  className: { type: String, required: true },
  methodName: { type: String, required: true }
});
