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
