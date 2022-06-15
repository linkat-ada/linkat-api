const responses = require("../../helper/responses");
const service = require("../service");
const transformer = require("../../../transformers");
const authService = require("../../middleware/services/auth");
const models = require("../../../models");

const signup = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirmation } = req?.body;
    if (!username || !email || !password )
      return responses.failedWithMessage("Fill all required fields.", res);
    if (username?.length < 3)
      return responses.failedWithMessage("username is invalid", res);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body?.email))
      return responses.failedWithMessage("Please add a valid email", res);
    if (password?.length < 6)
      return responses.failedWithMessage("Please add a valid password", res);
    if (password != passwordConfirmation)
      return responses.failedWithMessage(
        "Your password and password confirmation do not match",
        res
      );
    const admin = await service.createAdmin({
      username,
      email,
      password,
    });
    if (admin) {
      return responses.successWithMessage("Admin created successfully", res);
    }
    return responses.failedWithMessage("Admin already exists.", res);
  } catch (err) {
    console.log(err);
    responses.serverError(res);
    return;
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    
  } catch (err) {
    console.log(err);
    responses.serverError(res);
    return;
  }
};

module.exports = {
  signup,
  deleteAdmin,
};
