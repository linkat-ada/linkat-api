const responses = require("../../helper/responses");
const service = require("../service");
const transformer = require("../../../transformers");
const models = require("../../../models");


const signin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req?.body;
    if (!usernameOrEmail || !password)
      return responses.failedWithMessage(
        "Please fill in the required fields.",
        res
      );
    const result = await service.signin({ usernameOrEmail, password });
    if (result) {
      return responses.success(
        "Logged in successfully",
        { admin: transformer.userTransformer(result.admin), token: result.token },
        res
      );
    }
    return responses.unauthenticated(res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await service.getUsers();
    if (result) {
      return responses.success("Users received successfully", result, res);
    }
    return responses.failedWithMessage("Failed to get users", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const getUser = async (req, res, next) => {
  try {
    const result = await service.getUser(req?.params?.id);
    if (result.user && result.links) {
      return responses.success("User received successfully", result, res);
    }
    return responses.failedWithMessage("Failed to get user", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await models.users.findByPk(req?.params?.id);
    if (!user) responses.failedWithMessage("User does not exist")
    const result = await service.deleteUser(user);
    if (result) {
      return responses.successWithMessage("User deleted successfully", res);
    }
    return responses.failedWithMessage("Failed to delete user", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const deleteLink = async (req, res, next) => {
  try {
    const link = await models.links.findByPk(req?.params?.id);
    if (!link) responses.failedWithMessage("Link does not exist")
    const result = await service.deleteLink(link);
    if (result) {
      return responses.successWithMessage("Link deleted successfully", res);
    }
    return responses.failedWithMessage("Failed to delete link", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const addLinkType = async (req, res, next) => {
  try {
    const { type, icon } = req?.body;
    const result = await service.addLinkType(type, icon);
    if (result) {
      return responses.successWithMessage("New link type added successfully", res);
    }
    return responses.failedWithMessage("Failed to add new link type", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

//only link type name
const editLinkType = async (req, res, next) => {
  try {
    const result = await service.editLinkType(req?.params?.id);
    if (result) {
      return responses.successWithMessage("Link type edited successfully", res);
    }
    return responses.failedWithMessage("Failed to edit link type", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

//only link type icon
const editLinkIcon = async (req, res, next) => {
  try {
    const result = await service.editLinkIcon(req?.params?.id);
    if (result) {
      return responses.successWithMessage("Link icon edited successfully", res);
    }
    return responses.failedWithMessage("Failed to edit link icon", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

//what can admin edit here
const editAdmin = async (req, res, next) => {
  try {
    const result = await service.editAdmin(req?.params?.id);
    if (result) {
      return responses.successWithMessage("Users received successfully", res);
    }
    return responses.failedWithMessage("Failed to get users", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const getAdmins = async (req, res, next) => {
  try {
    const result = await service.getAdmins();
    if (result) {
      return responses.successWithMessage("Admins received successfully", res);
    }
    return responses.failedWithMessage("Failed to get admins", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

module.exports = {
  getUsers,
  getUser,
  signin,
  deleteUser,
  editUser,
  deleteLink,
  addLinkType,
  editLinkType,
  editLinkIcon,
  editAdmin,
  getAdmins
};
