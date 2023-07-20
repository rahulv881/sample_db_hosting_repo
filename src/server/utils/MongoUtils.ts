import * as _ from 'lodash';
import { Schema } from 'mongoose';

export class MongoUtils {
  /**
   * Create sparse partial index options for the given field
   * @param {string} prop
   * @return {{partialFilterExpression: {}}}
   */
  public static sparseIndexOptions = (prop: string) => {
    return { partialFilterExpression: { [prop]: { $exists: true } } };
  };

  public static caseInsensitiveDBString = text => {
    return new RegExp(`^${text}$`, 'i');
  };

  public static caseInsensitiveDBArray = (textArray: any[]) => {
    return _.map(textArray, text => {
      return new RegExp(`^${text}$`, 'i');
    });
  };

  public static extend = (input: Schema, definition: any) => {
    const temp = input.clone();
    temp.add(definition);
    return temp;
  };

  public static newSubSchema = <T, S>(definition: any, id = false) => {
    return new Schema<T, S>(definition, { _id: id });
  };
}
