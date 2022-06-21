const models = require("../../../models");
const { Op } = require("sequelize");
const authService = require("../../middleware/services/auth");
const { Sequelize } = require("../../../models");

const signin = async ({ usernameOrEmail, password }) => {
  try {
    const admin = await models.users.findOne({
      where: {
        [Op.and]: [{
          [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
          deletedAt: null,
          isActive: true,
          [Op.or]: [{ roleId: 1 }, { roleId: 2 }]
        }]
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
      attributes: ["username", "email", "roleId", "isActive"]
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

const deleteUser = async (currUser) => {
<<<<<<< HEAD
  try {
    const result = await models.users.update(
      {
        deletedAt: Sequelize.fn("now")
      },
      {
        where: {
          id: currUser.id,
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

const addLinkType = async (userId) => {
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

const editLinkType = async (userId) => {
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

const editLinkIcon = async (userId) => {
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

const editAdmin = async (userId) => {
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

const getAdmins = async (userId) => {
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
=======
    try {
      const result = await models.users.update(
        {
          deletedAt: Sequelize.fn("now")
        },
        {
          where: {
            id: currUser.id,
          },
        }
      );
      return result;
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  };

>>>>>>> aa03ddf4c693ccf240749e7d1c5647a85168f31d

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
  editAdmin,
  getAdmins
}