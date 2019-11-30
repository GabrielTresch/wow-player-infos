const profilReducer = (state = '', action) => {
  switch (action.type) {
    case 'SETPROFIL':
      return {
        pseudo: action.pseudo,
        realmslug: action.realmslug,
        region: action.region,
        avatar: action.avatar,
        characterName: action.characterName,
        level: action.level,
      };
    default:
      return state;
  }
};

export default profilReducer;
