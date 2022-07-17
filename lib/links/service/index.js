const { Op } = require("sequelize");
const models = require("../../../models");
const transformer = require("../../../transformers");

const createLink = async ({ userId, linkTypeId, url, order }) => {
  try {
    const [link, created] = await models.links.findOrCreate({
      where: {
        [Op.and]: [{ userId }, { linkTypeId }, { url }],
      },
      defaults: {
        userId,
        linkTypeId,
        url,
        order,
      },
    });
    if (!created) return null;
    return link;
  } catch (err) {
    console.log("Error -->", err);
    throw new Error(err);
  }
};

const getLinks = async ({ userId }) => {
  try {
    const links = await models.links.findAll({
      where: {
        [Op.and]: [{ userId }, { deletedAt: { [Op.eq]: null } }],
      },
      include: [
        {
          model: models.linktypes,
        },
      ],
    });
    return links.map((link) => transformer.linkTransformer(link));
  } catch (err) {
    console.log("Error -->", err);
    throw new Error(err);
  }
};

const getLink = async ({ userId, id }) => {
  try {
    const link = await models.links.findOne({
      where: {
        [Op.and]: [{ userId }, { id }],
      },
    });
    return link;
  } catch (err) {
    console.log("Error -->", err);
    throw new Error(e);
  }
};

const deleteLink = async ({ userId, linkId: id }) => {
  try {
    const currentLink = await getLink({ userId, id });
    if (currentLink.deletedAt) return null;
    const link = await models.links.update(
      {
        deletedAt: new Date(),
      },
      {
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      }
    );
    return link;
  } catch (err) {
    console.log("Error -->", err);
    throw new Error(err);
  }
};

const updateLink = async ({ userId, linkId: id, url, linkTypeId }) => {
  try {
    const currentLink = await getLink({ userId, id });
    if (!currentLink) return null;
    if (currentLink.deleteLink) return null;
    if (currentLink.linkTypeId == linkTypeId && currentLink.url == url)
      return null;
    const link = await models.links.update(
      {
        linkTypeId,
        url,
      },
      {
        where: {
          [Op.and]: [{ userId }, { id }],
        },
      }
    );
    return link;
  } catch (err) {
    console.log("Error -->", err);
    throw new Error(err);
  }
};

const reorderLinks = async ({ userId, newOrder }) => {
  try {
    console.log(newOrder);
    let currentLinks = await models.links.findAll({
      where: {
        [Op.and]: [{ userId }, { deletedAt: { [Op.eq]: null } }],
      },
    });
    for (var i = 0; i < currentLinks.length; i++) {
      currentLinks[i].order = newOrder[i];
      currentLinks[i].save();
    }
    console.log("reorder", currentLinks);
    return currentLinks;
  } catch (err) {
    console.log("Error -->", err);
    throw new Error(err);
  }
};

const getLinkTypes = async () => {
  try {
    const linkTypes = await models.linktypes.findAll({
      attributes: ["id", "type", "icon"],
    });
    if(Array.isArray(linkTypes) && linkTypes?.length > 0)
      return linkTypes;
    return null  
  } catch (err) {
    console.log("Error -->", err);
    throw new Error(err);
  }
};


module.exports = {
  createLink,
  getLinks,
  deleteLink,
  updateLink,
  reorderLinks,
  getLinkTypes,
  getLink
};
