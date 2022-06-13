const models = require("../../../models");
const { Op } = require("sequelize");
const authService = require("../../middleware/services/auth");
const { Sequelize } = require("../../../models");

const createUser = async ({ username, email, password }) => {
  try {
    const [user, userCreated] = await models.users.findOrCreate({
      where: {
        [Op.and]: [{ username }, { email }],
      },
      defaults: {
        username,
        email,
        password: authService.hashPassword(password),
      },
    });
    if (!userCreated) return null;
    else {
      const [userprofile, createdprofile] = await models.usersprofiles.findOrCreate({
        where: {
          userId: user.id
          },
          defaults: {
            userId: user.id
          }
        })
      if (!createdprofile) return null;  
    }
    return user;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const signin = async ({ usernameOrEmail, password }) => {
  try {
    const user = await models.users.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        deletedAt: null
      },
    });
    if (user) {
      if (authService.comparePasswords(password, user.password))
        return { user: user, token: authService.signUser(user) };
      else return null;
    }
    return null;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const getUserInfo = async (req) => {
  try {
    const result = await models.users.findOne({
      where: {
        id: req?.user?.id
      },
      include: [{
        model: models.usersprofiles,
        foreignKey: 'userId'
      }]
    });
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }

}

const updateUsername = async (currUser, newUsername) => {
  try {
    const newUser = models.users.update(
      {
        username: newUsername,
      },
      {
        where: {
          id: currUser.id,
        },
      }
    );
    if (newUser) return newUser;
    else return false;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const updateEmail = async (currUser, newEmail) => {
  try {
    const newUser = models.users.update(
      {
        email: newEmail,
      },
      {
        where: {
          id: currUser.id,
        },
      }
    );
    if (newUser) return newUser;
    else return false;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

const updateProfile = async (currUser, nickname, bio) => {
  try {
    const newUser = models.usersprofiles.update(
      {
        nickname,
        bio
      },
      {
        where: {
          userId: currUser.id,
        },
      }
    );
    if (newUser) return newUser;
    else return false;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}


const updatePassword = async (currUser, newPassword) => {
  try {
    const result = await models.users.update(
      {
        password: authService.hashPassword(newPassword),
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

const updateProfilePic = async (currUser, profilePic) => {
  try {
    const result = await models.usersprofiles.update(
      {
        profilePic
      },
      {
        where: {
          userId: currUser.id,
        },
      }
    );
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const updateBgPic = async (currUser, bgPic) => {
  try {
    const result = await models.usersprofiles.update(
      {
        bgPic
      },
      {
        where: {
          userId: currUser.id,
        },
      }
    );
    return result;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

const deleteUser = async (currUser) => {
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

const logout = async ({token}) => {
  [result, created] = await models.invalidTokens.findOrCreate( {
    where:{
      tokens: token
    }, defaults: {
      tokens:token
    }
  }) 
  if(!created) return false;
  return result;
}

module.exports = {
  createUser,
  signin,
  getUserInfo,
  updateUsername,
  updateEmail,
  updateProfile,
  updatePassword,
  updateProfilePic,
  updateBgPic,
  deleteUser,
  logout
};
