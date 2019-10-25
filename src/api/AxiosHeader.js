const AxiosHeader = (token) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return header;
};

export default AxiosHeader;
