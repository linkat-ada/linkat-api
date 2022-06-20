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
      return responses.success("Got users successfully", result, res);
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
      return responses.success("Got user successfully", result, res);
    }
    return responses.failedWithMessage("Failed to get user", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const result = await service.getUsers();
    if (result) {
      return responses.successWithMessage("Users received successfully", res);
    }
    return responses.failedWithMessage("Failed to get users", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const editUser = async (req, res, next) => {
  try {
    const result = await service.getUsers();
    if (result) {
      return responses.successWithMessage("Users received successfully", res);
    }
    return responses.failedWithMessage("Failed to get users", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const deleteLink = async (req, res, next) => {
  try {
    const result = await service.getUsers();
    if (result) {
      return responses.successWithMessage("Users received successfully", res);
    }
    return responses.failedWithMessage("Failed to get users", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const addLinkType = async (req, res, next) => {
  try {
    const result = await service.getUsers();
    if (result) {
      return responses.successWithMessage("Users received successfully", res);
    }
    return responses.failedWithMessage("Failed to get users", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const editLinkType = async (req, res, next) => {
  try {
    const result = await service.getUsers();
    if (result) {
      return responses.successWithMessage("Users received successfully", res);
    }
    return responses.failedWithMessage("Failed to get users", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const editLinkIcon = async (req, res, next) => {
  try {
    const result = await service.getUsers();
    if (result) {
      return responses.successWithMessage("Users received successfully", res);
    }
    return responses.failedWithMessage("Failed to get users", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const editAdmin = async (req, res, next) => {
  try {
    const result = await service.getUsers();
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
    const result = await service.getUsers();
    if (result) {
      return responses.successWithMessage("Users received successfully", res);
    }
    return responses.failedWithMessage("Failed to get users", res);
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
