const eventModel = require('./event.model');
const reviewModel = require('../review/review.model');
const eventUtils = require('./event.utils');

async function findEventByInterested(userId) {
  try {
    const event = await eventModel.findEventByInterested(userId);
    if (!Array.isArray(event)) return [event];
    return event;
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function findEventById(id) {
  try {
    const event = await eventModel.findEventById(id);
    return event;
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function getAllEvents(select) {
  try {
    return await eventModel.getAllEvents(select);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function getOnGoingEvents(select) {
  try {
    let notclosed = getNotClosedEvents(select);
    if(!notclosed){
      return []
    }
    if (!Array.isArray(notclosed)) {
      notclosed = [notclosed];
    }
    return notclosed.filter(
      (event) =>
        event.start <= new Date().getTime() &&
        eventUtils.getEndtime(event.start, event.duration).getTime() >
          new Date.getTime()
    );
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function getNotClosedEvents(select) {
  try {
    let all = await eventModel.getStartedIn48hrsAgoEvents(select);
    if(!all){
      return []
    }
    if (!Array.isArray(all)) {
      all = [all];
    }
    return all.filter((event) => {
      return (
        eventUtils.getEndtime(event.start, event.duration).getTime() >=
        new Date().getTime()
      );
    });
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function registerEvent(eventId, userId) {
  try {
    await eventModel.registerEvent(eventId, userId);
    return await eventModel.findEventById(eventId);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function deleteEvent(eventId) {
  try {
    await eventModel.deleteEvent(eventId);
    return await eventModel.findEventById(eventId);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function getEventAllReviews(eventId) {
  try {
    const event = await eventModel.getEventAllReviews(eventId);
    return event.reviews;
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function getEventAllAttendees(eventId) {
  try {
    const event = await eventModel.getEventAllAttendees(eventId);
    return event.attendees;
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function getEventAllContacts(eventId) {
  try {
    const event = await eventModel.getEventAllContacts(eventId);
    return event.contacts;
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function getEventAllHosts(eventId) {
  try {
    const event = await eventModel.getEventAllHosts(eventId);
    return event.hosts;
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function getEventAllIntrested(eventId) {
  try {
    const event = await eventModel.getEventAllIntrested(eventId);
    return event.interested;
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function attendEvent(eventId, userId, attendCode) {
  try {
    const event = await eventModel.findEventAttendCodeById(eventId);
    if (event.attendCode !== attendCode) return {};
    await eventModel.registerEvent(eventId, userId);
    await eventModel.attendEvent(eventId, userId);
    return await eventModel.findEventById(eventId);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function reviewEvent(review) {
  try {
    const found = await reviewModel.findReviewByFromAndTarget(
      review.from,
      review.targetId
    );
    let update = review;
    if (review.comment === '') {
      update.comment = null;
    }
    if (found === null || found === undefined || found === []) {
      const result = await reviewModel.createReview(update);
      const reviewId = result.tempids.review[0];
      await updateEvent(update.targetId, { reviews: [reviewId] });
    } else {
      await reviewModel.updateReview(found['_id'], update);
    }
    return await eventModel.findEventById(update.targetId);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function updateEvent(id, event) {
  try {
    await eventModel.updateEvent(id, event);
    return await eventModel.findEventById(id);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

async function createEvent(data) {
  try {
    let event = data.event;
    console.log('data.lead::', data.lead);
    if (data.lead) {
      const leadResult = await eventModel.createLead(data.lead);
      const leadId = leadResult.tempids.lead[0];
      event.leads = [leadId];
    }
    event.attendCode = eventUtils.getRandomAttendCode();
    const result = await eventModel.createEvent(event);
    const eventId = result.tempids.event[0];
    return await eventModel.findEventById(eventId);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
}

module.exports = {
  createEvent,
  findEventById,
  updateEvent,
  registerEvent,
  attendEvent,
  reviewEvent,
  getAllEvents,
  getNotClosedEvents,
  getOnGoingEvents,
  deleteEvent,
  getEventAllReviews,
  getEventAllIntrested,
  getEventAllAttendees,
  getEventAllContacts,
  getEventAllHosts,
  findEventByInterested,
};
