export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const formatResponse = <T>(data: T, message?: string) => {
  return {
    success: true,
    data,
    message,
  };
};

export const formatError = (message: string, statusCode = 500) => {
  return {
    success: false,
    error: message,
    statusCode,
  };
};