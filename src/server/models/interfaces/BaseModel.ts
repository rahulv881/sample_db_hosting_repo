export interface BaseModel {
  findOrFail?(id: string | any, msg?: string): any;

  failIfNotFound?(id: string, msg?: string): void;

  failIfNotFound?(query: any, msg?: string): void;

  sanitize?(objecToSanitize: any, fields: any): any;
}
