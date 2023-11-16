import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./AuctionDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAuctionDetails } from "../../actions/auctionAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const AuctionDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { auction, loading, error } = useSelector(
    (state) => state.auctionDetails
  );
  const [endTime, setEndTime] = useState(new Date().getTime() + 3600000); // Set end time to 1 hour from now

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  const [currentBid, setCurrentBid] = useState(auction.currentBid);

  useEffect(() => {
    // Fetch auction details only if it's not already loaded
    if (!auction) {
      dispatch(getAuctionDetails(match.params.id));
    }

    // Retrieve the initial bid value from local storage
    const auctionKey = `auction_${match.params.id}`;
    const storedBids = JSON.parse(localStorage.getItem(auctionKey));

    if (storedBids && storedBids.currentBid) {
      setCurrentBid(storedBids.currentBid);
    }
  }, [dispatch, match.params.id, auction]);

  // Variable to track component mounting status
  let isMounted = true;

  useEffect(() => {
    const timer = setInterval(() => {
      if (isMounted) {
        setTimeRemaining(calculateTimeRemaining());
      }
    }, 1000);

    return () => {
      // Component will unmount, update the variable
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const remainingTime = Math.max(0, endTime - now);
    return remainingTime;
  }

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(timeRemaining);

  const handleBidClick = () => {
    const newBid = currentBid + auction.price / 100;

    if (newBid <= auction.price * 2) {
      setCurrentBid(newBid);

      const auctionKey = `auction_${match.params.id}`;
      const bidsInLocalStorage =
        JSON.parse(localStorage.getItem(auctionKey)) || {};
      bidsInLocalStorage.currentBid = newBid;
      localStorage.setItem(auctionKey, JSON.stringify(bidsInLocalStorage));

      alert.success("Bidding has been applied!");
    } else {
      alert.error("Bid too high. Please bid a lower amount.");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAuctionDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, currentBid]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${auction.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {auction.images &&
                  auction.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{auction.name}</h2>
                <p>Product # {auction._id}</p>
              </div>
              <div className="detailsBlock-3">
                <h1>{`৳${auction.price}`}</h1>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{auction.description}</p>
              </div>
            </div>
          </div>
          <div style={timeRemainingStyle}>
            <div style={timeBoxStyle}>{hours}h</div>
            <div style={timeBoxStyle}>{minutes}m</div>
            <div style={timeBoxStyle}>{seconds}s</div>
          </div>
          <p style={currentBidStyle}>Current Bid: ৳{currentBid}</p>
          <button style={buttonStyle} onClick={handleBidClick}>
            Apply for Bidding
          </button>
          {hours === 0 && minutes === 0 && seconds === 0 && (
            <p style={currentBidStylered}>Bidding is over</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const currentBidStylered = {
  fontSize: "24px", // Increase font size
  fontWeight: "bold", // Set font weight to bold
  fontStyle: "sans-serif", // Set font style to sans-serif
  marginBottom: "20px",
  marginTop: "50px",
  display: "flex",
  alignItems: "center",
  marginLeft: "50%",
  color: "red",
};

const timeRemainingStyle = {
  fontSize: "20px",
  marginBottom: "20px",
  marginTop: "20px",
  color: "white", // Set the overall text color to white
  display: "flex",
  justifyContent: "center",
};

const timeBoxStyle = {
  width: "50px", // Set the width and height to create square boxes
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "tomato", // Set the box background color to orange
  borderRadius: "5px",
  fontWeight: "bold", // Set font weight to bold
  margin: "0 5px", // Add margin for spacing
};

const currentBidStyle = {
  fontSize: "24px", // Increase font size
  fontWeight: "bold", // Set font weight to bold
  fontStyle: "sans-serif", // Set font style to sans-serif
  marginBottom: "20px",
  marginTop: "50px",
  display: "flex",
  alignItems: "center",
  marginLeft: "50%",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "50%",
};

export default AuctionDetails;
