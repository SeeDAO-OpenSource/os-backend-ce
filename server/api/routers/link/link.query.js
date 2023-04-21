const COLLECTION_LINK = 'link';

const SELECT_LINK_FULL = [
  '*',
  'title',
  'url',
  'roles',
  'tags',
];

function createLinks(links) {
  let query = []
  links.forEach((link)=>{
      query.push({
          _id: COLLECTION_LINK,
          ...link,
        },)
  })
return query;
}

module.exports = {
  createLinks,
};
