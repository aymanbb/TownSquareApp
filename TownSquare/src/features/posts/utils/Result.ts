// Inspirasjon: https://github.com/mariuswallin/hiof-2025-webapp/blob/main/tasks/src/app/types/result.ts

export type ResultData<T> = {
  success: true;
  data: T | undefined;
};

export type ResultError = {
  success: false;
  error: {
    message: string;
    code?: number;
  };
};

export type Result<T> = ResultData<T> | ResultError;
