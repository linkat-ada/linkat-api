const responses = require("../../helper/responses");
const service = require("../service");
const models = require("../../../models");

const signup = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirmation } = req?.body;
    if (!username || !email || !password)
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
    const currAdmin = await models.users.findByPk(req?.user?.id);
    if (!currAdmin) return responses.unauthenticated(res);
    const toBeDeleted = await models.users.findByPk(req?.params?.id);
    if (!toBeDeleted) return res.failedWithMessage("Admin to be deleted not found.", res);
    const result = await service.deleteAdmin(toBeDeleted);
    if (result)
      return responses.successWithMessage("Admin deleted successfully", res);
    return responses.failedWithMessage("Failed to delete admin", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
};

const changeUserRole = async (req, res, next) => {
  try {
    const user = await models.users.findByPk(req?.params?.id);
    if (!user) responses.failedWithMessage("User could not be found.")
    const result = await service.changeUserRole(user);
    if (result)
      return responses.successWithMessage("User role changed successfully", res);
    return responses.failedWithMessage("Failed to change user role", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

module.exports = {
  signup,
  deleteAdmin,
  changeUserRole
};
