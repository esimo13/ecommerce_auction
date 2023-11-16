const express = require("express");
const {
  getAllAuctions,
  createAuction,
  updateAuction,
  deleteAuction,
  getAuctionDetails,
  getAdminAuctions,
} = require("../controllers/auctionController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/auctions").get(getAllAuctions);

router
  .route("/admin/auctions")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminAuctions);

router
  .route("/admin/auction/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createAuction);

router
  .route("/admin/auction/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateAuction)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAuction);

router.route("/auction/:id").get(getAuctionDetails);

module.exports = router;
