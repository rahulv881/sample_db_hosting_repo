import { CONSTANT_CONFIG } from '../../../../config/CONSTANT_CONFIG';

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: CONSTANT_CONFIG.S3.ACCESS_KEY,
  secretAccessKey: CONSTANT_CONFIG.S3.SECRET_KEY
});

export const s3Utils = {
  listObject: async (bucket, path) => {
    try {
      var params = {
        Bucket: bucket,
        Prefix: path
      };

      return await new Promise((resolve, reject) => {
        s3.listObjectsV2(params, function (err, data) {
          if (err) reject(err);
          else resolve(data);
        });
      });
    } catch (err) {
      throw err;
    }
  },

  putObject: async file => {
    try {
      // setting up s3 upload parameters
      const fileName = file.fileName;
      const fileType = file.mimetype.toLowerCase();
      const fileData = file.fileData;

      const params = {
        Bucket: CONSTANT_CONFIG.S3.STATIC_BUCKET,
        Key: fileName,
        Body: fileData,
        ContentType: fileType,
        ACL: 'public-read'
      };

      // Uploading files to the bucket
      return new Promise((resolve, reject) => {
        s3.putObject(params, function (err, data) {
          if (err) reject(err);
          resolve(data);
        });
      });
    } catch (err) {
      throw err;
    }
  },

  deleteObject: async fileName => {
    try {
      const params = {
        Bucket: CONSTANT_CONFIG.S3.STATIC_BUCKET,
        Key: fileName
      };

      return new Promise((resolve, reject) => {
        s3.deleteObject(params, function (err, data) {
          if (err) reject(err);
          resolve(data);
        });
      });
    } catch (err) {
      throw err;
    }
  }
};
