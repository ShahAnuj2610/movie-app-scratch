function createAction(actionId, payload, error, meta) {
  const action = {
    type: actionId,
  };
  if (payload !== undefined) {
    action.payload = payload;
  }
  if (error !== undefined) {
    action.error = error;
  }
  if (meta !== undefined) {
    action.meta = meta;
  }
  return action;
}

export default createAction;
