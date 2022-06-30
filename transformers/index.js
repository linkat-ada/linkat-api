const userTransformer = (user) => {
    delete user['dataValues']['password']
    delete user['dataValues']['deletedAt']
    delete user['dataValues']['createdAt']
    delete user['dataValues']['updatedAt']
    return user
}


const linkTransformer = (link) => {
    delete link['dataValues']['deletedAt']
    delete link['dataValues']['createdAt']
    delete link['dataValues']['updatedAt']
    return link
}

module.exports = {
    userTransformer,
    linkTransformer
}