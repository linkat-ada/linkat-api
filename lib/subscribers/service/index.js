const models = require("../../../models");
const { Op } = require("sequelize");

const setSubscribe = async ({ email }) => {
  try {
    const [subscribe, created] = await models.subscribe.findOrCreate({
      where: {
        email ,
      },
      defaults: {
        email,
      },
    });
    if (created) return subscribe;
    return null;
  } catch (err) {
    console.log("ERROR-->: ", err);
    throw new Error(err);
  }
};


module.exports = {
  setSubscribe
}
