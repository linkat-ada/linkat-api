const models = require("../../../models");
const { Op } = require("sequelize");
const authService = require("../../middleware/services/auth");
const { Sequelize } = require("../../../models");

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
        const [userprofile, createdprofile] = await models.usersprofiles.findOrCreate({
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

module.exports = {
    createAdmin,
};
