const responses = require("../../helper/responses");
const service = require("../service");

const getQR = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return responses.unauthenticated(res);
    const uuid = await service.generateUUID();
    const qr = await service.generateQr(process.env.URL + "/" + uuid);
    if (qr) {
      const result = await service.setQR({ userId, uuid, qr });
      return result
        ? responses.successWithMessage("the QR code successfully generated it", res)
        : responses.failedWithMessage("the QR code already generated it !", res);
    }
    return responses.failedWithMessage("failed to get QR code !", res);
  } catch (err) {
    console.log("--->", err);
    return responses.serverError(res);
  }
};

const scanQR = async (req, res, next) => {
  try {
    
  } catch (err) {
    console.log("--->", err);
    return responses.serverError(res);
  }
};

module.exports = {
  getQR,
  scanQR,
};
