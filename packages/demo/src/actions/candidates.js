export const CANDIDATES_GET = 'CANDIDATES_GET';
export const CANDIDATES_GET_SUCCEEDED = 'CANDIDATES_GET_SUCCESSFUL';
export const CANDIDATES_GET_FAILED = 'CANDIDATES_GET_UNSUCCESSFUL';

export const CANDIDATES_ADD = 'CANDIDATES_ADD';
export const CANDIDATES_ADD_SUCCEEDED = 'CANDIDATES_ADD_SUCCESSFUL';
export const CANDIDATES_ADD_FAILED = 'CANDIDATES_ADD_UNSUCCESSFUL';

export const CANDIDATES_REMOVE = 'CANDIDATES_REMOVE';
export const CANDIDATES_REMOVE_SUCCEEDED = 'CANDIDATES_REMOVE_SUCCEEDED';
export const CANDIDATES_REMOVE_FAILED = 'CANDIDATES_REMOVE_FAILED';

export function getCandidates(node) {
  return {
    type: CANDIDATES_GET,
    node,
  };
}

export function addCandidate(candidate, node) {
  return {
    type: CANDIDATES_ADD,
    node,
    candidate,
  };
}

export function removeCandidate(candidate, node) {
  return {
    type: CANDIDATES_REMOVE,
    node,
    candidate,
  };
}