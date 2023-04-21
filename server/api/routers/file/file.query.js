const COLLECTION_FILE = 'file';
const PREDICATE_FILETYPE = 'filetype';
const FILETYPE_VIDEO = 'video';

const SELECT_VIDEOS = [
  '*',
  'name',
  'isFolder',
  'status',
  'url',
  'filetype',
  'tags',
  'date',
  'files',
  'password'
];

function findAllVideos() {
  return {
    select: SELECT_VIDEOS,
    from: COLLECTION_FILE,
    where: `${COLLECTION_FILE}/${PREDICATE_FILETYPE} = \"${FILETYPE_VIDEO}\"`,
  };
}

function findVideoById(id) {
  return {
    select: SELECT_VIDEOS,
    from: Number(id),
  };
}

module.exports = {
  findAllVideos,
  findVideoById,
};
