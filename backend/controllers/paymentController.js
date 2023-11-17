const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(
  "sk_test_51ODS0PJJB9jyYs2sTpheEkgU7bpDx5g4AjbI8FH9zvr7tixo5H2heNmRlueS6ME298y4pNip0A6QRbViI2TRDmKs00glOSjU6V"
);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "bdt",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey:
      "pk_test_51ODS0PJJB9jyYs2sP6cdsDXelJqblf3p4W9VsLsPGflUSTiGhLOoxUXdPSoar0J5zAXe8TUZTJhgXh2tC96xCTyM00VfMLxJ5G",
  });
});
