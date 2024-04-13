export interface IToast {
  success?: (message: string | any, ...params: any) => number | string | void;
  info?: (message: string | any, ...params: any) => number | string | void;
  warning?: (message: string | any, ...params: any) => number | string | void;
  error?: (message: string | any, ...params: any) => number | string | void;
  message?: (message: string | any, ...params: any) => number | string | void;
  loading?: (message: string | any, ...params: any) => number | string | void;
  dismiss?: (id?: number | string) => any;
  [key: string]: any;
}

export interface IPlugins {
  toast?: IToast;
}
