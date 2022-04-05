import { useState, useEffect, useCallback, useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinnner";
import classes from "./Auth.module.css";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const history = useHistory();
  const { setLogin } = useContext(AuthContext);

  const fetchUserFromDb = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://react-http-5d2fb-default-rtdb.asia-southeast1.firebasedatabase.app/tvshow/user.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      let transformedData = [];
      for (const item in data) {
        transformedData.push(data[item]);
      }
      setUserList(transformedData);
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUserFromDb();
  }, [fetchUserFromDb]);

  const loginHandler = (event) => {
    event.preventDefault();
    const probableUser = userList.find((user) => user.email === inputEmail);
    if (!probableUser) {
      alert("You haven't registred with us yet! Please Register ");
      history.replace("/register");
    }
    if (probableUser.password === inputPassword) {
      setLogin(true);
      history.replace("/");
    } else {
      alert("Incorrect Password !");
    }
  };

  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <section className={classes.auth}>
          <h1>Login</h1>
          <form onSubmit={loginHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                onChange={(event) => setInputEmail(event.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                onChange={(event) => setInputPassword(event.target.value)}
              />
            </div>
            <div className={classes.actions}>
              <button>Login</button>
              <Link to="/register" className={classes.toggle}>
                Create new account
              </Link>
            </div>
          </form>
        </section>
      )}
    </Fragment>
  );
};

export default Login;
