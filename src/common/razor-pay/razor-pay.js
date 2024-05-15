import Razorpay from "razorpay";

//Razor pay credentials
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
    console.log(order, "order")
    return order;
  } catch (error) {
    throw new Error("Failed to create order");
  }
};

export default razorPayment;