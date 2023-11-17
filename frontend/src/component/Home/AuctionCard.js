import React from "react";
import { Link } from "react-router-dom";

const AuctionCard = ({ auction }) => {
  return (
    <Link className="productCard" to={`/auction/${auction._id}`}>
      <img src={auction.images[0].url} alt={auction.name} />
      <p>{auction.name}</p>
      <span>{`৳${auction.price}`}</span>
    </Link>
  );
};

export default AuctionCard;
