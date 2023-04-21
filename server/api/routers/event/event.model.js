import eventQuery from './event.query';
import flureedb from '../../../config/flureedb';

async function createEvent(event) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.createEvent(event);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}
async function updateEvent(id, event) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.updateEvent(id, event);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function registerEvent(eventId, userId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.registerEvent(eventId, userId);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function deleteEvent(eventId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.deleteEvent(eventId);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function getEventAllReviews(eventId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.getEventAllReviews(eventId);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function getEventAllAttendees(eventId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.getEventAllAttendees(eventId);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function getEventAllContacts(eventId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.getEventAllContacts(eventId);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}
async function getEventAllHosts(eventId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.getEventAllHosts(eventId);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function getEventAllIntrested(eventId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.getEventAllIntrested(eventId);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function attendEvent(eventId, userId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.attendEvent(eventId, userId);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function createLead(event) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.createLead(event);
    flureedb
      .transact(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function findEventByInterested(userId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.findEventByInterested(userId);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function findEventById(eventId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.findEventById(eventId);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function getAllEvents(select) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.getAllEvents(select);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function getStartedIn48hrsAgoEvents(select) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.getStartedIn48hrsAgoEvents(select, new Date());
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

async function findEventAttendCodeById(eventId) {
  return new Promise((resolve, reject) => {
    const tx = eventQuery.findEventAttendCodeById(eventId);
    flureedb
      .query(tx)
      .then(async (response) => {
        const body = await response.text();
        resolve(flureedb.bodyParser(body));
      })
      .catch((error) => {
        console.log('error:', error);
        reject(error);
      });
  });
}

module.exports = {
  createEvent,
  createLead,
  findEventById,
  updateEvent,
  registerEvent,
  attendEvent,
  findEventAttendCodeById,
  getAllEvents,
  getStartedIn48hrsAgoEvents,
  deleteEvent,
  getEventAllReviews,
  getEventAllIntrested,
  getEventAllAttendees,
  getEventAllContacts,
  getEventAllHosts,
  findEventByInterested,
};
