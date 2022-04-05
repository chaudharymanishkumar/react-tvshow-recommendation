import { Fragment, useState } from "react";
import ShowModal from "../TvShow/showModal";
import classes from "./ListItem.module.css";

const ListItem = ({
  image,
  name,
  rating,
  id,
  season,
  summary,
  url,
  airstamp,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Fragment>
      <div className={classes.listItem} onClick={handleClickOpen}>
        <img src={image} alt={name} />
        <div className={classes.listItem__info}>
          <h4 className={classes.info__name}>{name}</h4>
          <h4 className={classes.info__rating}>{rating}</h4>
        </div>
      </div>
      {
        <ShowModal
          open={isOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          show={{
            title: name,
            season: season,
            summary: summary,
            url: url,
            airstamp: airstamp,
          }}
        />
      }
    </Fragment>
  );
};
export default ListItem;
