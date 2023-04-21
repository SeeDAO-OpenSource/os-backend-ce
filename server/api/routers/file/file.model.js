import fileQuery from './file.query';
import flureedb from '../../../config/flureedb';

async function findAllVideos() {
  const query = fileQuery.findAllVideos();
  const response = await flureedb.query(query);
  const body = await response.text();
  return flureedb.bodyParser(body);
}

async function findVideoById(id) {
    const query = fileQuery.findVideoById(id);
    const response = await flureedb.query(query);
    console.log('response::',response);
    const body = await response.text();
    return flureedb.bodyParser(body);
  }
  




module.exports = {
    findAllVideos,
    findVideoById
  };