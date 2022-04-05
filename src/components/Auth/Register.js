import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Auth.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const { setLogin } = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      name.trim().length === 0 ||
      password.trim().length === 0 ||
      email.trim().length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      return;
    } else if (password !== confirmPassword) {
      alert("Confirm password and Password didn't match");
      return;
    } else {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      console.log(user);
      fetch(
        "https://react-http-5d2fb-default-rtdb.asia-southeast1.firebasedatabase.app/tvshow/user.json",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication Failed";
              errorMessage = data?.error?.message;
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          // console.log(data);
          setLogin(true);
          history.replace("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="connfirmpassword"
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>Register</button>
          <Link to="/login" className={classes.toggle}>
            Login with existing account
          </Link>
          {/* <button type="button" className={classes.toggle}>
            Login with existing account
          </button> */}
        </div>
      </form>
    </section>
  );
};

export default Register;
