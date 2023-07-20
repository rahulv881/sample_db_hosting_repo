import { URL } from 'url';
import axios, { AxiosRequestConfig, Method, ResponseType } from 'axios';
import FormData from 'form-data';
import * as querystring from 'querystring';
import { ParsedUrlQueryInput } from 'querystring';
import * as _ from 'lodash';
import { ReadStream } from 'fs';

import { ObjectUtils } from './ObjectUtils';
import { NodeUtils } from './NodeUtils';
import { StringUtils } from './StringUtils';
import { ApplicationError } from '../lib/errors';

interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  responseEncoding?: string;
}

interface IFormDataOptions {
  value: ReadStream | any;
  options: FormData.AppendOptions;
}

export interface IWebHookFormData {
  [key: string]: string | IFormDataOptions;
}

export interface IWebHookRequestParam {
  uri?: string;
  qs?: Record<string, string>; // query String
  headers?: Record<string, string>;
  body?: Record<string, any>;
  method?: Method;
  formData?: IWebHookFormData;
}

export interface IWebHookRequestOptions {
  // params to modify the request behaviour
  followRedirect?: boolean;
  followAllRedirects?: boolean;
  json?: boolean; // this stringifies the requestPromise body and sets the right headers
  form?: boolean;
  multipart?: boolean;
  encoding?: string;
  responseType?: ResponseType;
}

export interface IWebHookRequestParams extends IWebHookRequestParam {
  // param to support the domain and route
  domain?: string;
  route?: string;
}

export class WebHookUtilities {
  /**
   *
   * @param req
   * @param options
   */
  public static getRequest = async (
    req: IWebHookRequestParams,
    options: IWebHookRequestOptions = { json: true }
  ) => {
    req.method = 'GET';
    const { data } = await WebHookUtilities.executeWebhook(req, options);
    return data;
  };

  /**
   *
   * @param req
   * @param options
   */
  public static postRequest = async (
    req: IWebHookRequestParams,
    options: IWebHookRequestOptions = { json: true }
  ) => {
    req.method = 'POST';
    const { data } = await WebHookUtilities.executeWebhook(req, options);
    return data;
  };

  /**
   *
   * @param req
   * @param options
   */
  public static executeWebhook = async (
    req: IWebHookRequestParams = {
      domain: '',
      route: '',
      qs: {},
      headers: {},
      uri: ''
    },
    options: IWebHookRequestOptions = {
      json: true
    }
  ) => {
    const url = StringUtils.isEmptyString(req.uri) ? new URL(req.route, req.domain).href : req.uri;
    try {
      // skip invalid url hits
      // if (!validator.isURL(url)) {
      //   throw new ChatteronError({ message: `Invalid URL : ${url}` });
      // }

      const config: AxiosRequestConfigExtended = {
        url: req.uri,
        method: req.method,
        params: req.qs,
        data: req.body,
        headers: req.headers,
        responseType: options.responseType
      };

      /**
       * Check if the option.form is set true for the given request
       */
      if (
        !NodeUtils.isNullOrUndefined(options.form) &&
        options.form &&
        ObjectUtils.isValidJSON(req.body)
      ) {
        config.data = querystring.stringify(req.body as ParsedUrlQueryInput) as any;
      }

      /**
       * Check if the option.multipart is set true for the given request
       */
      if (
        !NodeUtils.isNullOrUndefined(options.multipart) &&
        options.multipart &&
        ObjectUtils.isValidJSON(req.formData)
      ) {
        const formData = new FormData();
        _.map(req.formData, (value, key) => {
          if (_.isObject(value)) {
            formData.append(key, value?.value, {
              filename: value?.options?.filename,
              filepath: value?.options?.filepath,
              contentType: value?.options?.contentType,
              knownLength: value?.options?.knownLength
            });
            return;
          }
          formData.append(key, value);
        });
        config.headers = {
          ...config.headers,
          ...formData.getHeaders()
        };
        config.data = formData;
      }

      if (
        NodeUtils.isNullOrUndefined(options.responseType) &&
        !NodeUtils.isNullOrUndefined(options.json) &&
        options.json
      ) {
        config.responseType = 'json';
      }

      config.responseEncoding = NodeUtils.isNullOrUndefined(options.encoding)
        ? 'utf8'
        : options.encoding;

      return await axios(config);
    } catch (error) {
      if (error.response) {
        /*
         The request was made and the server responded with a status code
         that falls out of the range of 2xx
         */
        /*
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
         */

        throw new ApplicationError({
          message: `HTTP ERROR ::  ${error.response.status}, while connecting to ${url}, message :: ${error.message}`,
          errorType: 'webHookException',
          errorDetails: error.response.data,
          statusCode: error.response.status
        });
      } else if (error.request) {
        /*
         The request was made but no response was received
         `error.request` is an instance of XMLHttpRequest in the browser and an instance of
         http.ClientRequest in node.js
         */
        throw new ApplicationError({
          message: `HTTP ERROR :: The request was made but no response was received, ${error.request}`,
          errorType: 'webHookException',
          errorDetails: error.response?.data,
          statusCode: error.response?.status
        });
      }
      throw new ApplicationError({
        message: `${error.message}`,
        errorType: 'webHookException',
        errorDetails: error.response?.data,
        statusCode: error.response?.status
      });
    }
  };
}
