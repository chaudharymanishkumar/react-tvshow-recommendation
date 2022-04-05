import { useState, useContext } from "react";
import ShowsContext from "../../store/recommendShow/showsContext";
import classes from "./recommendShow.module.css";

const RecommendShowForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchShows } = useContext(ShowsContext);
  const searchInputHandler = (event) => {
    setSearchTerm(event.target.value);
  };
  const searchandler = (event) => {
    event.preventDefault();
    if (searchTerm === "") {
      alert("Please enter something");
    } else {
      searchShows(searchTerm);
    }
  };
  return (
    <div className={classes.recommend}>
      <form className={classes.searchbarForm}>
        <input
          type="text"
          className={classes.searchbarFormInput}
          onChange={searchInputHandler}
          placeholder="Recommend TV Show based on Cast Crew and Name"
          value={searchTerm}
        />
        <button className="btn btn-block" onClick={searchandler}>
          RECOMMEND SHOW
        </button>
      </form>
    </div>
  );
};

export default RecommendShowForm;
