const responses = require("../../helper/responses");
const service = require("../service");
const models = require("../../../models");
const { Op } = require("sequelize");


const createAdmin = async (req, res, next) => {
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
    const admin = await models.users.findOne({
      where: {
        [Op.and]: [{ id: req?.params?.id}, { deletedAt: { [Op.eq]: null } }]
      },
    });
    if (!admin)
      return responses.failedWithMessage("Admin does not exist", res);
    const result = await service.deleteAdmin(admin);
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
    const newRole = req?.body?.role;
    console.log(newRole)
    if (!user) return responses.failedWithMessage("User could not be found.", res)
    const result = await service.changeUserRole(user, newRole);
    if (result)
      return responses.successWithMessage("User role changed successfully", res);
    return responses.failedWithMessage("Failed to change user role", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

module.exports = {
  createAdmin,
  deleteAdmin,
  changeUserRole
};
