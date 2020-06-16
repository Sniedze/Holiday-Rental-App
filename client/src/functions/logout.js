import axios from "axios";

export const logout = setIsAuth => {
  axios({
    url: "http://localhost:9090/users/logout",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(res) {
      console.log(res);
      if (res.status === 200) {
        setIsAuth(false);
        console.log(res);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};
