import TodaysShow from "../TvShow/todaysShow";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <section className={classes.starting}>
      <TodaysShow />
    </section>
  );
};

export default Home;
