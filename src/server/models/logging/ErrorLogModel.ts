import mongoose from 'mongoose';
import { ILogMethods, ILogModelArgs, ILogStatics, LogModel } from './LogModel';
import { IErrorLogDocument } from '../../lib/eventLogger/interfaces/IErrorLogDocument';
import { ObjectUtils } from '../../utils/ObjectUtils';

const { Schema } = mongoose;

export interface IErrorLogMethods extends IErrorLogDocument, ILogMethods {}

export interface IErrorLogStatics extends ILogStatics, mongoose.Model<IErrorLogMethods> {}

export class ErrorLogModel extends LogModel<IErrorLogMethods, IErrorLogStatics> {
  private static pipe = new Map<string, ErrorLogModel>();

  protected vModel: IErrorLogStatics;

  private constructor(args: ILogModelArgs) {
    super(args);
    const { meta, isDiscreet } = args;
    this.schema.add({
      stackTrace: { type: [String] },
      body: { type: Schema.Types.Mixed },
      severity: { type: String, enum: ['critical', 'high', 'medium', 'low', 'chill'] }
    });

    if (isDiscreet) {
      this.vModel = mongoose.model<IErrorLogMethods, IErrorLogStatics>(
        `#ErrorLog-${meta.appName}-${meta.useCaseName}`,
        this.schema,
        `#ErrorLog-${meta.appName}-${meta.useCaseName}`
      );
      return;
    }
    this.vModel = mongoose.model<IErrorLogMethods, IErrorLogStatics>(
      `#ErrorLog`,
      this.schema,
      `#ErrorLog`
    );
  }

  get model() {
    return this.vModel;
  }

  public static getModel(args: ILogModelArgs) {
    const { isDiscreet } = args;
    const meta = ObjectUtils.clone(args?.meta);
    if (!isDiscreet) {
      meta.useCaseName = meta.appName;
    }
    const key = `${meta.appName}:${meta.useCaseName}`;
    let logObject = ErrorLogModel.pipe.get(key);
    if (logObject) {
      return logObject.model;
    }
    logObject = new ErrorLogModel({ meta, isDiscreet });
    ErrorLogModel.pipe.set(key, logObject);
    return logObject.model;
  }
}
