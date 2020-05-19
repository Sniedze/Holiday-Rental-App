import axios from "axios";

export const logout = setIsAuth => {
  axios
    .get("http://localhost:9090/users/logout")
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
