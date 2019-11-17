export const setProfil = (pseudo, realmslug, region, avatar) => ({
  type: 'SETPROFIL',
  pseudo,
  realmslug,
  region,
  avatar,
});

export const setToken = (token) => ({
  type: 'SETTOKEN',
  token,
});

export const setActifAchiev = (id) => ({
  type: 'SETACTIF',
  id,
});
