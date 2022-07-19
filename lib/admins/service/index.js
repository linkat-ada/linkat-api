const models = require("../../../models");
const { Op } = require("sequelize");
const authService = require("../../middleware/services/auth");
const { Sequelize } = require("../../../models");

const signin = async ({ usernameOrEmail, password }) => {
  try {
    const admin = await models.users.findOne({
      where: {
        [Op.and]: [
          { [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }] },
          { deletedAt: null },
          { isActive: true },
          { [Op.or]: [{ roleId: 1 }, { roleId: 2 }] }
        ]
      },
      include: [
        {
          model: models.usersprofiles
        },
        {
          model: models.roles
        }
      ]
    });
    if (admin && authService.comparePasswords(password, admin.password))
      return { admin, token: authService.signUser(admin) };
    return null;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const getUsers = async () => {
  try {
    const userRole = await models.roles.findOne({
      where: {
        role: "user"
      }
    });
    const users = await models.users.findAll({
      where: {
        deletedAt: null,
        roleId: userRole.id
      },
      attributes: ["id", "username", "email", "roleId", "isActive"],
      include: [{
        model: models.usersprofiles,
        foreignKey: "userId"
      },
      {
        model: models.roles
      }]
    })
    return users;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const getUsersDates = async () => {
  try {
    const dates = await models.users.findAll({
      attributes: ["createdAt"]
    })
    return dates;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const getUser = async (id) => {
  try {
    const users = await models.users.findOne({
      where: {
        id,
        deletedAt: null,
      },
      attributes: ["id", "username", "email", "roleId", "isActive"],
      include: [{
        model: models.usersprofiles,
        foreignKey: "userId"
      },
      {
        model: models.roles
      }]
    })
    return users;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const getUserLinks = async (userId) => {
  try {
    const userLinks = await models.links.findAll({
      where: {
        userId,
        deletedAt: null,
      },
      include: [
        {
          model: models.linktypes
        },
        {
          model: models.users
        }]
    })
    return userLinks;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const deleteUser = async (user) => {
  try {
    const result = await models.users.update(
      {
        deletedAt: Sequelize.fn("now")
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const deleteLink = async (link) => {
  try {
    const result = await models.links.update(
      {
        deletedAt: Sequelize.fn("now")
      },
      {
        where: {
          id: link.id,
        }
      }
    );
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const addLinkType = async (type) => {
  try {
    console.log("type", type)
    const [linktype, created] = await models.linktypes.findOrCreate({
      where: {
        type
      },
      defaults: {
        type,
        icon: 'https://firebasestorage.googleapis.com/v0/b/linkat-a9527.appspot.com/o/images%2Fmain-image%2Flinkat-04.svg?alt=media&token=db25bbaf-c238-4900-a1e4-daf02598ac6b'
      },
    });
    if (!created) return null;
    return linktype;
  } catch (err) {
    console.log("Error -->", err);
    throw new Error(err);
  }
}

const editLinkType = async (linktype, type) => {
  try {
    const newLinktype = await models.linktypes.update(
      {
        type
      },
      {
        where: {
          id: linktype.id
        }
      }
    )
    const newType = await models.linktypes.findOne({
      where: {
        id: linktype.id
      }
    })
    return { updated: newLinktype, linktype: newType };
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const editLinkIcon = async (id, icon) => {
  try {
    const newLinktype = await models.linktypes.update(
      {
        icon
      },
      {
        where: {
          id
        }
      }
    )
    const newIcon = await models.linktypes.findOne({
      where: {
        id
      }
    })
    return { updated: newLinktype, linktype: newIcon };
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const getAdmins = async () => {
  try {
    const admins = await models.users.findAll({
      where: {
        [Op.or]: [{ roleId: 1 }, { roleId: 2 }],
        deletedAt: null
      },
      attributes: ["id", "username", "email", "roleId", "isActive"],
      include: [
        {
          model: models.usersprofiles,
          foreignKey: "userId"
        },
        {
          model: models.roles
        }]
    })
    if (!admins) return null;
    return admins;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const toggleActivity = async (user) => {
  try {
    console.log("before updating: ", user.isActive);
    const newUser = await models.users.update(
      {
        isActive: !user.isActive
      },
      {
        where: {
          id: user.id
        }
      }
    )
    return { result: newUser, isActive: user.isActive }
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
}

const getLinkTypes = async () => {
  try {
    const linkTypes = await models.linktypes.findAll({});
    if (linkTypes) return linkTypes;
    return null;
  } catch (err) {
    console.log("ERROR-->", err)
    throw new Error(err);
  }
}

module.exports = {
  signin,
  deleteUser,
  getUsers,
  getUsersDates,
  getUser,
  getUserLinks,
  deleteUser,
  deleteLink,
  addLinkType,
  editLinkType,
  editLinkIcon,
  getAdmins,
  getLinkTypes,
  toggleActivity
}