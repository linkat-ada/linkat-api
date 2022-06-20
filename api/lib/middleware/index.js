const authService = require("../middleware/services/auth");
const responses = require("../helper/responses");
const models = require("../../models");

const isAuthenticated = async function (req, res, next) {
  try {
    // take out the jwt we've set in the cookie set or from auth headers coming from client
    const token =
      req?.cookies?.jwt ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    const isInvalid = await models.invalidTokens.findOne({
      where: {
        tokens: token,
      },
    });
    if (isInvalid) return responses.failedWithMessage("Token is invalid", res);
    const isVerified = await authService.verifyUser(req, res, next, token);
    console.log("isVerified", isVerified);
    const user = await models.users.findByPk(req.user.id);
    if(!user.isActive) return responses.failedWithMessage("Your account is no longer active", res)
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

const isAdmin = async function (req, res, next) {
  try { 
    const user = await models.users.findByPk(req.user.id) 
    if (user.roleId == 1 || user.roleId == 2) return next()
    return responses.unauthorized(res)
  } catch (err) {
    console.log("Error -->", err);
    responses.unauthenticated(res);
  }
};

const isSuperAdmin = async function (req, res, next) {
  try { 
    const user = await models.users.findByPk(req.user.id) 
    if (user.roleId == 1) return next()
    return responses.unauthorized(res)
  } catch (err) {
    console.log("Error -->", err);
    responses.unauthenticated(res);
  }
};


module.exports = {
  isAuthenticated,
  isAdmin,
  isSuperAdmin
};
