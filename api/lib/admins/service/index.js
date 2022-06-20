const models = require("../../../models");
const { Op } = require("sequelize");
const authService = require("../../middleware/services/auth");

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
    if (admin) {
      if (authService.comparePasswords(password, admin.password))
        return { admin, token: authService.signUser(admin) };
      else return null;
    }
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
    return {user: user, links: userLinks};
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}


module.exports = {
  signin,
  getUsers,
  getUser
}