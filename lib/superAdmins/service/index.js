const models = require("../../../models");
const { Op } = require("sequelize");
const authService = require("../../middleware/services/auth");
const Sequelize = require('sequelize');

const createAdmin = async ({ username, email, password }) => {
  try {
    const [admin, adminCreated] = await models.users.findOrCreate({
      where: {
        [Op.and]: [{ username }, { email }],
      },
      defaults: {
        username,
        email,
        password: authService.hashPassword(password),
        roleId: 2
      },
    });
    if (!adminCreated) return null;
    else {
      const [adminprofile, createdprofile] = await models.usersprofiles.findOrCreate({
        where: {
          userId: admin.id
        },
        defaults: {
          userId: admin.id,
        }
      })
      if (!createdprofile) return null;
    }
    return admin;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const changeUserRole = async (user, newRole) => {
  try {
    const role = await models.roles.findOne({
      where: {
        role: newRole
      }
    })
    const newUser = models.users.update(
      {
        roleId: role.id
      },
      {
        where: {
          id: user.id
        }
      }
    )
    return newUser;
  } catch (err) {
    console.log(err);
    return responses.serverError(res);
  }
}



const deleteAdmin = async (admin) => {
  try {
    const result = await models.users.update(
      {
        deletedAt: Sequelize.fn("now")
      },
      {
        where: {
          id: admin.id,
        },
      }
    );
    if (!result) return null
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

module.exports = {
  createAdmin,
  deleteAdmin,
  changeUserRole
};
