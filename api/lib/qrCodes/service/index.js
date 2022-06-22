const QR = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const models = require("../../../models");

const generateQr = async (text) => {
  try {
    const opts = {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.3,
      margin: 0,
      color: {
        dark: "#FFFFFF",
        light: "#000000",
      },
    };
    const qr = await QR.toDataURL(text, opts);
    if (qr) return qr
    return null;
  } catch (err) {
    console.log("Error-->", err);
    throw new Error(err);
  }
};

const generateUUID = async () => {
  try {
    return await uuidv4();
  } catch (err) {
    console.log("Error-->", err);
    throw new Error();
  }
};

const setQR = async ({ userId, uuid, qr: QRlink }) => {
  try {
    const [qr, qrCreated] = await models.qrcodes.findOrCreate({
      where: { userId },
      defaults: {
        userId,
        uuid,
        QRlink,
      },
    });
    if (qrCreated) return qr;
    return null;
  } catch (err) {
    console.log("ERROR --> ", err);
    throw new Error();
  }
};

module.exports = {
  generateQr,
  generateUUID,
  setQR,
};
