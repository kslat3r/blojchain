export const LOGS_GET = 'LOGS_GET';
export const LOGS_GET_SUCCEEDED = 'LOGS_GET_SUCCESSFUL';
export const LOGS_GET_FAILED = 'LOGS_GET_UNSUCCESSFUL';

export function getLogs() {
  return {
    type: LOGS_GET,
  };
}