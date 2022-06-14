const authService = require("../middleware/services/auth");
const responses = require("../helper/responses");
const models = require("../../models")

const isAuthenticated = async function (req, res, next) {
  try {
    // take out the jwt we've set in the cookie set or from auth headers coming from client
    const token =
      req?.cookies?.jwt ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    const isInvalid = await models.invalidTokens.findOne({
      where:{
        tokens: token
      }
    })
    if(isInvalid) return responses.failedWithMessage("Token is invalid", res);
    const isVerified = await authService.verifyUser(req, res, next, token);
    console.log("isVerified", isVerified);
    if (isVerified) {
      return next();
    }
    responses.unauthorized(res);
    return;
  } catch (err) {
    console.log("Error -->", err);
    responses.unauthenticated(res);
  }
};

const isAdmin = async function ( req, res, next) {
  return next()
}

module.exports = {
  isAuthenticated,
  isAdmin
};
