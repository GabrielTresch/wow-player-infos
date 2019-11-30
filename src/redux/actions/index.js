export const setProfil = (pseudo, realmslug, region, avatar, characterName, level) => ({
  type: 'SETPROFIL',
  pseudo,
  realmslug,
  region,
  avatar,
  characterName,
  level,
});

export const setToken = (token) => ({
  type: 'SETTOKEN',
  token,
});

export const setActifAchiev = (id) => ({
  type: 'SETACTIF',
  id,
});
