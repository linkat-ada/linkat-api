const responses = require("../../helper/responses");
const service = require("../service");

const setSubscriber = async (req, res, next) => {
  try {
    const email = req?.body?.email;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return responses.failedWithMessage("Please add a valid email", res);
    const result = await service.setSubscribe({ email });
    if (result)
      return responses.successWithMessage("Thank you for subscribing", res);
    return responses.failedWithMessage(
      "You are already subscribed to our newsletter",
      res
    );
  } catch (err) {
    console.log("ERROR ->: ", err);
    return responses.serverError(res);
  }
};

const getSubscribers = (req, res, next) => {

};

module.exports = {
  getSubscribers,
  setSubscriber
};
