export const BLOJS_GET = 'BLOJS_GET';
export const BLOJS_GET_SUCCEEDED = 'BLOJS_GET_SUCCEEDED';
export const BLOJS_GET_FAILED = 'BLOJS_GET_FAILED';

export const BLOJS_CREATE = 'BLOJS_CREATE';
export const BLOJS_CREATE_SUCCEEDED = 'BLOJS_CREATE_SUCCEEDED';
export const BLOJS_CREATE_FAILED = 'BLOJS_CREATE_FAILED';

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