const responses = require("../../helper/responses");
const service = require("../service");
var models = require("../../../models")
const sequelize = require("sequelize");
const transformers = require("../../../transformers/index");
const setLink = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const { linkTypeId, url } = req?.body;
    if (!userId) return responses.unauthenticated(res);
    if (!linkTypeId || !url)
      return responses.failedWithMessage(
        "please Enter the link & linkType",
        res
      );
    const resultQuery = await models.links.findAll({
      where: {
        userId
      },
      attributes: [[sequelize.fn("max", sequelize.col("order")), "maxOrder"]],
    });
    let order = resultQuery[0].dataValues.maxOrder + 1;
    console.log(order)
    const result = await service.createLink({
      userId,
      linkTypeId,
      url,
      order
    });
    if (result) {
      const links = await service.getLinks({userId});
      if(Array.isArray(links) && links?.length > 0)
      return responses.successWithMessage("link add it successfully", res, links); 
      else return responses.failedWithMessage("this link already exists.", res);
    }
    return responses.failedWithMessage("this link already exists.", res);
  } catch (err) {
    console.log("Error -->", err);
    responses.serverError(res);
  }
};

const getLinks = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) return responses.unauthenticated(res);
    const result = await service.getLinks({ userId });
    if (result)
      return responses.success(
        "successfully get user links", result, res
      );
    return responses.failedWithMessage("filed get user links", res);
  } catch (err) {
    console.log("Error -->", err);
    responses.serverError(res);
  }
};

const deleteLink = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) return responses.unauthenticated(res);
    const linkId = req?.params?.id;
    if (!linkId)
      return responses.failedWithMessage("select the link please !", res);
    const result = await service.deleteLink({ userId, linkId });
    if (result) {
      const links = await service.getLinks({ userId });
      if(links)
      return responses.successWithMessage(
        "successfully delet link",
        res,
        links
      );
    }
    return responses.failedWithMessage("link is already deleted", res);
  } catch (err) {
    console.log("Error -->", err);
    responses.serverError(res);
  }
};

const updateLink = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) return responses.unauthenticated(res);
    const linkId = req?.params?.id;
    if (!linkId)
      return responses.failedWithMessage("select the link  please !", res);
    const { url, linkTypeId } = req?.body;
    const result = await service.updateLink({
      userId,
      linkId,
      url,
      linkTypeId,
    });
    if (result){
      const links = await service.getLinks({userId})
      if(links)  return responses.successWithMessage("successfully edit link", res, links)
      else return responses.failedWithMessage("Falied to edit link", res);
    }
      
    return responses.failedWithMessage("Falied to edit link", res);
  } catch (err) {
    console.log("Error -->", err);
    responses.serverError(res);
  }
};

const reorderLinks = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const newOrder = req?.body?.newOrder;
    if (!Array.isArray(newOrder) || newOrder?.length < 0)
      return responses.failedWithMessage("Falied to reorder links", res);
    const result = await service.reorderLinks({ userId, newOrder });
    let links = null;
    if(result) links = await service.getLinks({userId});
    if (links)
      return responses.successWithMessage(
        "successfully reorder the links",
        res,
        links
      );
    return responses.failedWithMessage("Falied to edit link", res);
  } catch (err) {
    console.log("Error -->", err);
    responses.serverError(res);
  }
};

const getLinkTypes = async (req, res, next) => {
  try {
    const linksTypes = await service.getLinkTypes();
    if(linksTypes) return responses.success("successfully get link Types", linksTypes, res);
    return responses.failedWithMessage("failed to get link Types", res)
  } catch(err) {
    console.log("Error -->", err);
    return responses.serverError(res);
  } 
}

const getLink = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    const id = req?.params?.id
    if(!id) return responses.failedWithMessage("failed to get link", res) 
    const link = await service.getLink({userId, id});
    if(link) return responses.successWithMessage("sucessfully get link ",res, link)
    return responses.failedWithMessage("failed to get link", res) 
  } catch(err) {
    console.log("Error -->", err);
    return responses.serverError(res);
  }
}

module.exports = {
  setLink,
  getLinks,
  deleteLink,
  updateLink,
  reorderLinks,
  getLinkTypes,
  getLink
};
