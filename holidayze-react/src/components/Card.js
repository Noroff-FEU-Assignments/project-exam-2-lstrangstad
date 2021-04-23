import { Link } from "react-router-dom";

const Card = (props) => {
  const { name, image, location, price, rating, id } = props;

  return (
    <>
      <Link to={`/details/${id}`}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{location}</p>
        <strong>Price: {price}kr</strong>
        <div>{rating}</div>
      </Link>
    </>
  );
};

export default Card;
