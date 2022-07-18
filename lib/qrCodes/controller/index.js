const responses = require("../../helper/responses");
const service = require("../service");
const transformers = require("../../../transformers");

const createQR = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return responses.unauthenticated(res);
    const uuid = await service.generateUUID();
    const qrUrl = await service.generateQr(process.env.URL + "/" + uuid);
    if (qrUrl) {
      const qr = await service.setQR(userId, uuid, qrUrl);
      if (!qr)
        return responses.failedWithMessage("failed to generte new qr", res);
      const links = await service.getLinks(userId);
      console.log("links: ", links);
      if (!links)
        return responses.failedWithMessage("failed to get links of users", res);
      const result = await service.setQRLinks(qr.id, links);
      return result
        ? responses.successWithMessage(
            "the QR code successfully generated it",
            res,
            { QR: qr }
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

const getLinkByQR = async (req, res) => {
  try {
    const uuid = req?.params?.uuid;
    if (!uuid)
      return responses.failedWithMessage("Please define the account link", res);
    const qrCodeId = await service.getQRId(uuid);
    const userId = await service.getUserId(uuid);
    if (!qrCodeId || !userId) return responses.failedWithMessage("faild to scan qr", res);
    //const linksId = await service.getLinksId(uuid);
    const links = await service.getLinksByQRId(qrCodeId);
    if (links) {
      const userInfo = await service.getUser(userId);
      if (!userInfo) return responses.failedWithMessage("faild to scan qr", res);
      return responses.successWithMessage(
        "successflly get profile",
        res,
        {
          user: transformers.userTransformer(userInfo),
          links: transformers.linksTransformers(links)
        } 
        
      );
    }
    return responses.failedWithMessage("failed to find it ! ", res);
  } catch (err) {
    console.log("ERROR --->", err);
    return responses.serverError(res);
  }
};

const createQRLinks = async (req, res, next) => {
  try {
    const links = req.body.links;
    const userId = req.user.id;
    console.log("links", links);
    if (!Array.isArray(links) && links.length < 0)
      return responses.failedWithMessage("select the links please !", res);
    const uuid =  service.generateUUID(); // for the links
    const qrUrl = await service.generateQr(process.env.URL + "/" + uuid);
    if (qrUrl) {
      const qr = await service.setQR(userId, uuid, qrUrl);
      if (!qr) return responses.failedWithMessage("failed to create qr ", res);
      const result = await service.setQRLinks(qr.id, links);
      if (result) return responses.success("success", { QR: qr }, res);
      return responses.failedWithMessage("faid to ", {}, res);
    }
  } catch (err) {
    console.log("ERROR --->", err);
    return responses.serverError(res);
  }
};

const scanQR = async (req, res, next) => {
  try {

  } catch (err) {
    console.log("ERROR --->", err);
    return responses.serverError(res);
  }
};

module.exports = {
  createQR,
  scanQR,
  getLinkByQR,
  createQRLinks,
};
