import { useContext } from "react";
import RecommendShowForm from "./recommendForm";
import ListItem from "../ListItem/ListItem";
import ShowsContext from "../../store/recommendShow/showsContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinnner";
import classes from "./recommendShow.module.css";

const Home = () => {
  const { shows, loading } = useContext(ShowsContext);
  console.log(shows);
  return (
    <div className="container">
      <RecommendShowForm />
      {loading ? (
        <div className="centered">
          <LoadingSpinner />
        </div>
      ) : (
        <div className={classes.showList}>
          {shows.map((item) => (
            <ListItem
              key={item.show.id}
              id={item.show.id}
              image={
                item.show?.image?.medium ??
                "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
              }
              name={item.show.name}
              rating={item.show?.rating?.average ?? "No rating"}
              season={item.show?.season ?? "NA"}
              summary={item.show?.summary ?? "NA"}
              url={item.show?.url ?? "Not Available"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
