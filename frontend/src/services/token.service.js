import { Cookies } from "react-cookie";

const cookies = new Cookies();

const getLocalAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

const getUser = () => {
  const user = cookies.get("user");
  return user;
};

const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

const setUser = (user) => {
  cookies.get("user", JSON.stringify(user), {
    path: "/",
    expires: new Date(Date.now() + 86400),
  });
  return setUser;
};

const TokenService = {
  getLocalAccessToken,
  getUser,
  removeUser,
  setUser,
};

export default TokenService;
