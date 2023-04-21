const fileModel = require('../file/file.model');

module.exports = {
  getAllVideos: async () => {
    const videos = await fileModel.findAllVideos();
    videos.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return videos;
  },

  findVideo: async (data) => {
    console.log('data::', data)
    return await fileModel.findVideoById(data.videoId);
  },

  
};
