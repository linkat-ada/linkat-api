const responses = require("../../helper/responses");
const service = require("../service");

const createQr = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return responses.unauthenticated(res);
    const uuid = await service.generateUUID()
    const qr = await service.generateQr(process.env.URL+"/"+uuid);
    console.log(qr)
  } catch (err) {
    console.log("--->", err);
    return responses.serverError(res);
  }
};

module.exports = {
  createQr,
};
