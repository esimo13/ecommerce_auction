const Auction = require("../models/auctionModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createAuction = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "auctionproduct",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const auction = await Auction.create(req.body);

  res.status(201).json({
    success: true,
    auction,
  });
});

// Get All Product
exports.getAllAuctions = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const auctionsCount = await Auction.countDocuments();

  const apiFeature = new ApiFeatures(Auction.find(), req.query)
    .search()
    .filter();

  let auctions = await apiFeature.query;

  let filteredAuctionsCount = auctions.length;

  apiFeature.pagination(resultPerPage);

  auctions = await apiFeature.query;

  res.status(200).json({
    success: true,
    auctions,
    auctionsCount,
    resultPerPage,
    filteredAuctionsCount,
  });
});

// Get All Product (Admin)
exports.getAdminAuctions = catchAsyncErrors(async (req, res, next) => {
  const auctions = await Auction.find();

  res.status(200).json({
    success: true,
    auctions,
  });
});

// Get Product Details
exports.getAuctionDetails = catchAsyncErrors(async (req, res, next) => {
  const auction = await Auction.findById(req.params.id);

  if (!auction) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    auction,
  });
});

// Update Product -- Admin

exports.updateAuction = catchAsyncErrors(async (req, res, next) => {
  let auction = await Auction.findById(req.params.id);

  if (!auction) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < auction.images.length; i++) {
      await cloudinary.v2.uploader.destroy(auction.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "auctionproduct",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  auction = await Auction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    auction,
  });
});

// Delete Product

exports.deleteAuction = catchAsyncErrors(async (req, res, next) => {
  const auction = await Auction.findById(req.params.id);

  if (!auction) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < auction.images.length; i++) {
    await cloudinary.v2.uploader.destroy(auction.images[i].public_id);
  }

  await auction.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
// exports.createAuctionReview = catchAsyncErrors(async (req, res, next) => {
//   const { rating, comment, auctionId } = req.body;

//   const review = {
//     user: req.user._id,
//     name: req.user.name,
//     rating: Number(rating),
//     comment,
//   };

//   const auction = await Auction.findById(auctionId);

//   const isReviewed = auction.reviews.find(
//     (rev) => rev.user.toString() === req.user._id.toString()
//   );

//   if (isReviewed) {
//     auction.reviews.forEach((rev) => {
//       if (rev.user.toString() === req.user._id.toString())
//         (rev.rating = rating), (rev.comment = comment);
//     });
//   } else {
//     auction.reviews.push(review);
//     auction.numOfReviews = auction.reviews.length;
//   }

//   let avg = 0;

//   auction.reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   auction.ratings = avg / auction.reviews.length;

//   await auction.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

// // Get All Reviews of a product
// exports.getAuctionReviews = catchAsyncErrors(async (req, res, next) => {
//   const auction = await Auction.findById(req.query.id);

//   if (!auction) {
//     return next(new ErrorHander("Product not found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     reviews: auction.reviews,
//   });
// });

// // Delete Review
// exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
//   const auction = await Auction.findById(req.query.auctionId);

//   if (!auction) {
//     return next(new ErrorHander("Product not found", 404));
//   }

//   const reviews = auction.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   let ratings = 0;

//   if (reviews.length === 0) {
//     ratings = 0;
//   } else {
//     ratings = avg / reviews.length;
//   }

//   const numOfReviews = reviews.length;

//   await Auction.findByIdAndUpdate(
//     req.query.auctionId,
//     {
//       reviews,
//       ratings,
//       numOfReviews,
//     },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//   });
// });
