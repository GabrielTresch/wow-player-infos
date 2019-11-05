const profilReducer = (state = '', action) => {
  switch (action.type) {
    case 'SETPROFIL':
      return {
        pseudo: action.pseudo,
        realmslug: action.realmslug,
        region: action.region,
      };
    default:
      return state;
  }
};

export default profilReducer;
