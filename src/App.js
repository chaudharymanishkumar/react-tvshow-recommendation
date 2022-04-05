import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./components/Auth/Register";
import Layout from "./components/Layout/Layout";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import RecommendShow from "./components/recommendShow/recommendShow";
import AuthContext from "./store/auth-context";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/recommendshow">
          {isLoggedIn ? <RecommendShow /> : <Redirect to="/" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
