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

  const [currentBid, setCurrentBid] = useState(auction.price);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    return Math.max(0, endTime - now);
  }

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    return { hours, minutes, seconds };
  };

  const handleBidClick = () => {
    // In a real app, you might want to perform additional validation, check user authentication, etc.
    const newBid = currentBid + auction.price / 100; // Increment the bid by 10 (you can adjust this as needed)

    // Check if the new bid is valid
    if (newBid <= auction.price * 2) {
      setCurrentBid(newBid);
      alert.success("Bidding has been applied!");
    } else {
      alert.error("Bid too high. Please bid a lower amount.");
    }

    // You can also make an API call here to update the backend with the new bid.
    // For simplicity, we're only updating the UI in this example.
  };

  // const { success, error: reviewError } = useSelector(
  //   (state) => state.newReview
  // );

  const options = {
    size: "large",
    value: auction.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");

  // const increaseQuantity = () => {
  //   if (auction.Stock <= quantity) return;

  //   const qty = quantity + 1;
  //   setQuantity(qty);
  // };

  // const decreaseQuantity = () => {
  //   if (1 >= quantity) return;

  //   const qty = quantity - 1;
  //   setQuantity(qty);
  // };

  // const addToCartHandler = () => {
  //   dispatch(addItemsToCart(match.params.id, quantity));
  //   alert.success("Item Added To Cart");
  // };

  // const submitReviewToggle = () => {
  //   open ? setOpen(false) : setOpen(true);
  // };

  // const reviewSubmitHandler = () => {
  //   const myForm = new FormData();

  //   myForm.set("rating", rating);
  //   myForm.set("comment", comment);
  //   myForm.set("auctionId", match.params.id);

  //   dispatch(newReview(myForm));

  //   setOpen(false);
  // };

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
              {/* <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({auction.numOfReviews} Reviews)
                </span>
              </div> */}
              <div className="detailsBlock-3">
                <h1>{`৳${auction.price}`}</h1>
                {/* <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={auction.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div> */}

                {/* <p>
                  Status:
                  <b className={auction.Stock < 1 ? "redColor" : "greenColor"}>
                    {auction.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p> */}
              </div>

              <div className="detailsBlock-4">
                Description : <p>{auction.description}</p>
              </div>

              {/* <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button> */}
            </div>
          </div>
          <div style={timeRemainingStyle}>
            <div style={timeBoxStyle}>{formatTime(timeRemaining).hours}h</div>
            <div style={timeBoxStyle}>{formatTime(timeRemaining).minutes}m</div>
            <div style={timeBoxStyle}>{formatTime(timeRemaining).seconds}s</div>
          </div>
          <p style={currentBidStyle}>Current Bid: ৳{currentBid}</p>
          <button style={buttonStyle} onClick={handleBidClick}>
            Apply for Bidding
          </button>

          {/* <h3 className="reviewsHeading">REVIEWS</h3> */}

          {/* <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog> */}

          {/* {auction.reviews && auction.reviews[0] ? (
            <div className="reviews">
              {auction.reviews &&
                auction.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )} */}
        </Fragment>
      )}
    </Fragment>
  );
};

const centerTopStyle = {
  textAlign: "center",
  marginTop: "20px", // Adjust the margin-top as needed
};

const containerStyle = {
  display: "flex", // Use flexbox for the layout
  justifyContent: "center",
  alignItems: "center",
  textAlign: "left", // Align text to the left
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "0 auto",
};

const textContainerStyle = {
  marginLeft: "20px", // Add margin to separate image and text
  flex: 1, // Allow text container to take remaining width
};

const titleStyle = {
  fontSize: "28px", // Increase font size
  fontWeight: "bold", // Set font weight to bold
  fontFamily: "Roboto", // Set font family to Roboto
  marginBottom: "30px",
};

const descriptionStyle = {
  fontSize: "20px", // Increase font size
  // fontWeight: "bold", // Set font weight to bold
  fontFamily: "Roboto", // Set font family to Roboto
  marginBottom: "20px",
  marginTop: "20px",
};

const priceStyle = {
  fontSize: "24px", // Increase font size
  fontWeight: "bold", // Set font weight to bold
  fontStyle: "italic", // Set font style to italic
  color: "tomato", // Set text color to orange
  marginBottom: "20px",
  marginTop: "20px",
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

const imageStyle = {
  maxWidth: "100%",
  borderRadius: "8px",
  marginBottom: "10px",
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
