const responses = require("../../helper/responses");
const service = require("../service");
const transformer = require("../../../transformers");
const models = require("../../../models");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebase = require("../../firebase/config")
const { getStorage } = require("firebase/storage");
const storage = getStorage(firebase)




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

const getUsersDates = async (req, res, next) => {
  try {
    const result = await service.getUsersDates();
    if (result) {
      return responses.success("Information received successfully", result, res);
    }
    return responses.failedWithMessage("Failed to get information", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await service.getUser(id);
    if (result) {
      return responses.success("User received successfully", result, res);
    }
    return responses.failedWithMessage("Failed to get user", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const getUserLinks = async (req, res, next) => {
  try {
    const result = await service.getUserLinks(req?.params?.id);
    if (result) {
      return responses.success("User links received successfully", result, res);
    }
    return responses.failedWithMessage("Failed to get user links", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await models.users.findByPk(req?.params?.id);
    if (!user) return responses.failedWithMessage("User does not exist", res)
    const result = await service.deleteUser(user);
    if (result)
      return responses.successWithMessage("User deleted successfully", res);
    return responses.failedWithMessage("Failed to delete user", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
};

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
    console.log(req)
    const type = req?.body.type;
    // const fileTypes = ["png", "jpg", "jpeg", "gif"]
    if (!type) return responses.failedWithMessage("Please specify a type", res);
    // const file = req?.file
    // const uniqueFileName = `icons/${
    //   file?.originalname?.split(".")[0]
    // }%%${new Date().valueOf()}.${file?.originalname?.split(".")[1]}`;
    // const imageRef = ref(storage, uniqueFileName);
    // const metaType = { contentType: file?.mimetype, name: file?.originalname };
    // if(!fileTypes.includes(file?.originalname?.split(".")[1]))
    //   return responses.failedWithMessage(`please upload file with those types: ${fileTypes} `,res);
    // await uploadBytes(imageRef, file?.buffer, metaType).then(async () => {
    //   const publicUrl = await getDownloadURL(imageRef);
    const result = await service.addLinkType(type);
    console.log("result", result)
    if (!result) return responses.failedWithMessage("Failed to create link type", res);
    return responses.successWithMessage(`Link type added successfully `, res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

//only link type name
const editLinkType = async (req, res, next) => {
  try {
    const type = req?.body?.type;
    if (!type) return responses.failedWithMessage("Please enter the type name", res);
    const linktype = await models.linktypes.findOne({
      where: {
        id: req?.params?.id
      }
    })
    if (!linktype) responses.failedWithMessage("Link type does not exist", res);
    const result = await service.editLinkType(linktype, type);
    if (result) {
      return responses.success("Link type edited successfully", result, res);
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
    const icon = req?.file;
    const linktype = req.params.id;
    if (!icon) responses.failedWithMessage("Please enter an icon", res);
    const fileTypes = ["png", "jpg", "jpeg", "gif"]
    const uniqueFileName = `icons/${icon?.originalname?.split(".")[0]
      }%%${new Date().valueOf()}.${icon?.originalname?.split(".")[1]}`;
    const imageRef = ref(storage, uniqueFileName);
    const metaType = { contentType: icon?.mimetype, name: icon?.originalname };
    if (!fileTypes.includes(icon?.originalname?.split(".")[1]))
      return responses.failedWithMessage(`please upload file with those types: ${fileTypes} `, res);
    await uploadBytes(imageRef, icon?.buffer, metaType).then(async () => {
      const publicUrl = await getDownloadURL(imageRef);
      const result = await service.editLinkIcon(linktype, publicUrl);
      if (!result) return responses.failedWithMessage("Failed to uplaod the icon of  link", res);
      return responses.successWithMessage(`the link icon edit successfully `, res, { urlImage: publicUrl });
    }).catch((e) => {
      console.error(e);
      return responses.failedWithMessage(e.message, res);
    })
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const getLinkTypes = async (req, res, next) => {
  try {
    const linktypes = await service.getLinkTypes();
    if (linktypes) return responses.success("Received linktypes successfully", linktypes, res)
    return responses.failedWithMessage("Failed to get linktypes", res)
  } catch (err) {
    console.log("ERROR -->:", err);
    return responses.serverError(res)
  }
}

const toggleActivity = async (req, res, next) => {
  try {
    const user = await models.users.findByPk(req?.params?.id);
    if (!user) return responses.failedWithMessage("User does not exist", res)
    const { result, isActive } = await service.toggleActivity(user);
    if (result)
      return responses.success("Toggled user activity successfully", { isActive: !isActive }, res);
    return responses.failedWithMessage("Failed to toggle user activity", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}

const getAdmins = async (req, res, next) => {
  try {
    const result = await service.getAdmins();

    if (result) {
      return responses.success("Admins received successfully", result, res);
    }
    return responses.failedWithMessage("Failed to get admins", res);
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}


module.exports = {
  getUsers,
  getUsersDates,
  getUser,
  getUserLinks,
  signin,
  deleteUser,
  deleteLink,
  addLinkType,
  editLinkType,
  editLinkIcon,
  getAdmins,
  toggleActivity,
  getLinkTypes
};
