import axios from "axios";
import { useState, useEffect } from "react";
import ListItem from "../ListItem/ListItem";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinnner";
import classes from "./todaysShow.module.css";

const TodaysShow = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchTodaysShow = async () => {
    const todaysDate = new Date().toISOString().slice(0, 10);
    setIsLoading(true);
    const { data } = await axios.get(
      `https://api.tvmaze.com/schedule/web?date=${todaysDate}`
    );
    let transformedData = data.filter((show) => show.rating.average > 5);
    if (!transformedData || transformedData.length === 0) {
      transformedData = data.slice(0, 10);
    }
    setShows(transformedData);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTodaysShow();
  }, []);
  return (
    <div className="container">
      <h2 className={classes.todaysHeader}>Today's Top Rated Shows</h2>
      {isLoading ? (
        <div className="centered">
          <LoadingSpinner />
        </div>
      ) : (
        <div className={classes.homepage__list}>
          {shows.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              image={
                item?._embedded?.show?.image?.medium ??
                "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
              }
              name={item.name}
              rating={item?.rating?.average ?? "No rating"}
              season={item?.season}
              summary={item?.summary}
              url={item?.url}
              airstamp={item?.airstamp}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default TodaysShow;
