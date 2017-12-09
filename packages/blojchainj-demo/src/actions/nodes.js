export const NODES_GET = 'NODES_GET';
export const NODES_GET_SUCCEEDED = 'NODES_GET_SUCCESSFUL';
export const NODES_GET_FAILED = 'NODES_GET_UNSUCCESSFUL';

export function getNodes(seed) {
  return {
    type: NODES_GET,
    seed,
  };
}