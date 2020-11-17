export const MINING_QUEUE_GET = 'MINING_QUEUE_GET';
export const MINING_QUEUE_GET_SUCCEEDED = 'MINING_QUEUE_GET_SUCCESSFUL';
export const MINING_QUEUE_GET_FAILED = 'MINING_QUEUE_GET_UNSUCCESSFUL';

export const MINING_QUEUE_ADD = 'MINING_QUEUE_ADD';
export const MINING_QUEUE_ADD_SUCCEEDED = 'MINING_QUEUE_ADD_SUCCESSFUL';
export const MINING_QUEUE_ADD_FAILED = 'MINING_QUEUE_ADD_UNSUCCESSFUL';

export const MINING_QUEUE_REMOVE = 'MINING_QUEUE_REMOVE';
export const MINING_QUEUE_REMOVE_SUCCEEDED = 'MINING_QUEUE_REMOVE_SUCCEEDED';
export const MINING_QUEUE_REMOVE_FAILED = 'MINING_QUEUE_REMOVE_FAILED';

export function getMiningQueue(node) {
  return {
    type: MINING_QUEUE_GET,
    node,
  };
}

export function addBlojToMiningQueue(bloj, node) {
  return {
    type: MINING_QUEUE_ADD,
    node,
    bloj,
  };
}

export function removeBlojFromMiningQueue(bloj, node) {
  return {
    type: MINING_QUEUE_REMOVE,
    node,
    bloj,
  };
}