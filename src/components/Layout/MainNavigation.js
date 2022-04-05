import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { isLoggedIn, setLogin } = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = () => {
    setLogin(false);
    history.replace("/");
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <i className={`fas fa-video ${classes.brand__icon}`} />
          TV SHOW
        </Link>
      </div>
      <nav>
        <ul>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
              <li>
                <Link to="/register">REGISTER</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/recommendshow">RECOMMEND TV SHOW</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
