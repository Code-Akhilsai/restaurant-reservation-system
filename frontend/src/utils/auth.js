export const getStoredToken = () => localStorage.getItem("authToken");

export const getAuthConfig = () => {
  const token = getStoredToken();

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const clearAuthStorage = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("registeredUser");
};
