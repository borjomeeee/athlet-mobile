export class Logger {
  static debug = (message: any) => __DEV__ && console.log(message);

  static warn = (message: any) => __DEV__ && console.warn(message);
  static error = (message: any) => __DEV__ && console.error(message);
}
