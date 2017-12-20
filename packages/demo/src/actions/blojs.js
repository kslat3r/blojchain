export const BLOJS_GET = 'BLOJS_GET';
export const BLOJS_GET_SUCCEEDED = 'BLOJS_GET_SUCCEEDED';
export const BLOJS_GET_FAILED = 'BLOJS_GET_FAILED';

export const BLOJS_CREATE = 'BLOJS_CREATE';
export const BLOJS_CREATE_SUCCEEDED = 'BLOJS_CREATE_SUCCEEDED';
export const BLOJS_CREATE_FAILED = 'BLOJS_CREATE_FAILED';

export const BLOJS_ADD = 'BLOJS_ADD';
export const BLOJS_ADD_SUCCEEDED = 'BLOJS_ADD_SUCCEEDED';
export const BLOJS_ADD_FAILED = 'BLOJS_ADD_FAILED';

export function getBlojs(node) {
  return {
    type: BLOJS_GET,
    node,
  };
}

export function createBloj(bloj, node) {
  return {
    type: BLOJS_CREATE,
    bloj,
    node,
  };
}

export function addBloj(bloj, node) {
  return {
    type: BLOJS_ADD,
    bloj,
    node,
  };
}