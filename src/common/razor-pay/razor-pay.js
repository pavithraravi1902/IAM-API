import Razorpay from "razorpay";

// // mahesh Razor pay credentials
// const razorpay = new Razorpay({
//   key_id: "rzp_test_nLdVp2LWvwUtaL",
//   key_secret: "r1X4K6n7qGnjDA52P8uAkA2e",
// });

// pavithra Razor pay credentials
const razorpay = new Razorpay({
  key_id: "rzp_test_bkFrzP8pjtrHDc",
  key_secret: "gPRG86NZn3wV7A7MGVNfnERS",
});

//razor payment
const razorPayment = async (amount, currency, receipt) => {
  try {
    const options = {
      amount: amount,
      currency: currency,
      receipt: receipt,
    };
    const order = await this.razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error("Failed to create order");
  }
};

export default razorPayment;