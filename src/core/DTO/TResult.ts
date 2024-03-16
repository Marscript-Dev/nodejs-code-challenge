export interface TResult<T> {
  data: T;
  messages: string[];
  success: boolean;
}

export const createTResult = <T>(data: T, messages: string[] = []): TResult<T> => {
  const success = messages.length === 0;
  return {
    data,
    messages,
    success: success,
  };
};
