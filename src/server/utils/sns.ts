import { CONSTANT_CONFIG } from '../../config/CONSTANT_CONFIG';

import AWS from 'aws-sdk';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';

const updateCognitoAwsSDKConfig = function () {
  AWS.config.update({
    accessKeyId: CONSTANT_CONFIG.SNS.ACCESS_KEY,
    secretAccessKey: CONSTANT_CONFIG.SNS.SECRET_KEY,
    region: CONSTANT_CONFIG.AWS.REGION
  });
};
export const SNS = {
  sendOneTimePassword: async (params: { PhoneNumber: string; Message: string }) => {
    const mobileNo = params.PhoneNumber;
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: true,
      lowerCaseAlphabets: false,
      specialChars: false
    });
    const apiParams = {
      Message: `${params.Message}  ${otp}` /* required */,
      PhoneNumber: mobileNo
    };
    updateCognitoAwsSDKConfig();
    const salt = bcrypt.genSaltSync(10);
    const sessionHash = bcrypt.hashSync(otp, salt);
    return new AWS.SNS({ apiVersion: '2010–03–31' })
      .publish(apiParams)
      .promise()
      .then(message => {
        console.log('OTP SEND SUCCESS', message);
        return { data: sessionHash, error: false };
      })
      .catch(err => {
        console.log('Error ' + err);
        return { data: null, error: err.message };
      });
  }
};
