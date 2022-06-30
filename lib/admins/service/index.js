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
      }
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
    const users = await models.users.findAll({
      where: {
        deletedAt: null
      },
      attributes: ["id", "username", "email", "roleId", "isActive"]
    })
    return users;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const getUser = async (userId) => {
  try {
    const user = await models.users.findOne({
      where: {
        id: userId,
        deletedAt: null,
      },
      include: [{
        model: models.usersprofiles,
        foreignKey: 'userId',
      }],
    })
    const userLinks = await models.links.findAll({
      where: {
        userId,
        deletedAt: null,
      }
    })
    return { user: user, links: userLinks };
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

const deleteLink = async (userId) => {
  try {
    const user = await models.links.update({
      deletedAt: Sequelize.fn("now"),
      where: {
        id: link.id,
      }
    })
    return user;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const addLinkType = async (type, icon = null) => {
  try {
    const [linktype, created] = await models.linktypes.findOrCreate({
      where: {
        type
      },
      defaults: {
        type,
        icon
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
    return newLinktype;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const editLinkIcon = async (linktype, icon) => {
  try {
    const newLinktype = await models.linktypes.update(
      {
        icon
      },
      {
        where: {
          id: linktype.id
        }
      }
    )
    return newLinktype;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

// const editAdmin = async (userId) => {
// }

const getAdmins = async () => {
  try {
    const admins = await models.users.findAll({
      where: {
        [Op.or]: [{ roleId: 1 }, { roleId: 2 }]
      },
      attributes: ["username", "email", "roleId", "isActive"]
    })
    if(!admins) return null;
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

module.exports = {
  signin,
  deleteUser,
  getUsers,
  getUser,
  deleteUser,
  deleteLink,
  addLinkType,
  editLinkType,
  editLinkIcon,
  getAdmins,
  toggleActivity
}