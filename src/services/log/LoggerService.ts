export const LoggerService ={
  info(...info: any[]) {
    // console.log(info);
  },
  // implement sentry
  error(error: any, severity?: 'LOW' | 'WARNING' | 'FATAL') {
    // console.error(error.message, severity);
  },
};
