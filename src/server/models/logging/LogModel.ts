import mongoose from 'mongoose';
import { baseModel } from '../base';
import {
  dbDebugMetaSchema,
  dbLoggingMetaSchema,
  dbTransactionSchema
} from './schema/BaseSchemaLogging';
import {
  ILogDocument,
  ILogMeta,
  ITransactionId
} from '../../lib/eventLogger/interfaces/ILogDocument';

export interface ILogMethods extends ILogDocument, mongoose.Document {}

export interface ILogStatics {
  GetLogsByTransactionId: (transactionId: ITransactionId) => Promise<ILogMethods>;
  AddLog: (log: ILogDocument) => Promise<any>;
}

interface ILogStaticsModel extends ILogStatics, mongoose.Model<ILogStatics> {}

const { Schema } = mongoose;

export interface ILogModelArgs {
  isDiscreet: boolean;
  meta: ILogMeta;
}

export class LogModel<T extends ILogMethods, S extends ILogStatics> {
  protected schema: mongoose.Schema<T, mongoose.Model<S>>;

  protected constructor(args: ILogModelArgs) {
    this.schema = new Schema<T, mongoose.Model<S>>({
      meta: { type: dbLoggingMetaSchema, required: true },
      debugMeta: { type: dbDebugMetaSchema, required: true },
      transactionId: { type: dbTransactionSchema, required: true }
    });

    this.schema.index({ debugMeta: 1 });
    this.schema.index({ meta: 1 });
    this.schema.index({ transactionId: 1 });

    this.schema.statics.GetLogsByTransactionId = async function (transactionId: ITransactionId) {
      const query = {
        transactionId
      };

      return await this.findOne(query as any)
        .lean()
        .exec();
    };

    /**
     *
     * @param log
     * @constructor
     */
    this.schema.statics.AddLog = async function (log: ILogDocument) {
      const save = { ...log, createdAt: new Date(), updatedAt: new Date() };
      return await this.collection.insertOne(save);
    };

    this.schema.plugin(baseModel, {});
  }
}
