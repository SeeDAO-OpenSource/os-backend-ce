const linkModel = require('../link/link.model');

module.exports = {
  createLinks: async (links) => {
    return await linkModel.createLinks(links);
  },

  
};
