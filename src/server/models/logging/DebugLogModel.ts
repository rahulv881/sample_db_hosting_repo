import mongoose from 'mongoose';
import { ILogMethods, ILogModelArgs, ILogStatics, LogModel } from './LogModel';
import { IDebugLogDocument } from '../../lib/eventLogger/interfaces/IDebugLogDocument';
import { ObjectUtils } from '../../utils/ObjectUtils';

export interface IDebugLogMethods extends IDebugLogDocument, ILogMethods {}

interface IDebugLogStatics extends ILogStatics, mongoose.Model<IDebugLogMethods> {}

const { Schema } = mongoose;

export class DebugLogModel extends LogModel<IDebugLogMethods, IDebugLogStatics> {
  private static pipe = new Map<string, DebugLogModel>();

  protected vModel: IDebugLogStatics;

  private constructor(args: ILogModelArgs) {
    super(args);
    const { meta, isDiscreet = false } = args;

    /**
     * This is not required as we are importing LogModel class with Generics
     this.schema = MongoUtils.newSubSchema<IDebugLogMethods, IDebugLogStatics>(this.schema);
     */

    this.schema.add({
      data: { type: Schema.Types.Mixed },
      debugType: { type: String, enum: ['info', 'verbose', 'debug'] }
    });

    this.schema.statics.testToo = async function (string) {
      return string;
    };

    if (isDiscreet) {
      this.vModel = mongoose.model<IDebugLogMethods, IDebugLogStatics>(
        `#DebugLog-${meta.appName}-${meta.useCaseName}`,
        this.schema,
        `#DebugLog-${meta.appName}-${meta.useCaseName}`
      );
      return;
    }
    this.vModel = mongoose.model<IDebugLogMethods, IDebugLogStatics>(
      `#DebugLog`,
      this.schema,
      `#DebugLog`
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
    let logObject = DebugLogModel.pipe.get(key);
    if (logObject) {
      return logObject.model;
    }
    logObject = new DebugLogModel({ meta, isDiscreet });
    DebugLogModel.pipe.set(key, logObject);
    return logObject.model;
  }
}
