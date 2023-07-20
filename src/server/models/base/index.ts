import _ from 'lodash';
import moment from 'moment-timezone';
import * as errors from '../../lib/errors';
import { NodeUtils } from '../../utils/NodeUtils';

/**
 *  Todo
 *  Custom validation for nested sub-document fails with infinite recursion right now.
 *  Check if this issue is fixed in the next release of mongoose
 */
export function baseModel(schema, options: any = {}) {
  if (options.pagination === true) {
    // private sort field used for cursor based pagination
    schema.add({
      _sortDate: {
        type: String,
        unique: true
      }
    });

    // add index on the schema for pagination to work
    schema.index({ _sortDate: 1 });

    schema.pre(`save`, function (next) {
      if (this.isNew) {
        // create composite field using timestamp
        this._sortDate = `${moment().toDate().getTime()}@${this._id.toString()}`;
      }
      next();
    });

    schema.pre(`update`, function (next) {
      if (this.isNew) {
        // create composite field using timestamp
        this._sortDate = `${moment().toDate().getTime()}@${this._id.toString()}`;
      }
      next();
    });
  }

  const withTimestamps = options.timestamps || true;
  if (withTimestamps) {
    const paths = ['createdAt', 'updatedAt'];
    const createdAt = paths[0];
    const updatedAt = paths[1];

    schema.add({
      createdAt: { type: Date, default: () => moment().toDate() },
      updatedAt: { type: Date, default: () => moment().toDate() }
    });

    schema.pre(`save`, function (next) {
      if (this.isNew) {
        const newDate = moment().toDate();
        if (createdAt) this[createdAt] = newDate;
        if (updatedAt) this[updatedAt] = newDate;
      } else if (this.isModified() && !!updatedAt) {
        this[updatedAt] = moment().toDate();
      }
      next();
    });

    // schema.pre(`update`, function (next) {
    //   console.log("pre :: update :: this.op :: ", this.op);
    //   this[updatedAt] = moment().toDate();
    //   if (this.op === `update`) {
    //     this[updatedAt] = moment().toDate();
    //   }
    //   next();
    // });

    schema.pre(`update`, async function (next) {
      this.update(
        {},
        {
          $set: {
            [updatedAt]: moment().toDate()
          },
          $setOnInsert: {
            [createdAt]: moment().toDate()
          }
        }
      );
    });

    schema.pre(`updateOne`, async function (next) {
      this.update(
        {},
        {
          $set: {
            [updatedAt]: moment().toDate()
          },
          $setOnInsert: {
            [createdAt]: moment().toDate()
          }
        }
      );
    });

    schema.pre(`insertMany`, async function (docs) {
      _.each(docs, doc => {
        return {
          ...doc,
          [createdAt]: moment().toDate(),
          [updatedAt]: moment().toDate()
        };
      });
    });
  }

  const noSetFields = ['createdAt', 'updatedAt'];
  const privateFields = ['__v'];

  if (_.isArray(options.noSet)) noSetFields.push(...options.noSet);

  /**
   * This method accepts an additional array of fields to be sanitized that can be passed at runtime
   * @param objToSanitize
   * @param additionalFields
   * @return {any}
   */
  schema.statics.sanitize = function sanitize(objToSanitize: any = {}, additionalFields: any = []) {
    noSetFields.concat(additionalFields).forEach(fieldPath => {
      _.unset(objToSanitize, fieldPath);
    });

    // Allow a sanitize transform function to be used
    return options.sanitizeTransform ? options.sanitizeTransform(objToSanitize) : objToSanitize;
  };

  if (Array.isArray(options.private)) privateFields.push(...options.private);

  if (!schema.options.toJSON) schema.options.toJSON = {};

  schema.options.toJSON.transform = function transformToObject(doc: any, plainObj: any) {
    privateFields.forEach(fieldPath => {
      _.unset(plainObj, fieldPath);
    });

    // Always return `id`
    // if (!plainObj.id && plainObj._id) plainObj.id = plainObj._id;

    // Allow an additional toJSON transform function to be used
    return options.toJSONTransform ? options.toJSONTransform(plainObj, doc) : plainObj;
  };

  schema.statics.getModelPaths = function getModelPaths() {
    return _.reduce(
      this.schema.paths,
      (result: any, field: any, path: any) => {
        if (privateFields.indexOf(path) === -1) {
          result[path] = field.instance || 'Boolean';
        }
        return result;
      },
      {}
    );
  };

  /**
   * base method for find the document or fail with an error
   * @param idOrQuery
   * @param errMsg
   * @return {Query|Promise|*}
   */
  schema.statics.findOrFail = async function (idOrQuery, errMsg?: string): Promise<any> {
    let query;
    let notFoundMsg;
    if (_.isString(idOrQuery)) {
      query = { _id: idOrQuery };
      notFoundMsg = `Resource ${idOrQuery} not found.`;
    } else {
      query = idOrQuery;
      notFoundMsg = `Resource not found.`;
    }

    const doc = await this.findOne(query).exec();
    const message = errMsg || notFoundMsg;
    if (!doc) throw new errors.NotFoundError({ message });
    return doc;
  };

  /**
   * Check if the document exists in the database or throw an error
   * @param idOrQuery
   * @param errMsg
   */
  schema.statics.failIfNotFound = async function (idOrQuery, errMsg?: string) {
    if (NodeUtils.isNullOrUndefined(idOrQuery))
      throw new errors.NotFoundError({ message: 'Invalid Query.' });

    let query;
    let notFoundMsg;
    if (_.isString(idOrQuery)) {
      query = { _id: idOrQuery };
      notFoundMsg = `Resource ${idOrQuery} not found.`;
    } else {
      query = idOrQuery;
      notFoundMsg = `Resource not found.`;
    }

    const count = await this.count(query).exec();
    const message = errMsg || notFoundMsg;
    if (count === 0) throw new errors.NotFoundError({ message });
  };
}
