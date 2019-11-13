export const setProfil = (pseudo, realmslug, region) => ({
  type: 'SETPROFIL',
  pseudo,
  realmslug,
  region,
});

export const setToken = (token) => ({
  type: 'SETTOKEN',
  token,
});

export const setActifAchiev = (id) => ({
  type: 'SETACTIF',
  id,
});
