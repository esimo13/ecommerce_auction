import React, { Fragment, useEffect, useState } from "react";
import "./Auction.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAuction } from "../../actions/auctionAction";
import Loader from "../layout/Loader/Loader";
import AuctionCard from "../Home/AuctionCard";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const Auctions = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000000]);

  const {
    auctions,
    loading,
    error,
    auctionsCount,
    resultPerPage,
    filteredAuctionsCount,
  } = useSelector((state) => state.auctions);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  // eslint-disable-next-line
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredAuctionsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAuction(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Auctions</h2>

          <div className="products">
            {auctions &&
              auctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={auctionsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Auctions;
