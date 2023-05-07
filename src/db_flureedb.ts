// // 导入类型
// import { Query } from '@fluree/query'; // 假设 @fluree/query 包提供了 Query 类型

// require('dotenv').config();
// import logger from './config/pino';
// import flureedb from './config/flureedb';

// const query: Query = {
//   select: ['*', 'username', { roles: ['*', 'id', 'doc', 'rules'] }, 'auth'],
//   from: ['_user/username', process.env.FLUREE_USERNAME as string],
// };

// flureedb
//   .query(query)
//   .then(async (response) => {
//     const body = await response.text();
//     const server = JSON.parse(body.slice(1, body.length - 1));
//     let roles = '';
//     const sep = ', ';
//     server.roles.forEach((role: { id: string }) => {
//       roles = roles + sep + role.id;
//     });
//     roles = roles.slice(sep.length, roles.length);
//     logger.info(
//       `FlureeDB connection established. (username=${server.username}, roles=[${roles}])`
//     );
//   })
//   .catch((error: Error) => {
//     logger.error('FlureeDB error: ', error);
//     process.exit(1);
//   });
