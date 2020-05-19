import axios from "axios";

export const authenticate = (setIsAuth) => {
  // if you dont specify post/get/delete... then its get by default
  axios({
    url: "http://localhost:9090/users/authenticated",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        setIsAuth(true);
      }
    })
    .catch((error) => {
      setIsAuth(false);
    });
};
