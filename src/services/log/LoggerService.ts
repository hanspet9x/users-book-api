const LoggerService ={
  info(error: any) {
    console.info(error.message);
  },
  error(error: any, severity?: 'LOW' | 'WARNING' | 'FATAL') {
    console.error(error.message, severity);
  },
};
