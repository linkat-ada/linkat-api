const QR = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const models = require("../../../models");
const { Op } = require("sequelize");

const generateQr = async (text) => {
  try {
    const qr = await QR.toDataURL(text);
    if (qr) return qr;
    return null;
  } catch (err) {
    console.log("Error-->", err);
    throw new Error(err);
  }
};

const generateUUID =  () => {
  try {
    return  uuidv4();
  } catch (err) {
    console.log("Error-->", err);
    throw new Error();
  }
};

const setQR = async (userId, uuid, QRlink) => {
  try {
    const [qr, qrCreated] = await models.qrcodes.findOrCreate({
      where: { uuid },
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

const getQR = async ({ userId }) => {
  try {
    const [QR, created] = await models.qrcodes.findOrCreate({
      where: { userId },
      defaults: {
        QRlink,
      },
    });
    if (created) QR;
    return null;
  } catch (err) {
    console.log("ERROR ->", err);
    throw new Error(err);
  }
};

const setQRLinks = async (qrId, linkId) => {
  try {
    let qrlinksArr = linkId.map((item) => {
      return { qrId: qrId, linkId: item };
    });
    console.log("qrlinksArr:", qrlinksArr);
    const result = await models.qrlinks.bulkCreate(qrlinksArr, {
      ignoreDuplicates: false,
    });
    console.log("result------", result);
    if (Array.isArray(result)) return result;
    return null;
  } catch (err) {
    console.log("ERROR-->", err);
    throw new Error(err);
  }
};

const getLinks = async (userId) => {
  try {
    const links = await models.links.findAll({
      where: { [Op.and]: [{ userId }, { deletedAt: { [Op.eq]: null } }] },
      attributes: ["id"],
    });
    if (links) {
      const trasFormedLinks = links.map((link) => link.id);
      console.log("trasFormedLinks: ", trasFormedLinks);
      return trasFormedLinks;
    }
    return null;
  } catch (err) {
    console.log("ERROR-->", err);
    throw new Error(err);
  }
};

const getQRId = async (uuid) => {
  try {
    const qr = await models.qrcodes.findOne({
      where: { uuid },
      /*include: [
        {
          model: models.links,
          foreignKey: "id",
        },
      ],*/
    });
    if (qr) return qr.id;
    return null;
  } catch (err) {
    console.log("ERROR-->", err);
    throw new Error(err);
  }
};

const getUserId = async (uuid) => {
  try {
    const qr = await models.qrcodes.findOne({
      where: { uuid },
    });
    if (qr) return qr.userId;
    return null;
  } catch (err) {
    console.log("ERROR-->", err);
    throw new Error(err);
  }
};

const getLinksByQRId = async (id) => {
  try {
    const qrcode = await models.qrcodes.findOne({
      where: { id },
      include: [
        {
          model: models.links,
          include: models.linktypes,
        },
      ],
    });
    console.log(qrcode.links);
    if (qrcode) return qrcode.links;
    return null;
  } catch (err) {
    console.log("ERROR-->", err);
    throw new Error(err);
  }
};

const getUser = async (userId) => {
  try {
    const result = await models.users.findOne({
      where: {
        id: userId
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

module.exports = {
  generateQr,
  generateUUID,
  setQR,
  getQR,
  getLinks,
  getQRId,
  setQRLinks,
  getLinksByQRId,
  getUserId,
  getUser
};
