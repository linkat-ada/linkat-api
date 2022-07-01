const { async } = require("@firebase/util");
const responses = require("../../helper/responses");
const service = require("../service");

const createQR = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return responses.unauthenticated(res);
    const uuid = await service.generateUUID();
    const qr = await service.generateQr(process.env.URL + "/" + uuid);
    if (qr) {
      const result = await service.setQR({ userId, uuid, qr });
      return result
        ? responses.successWithMessage(
            "the QR code successfully generated it",
            res,
            { QR: result }
          )
        : responses.failedWithMessage(
            "the QR code already generated it !",
            res
          );
    }
    return responses.failedWithMessage("failed to get QR code !", res);
  } catch (err) {
    console.log("--->", err);
    return responses.serverError(res);
  }
};

const getQR = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await service.getQR({ userId });
    if (!result)
      return responses.failedWithMessage(
        "failed to get QR code maybe you created it!",
        res
      );
    return responses.success("", { QRCode: result }, res);
  } catch (err) {
    console.log();
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
  createQR,
  scanQR,
  getQR,
};
