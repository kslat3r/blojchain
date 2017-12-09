export const BLOJS_GET = 'BLOJS_GET';
export const BLOJS_GET_SUCCEEDED = 'BLOJS_GET_SUCCEEDED';
export const BLOJS_GET_FAILED = 'BLOJS_GET_FAILED';

export function getBlojs(node) {
  return {
    type: BLOJS_GET,
    node,
  };
}