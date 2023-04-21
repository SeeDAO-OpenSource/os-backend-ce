const fetch = require('node-fetch');
const config = require('../../../constant/metaforo');

async function get(endpoint, json = undefined) {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'GET',
      headers: config.API_HEADERS_DEFAULT,
    };
    if (json) {
      options = {
        body: JSON.stringify(json),
        ...options,
      };
    }
    fetch(`${config.METAFORO_BASE_URL}${endpoint}`, options)
      .then(async (response) => {
        const body = JSON.parse(await response.text());
        resolve(body.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getUserEndpoint(userId) {
  return `${config.API_ENDPOINT.PROFILE}/${userId}`;
}

function getCategoryEndpoint(categoryId) {
  return `${config.API_ENDPOINT.THREADS}?page=1&per_page=${config.POSTS_MAX}&filter=category&category_index_id=${categoryId}&sort=created_at&group_name=${config.GROUP_NAME}`;
}

async function fetchUser(id) {
  try {
    const url = getUserEndpoint(id);
    const ret = await get(url);
    return ret.user;
  } catch (error) {
    return error;
  }
}

async function fetchMetaforoProposalsByCategory(categoryId) {
  try {
    const url = getCategoryEndpoint(categoryId);
    const ret = await get(url);
    return ret.threads;
  } catch (error) {
    return error;
  }
}

module.exports = {
  fetchMetaforoProposalsByCategory,
  fetchUser,
};
