export const LOGS_GET = 'LOGS_GET';
export const LOGS_GET_SUCCEEDED = 'LOGS_GET_SUCCESSFUL';
export const LOGS_GET_FAILED = 'LOGS_GET_UNSUCCESSFUL';

export const LOGS_ADD = 'LOGS_ADD';
export const LOGS_ADD_SUCCEEDED = 'LOGS_ADD_SUCCESSFUL';
export const LOGS_ADD_FAILED = 'LOGS_ADD_UNSUCCESSFUL';

export function getLogs(node) {
  return {
    type: LOGS_GET,
    node,
  };
}

export function addLog(log, node) {
  return {
    type: LOGS_ADD,
    node,
    log,
  };
}