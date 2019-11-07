const AxiosAuth = () => {
  const Auth = {
    auth: {
      username: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD,
    },
    params: {
      grant_type: 'client_credentials',
      scope: 'public',
    },
  };
  return Auth;
};

export default AxiosAuth;
