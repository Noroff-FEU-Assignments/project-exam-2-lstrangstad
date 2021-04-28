import { Link } from "react-router-dom";

const Card = (props) => {
  const { name, image, location, price, rating, id } = props;

  return (
    <div className="card">
      <Link className="card__link" to={`/details/${id}`}>
        <img className="card__image" src={image} alt={name} />

        <h2 className="card__name">{name}</h2>
        <p className="card__location">{location}</p>
        <p className="card__price">Price: {price}kr</p>
        <div className="card__rating">{rating}</div>
      </Link>
    </div>
  );
};

export default Card;
