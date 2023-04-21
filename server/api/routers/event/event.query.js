const COLLECTION_EVENT = 'event';
const COLLECTION_USER = 'user';
const COLLECTION_LEAD = 'lead';

const SELECT_EVENT_USER = [
  'wechat',
  'google',
  { twitter: ['name', 'handle'] },
  { discord: ['name', 'id'] },
  'email',
  'wallet',
  'nickname',
  'telegram',
  { sysuser: [{ roles: ['id', 'doc'] }] },
];

const SELECT_EVENT_HOST = [
  { twitter: ['name', 'handle'] },
  { discord: ['name', 'id', 'avatar' ] },
  'email',
  'wallet',
  'nickname',
  'telegram',
  { sysuser: [{ roles: ['id', 'doc'] }] },
];

const SELECT_EVENT_FULL = [
  '*',
  'usersInvited',
  'rolesInvited',
  'type',
  'notifications',
  'attendCode',
  'status',
  'poap',
  { reviews: ['from'] },
  {
    leads: [
      '*',
      { channel: ['name', 'tags'] },
      'stage',
      {
        referrers: ['nickname', 'wallet', 'email', { discord: ['id', 'name'] }],
      },
    ],
  },
  { attendees: ['nickname', 'wallet', 'email'] },
  { interested: ['nickname', 'wallet', 'email'] },
  { contacts: ['nickname', 'wallet', 'email'] },
  { guests: ['nickname', 'wallet', 'email'] },
  { hosts: ['nickname', 'wallet', 'email', { discord: ['id', 'name'] }] },
  'links',
  'recordings',
  'password',
  'location',
  'where',
  'episode',
  'image',
  'season',
  'series',
  'duration',
  'start',
  'description',
  'title',
];

function createEvent(event) {
  return [
    {
      _id: COLLECTION_EVENT,
      ...event,
    },
  ];
}

function updateEvent(id, event) {
  return [
    {
      _id: Number(id),
      ...event,
    },
  ];
}

function registerEvent(eventId, userId) {
  return [
    {
      _id: Number(eventId),
      interested: [Number(userId)],
    },
  ];
}

function deleteEvent(eventId) {
  return [
    {
      _id: Number(eventId),
      _action: 'delete',
    },
  ];
}

function attendEvent(eventId, userId) {
  return [
    {
      _id: Number(eventId),
      attendees: [Number(userId)],
    },
  ];
}

function createLead(lead) {
  return [
    {
      _id: COLLECTION_LEAD,
      ...lead,
    },
  ];
}



function findEventByInterested(userId) {
  return {
    select: SELECT_EVENT_FULL,
    from: COLLECTION_EVENT,
    where: `event/interested = ${userId}`
  };
}


function findEventById(id) {
  return {
    select: SELECT_EVENT_FULL,
    from: Number(id),
  };
}

function getAllEvents(select) {
  return {
    select,
    from: COLLECTION_EVENT,
  };
}

function getEventAllReviews(eventId) {
  return {
    select: [
      { reviews: [{ from: ['nickname', 'wallet'] }, 'value', 'comment'] },
    ],
    from: Number(eventId),
  };
}

function getEventAllIntrested(eventId) {
  return {
    select: [{ interested: SELECT_EVENT_USER }],
    from: Number(eventId),
  };
}

function getEventAllAttendees(eventId) {
  return {
    select: [{ attendees: SELECT_EVENT_USER }],
    from: Number(eventId),
  };
}

function getEventAllContacts(eventId) {
  return {
    select: [{ contacts: SELECT_EVENT_HOST }],
    from: Number(eventId),
  };
}

function getEventAllHosts(eventId) {
  return {
    select: [{ hosts: SELECT_EVENT_HOST }],
    from: Number(eventId),
  };
}

function getStartedIn48hrsAgoEvents(select, start) {
  return {
    select,
    from: COLLECTION_EVENT,
    where: `start > ${start.getTime() - 48 * 60 * 60 * 1000}`,
  };
}

function findEventAttendCodeById(id) {
  return {
    select: ['attendCode'],
    from: Number(id),
  };
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
