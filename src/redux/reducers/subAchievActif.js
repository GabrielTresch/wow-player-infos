const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case 'SETACTIF':
      return action.id;
    default:
      return state;
  }
};

export default tokenReducer;
