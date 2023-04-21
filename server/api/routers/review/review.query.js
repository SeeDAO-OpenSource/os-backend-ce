const COLLECTION_REVIEW = 'review';

const SELECT_REVIEW_FULL = [
  '*',
  'tags',
  'comment',
  'targetCollection',
  'targetId',
  'max',
  'min',
  'value',
  { to: ['nickname', 'email', 'wallet'] },
  { from: ['nickname', 'email', 'wallet'] },
];

function findReviewByFromAndTarget(fromId, targetId) {
  return {
    select: SELECT_REVIEW_FULL,
    from: COLLECTION_REVIEW,
    where: `from = ${fromId} AND targetId = ${targetId}`,
  };
}

function createReview(review) {
  return [
    {
      _id: COLLECTION_REVIEW,
      ...review,
    },
  ];
}

function findReviewById(id) {
  return {
    select: SELECT_REVIEW_FULL,
    from: Number(id),
  };
}

function updateReview(id, review) {
  return [
    {
      _id: Number(id),
      ...review,
    },
  ];
}

module.exports = {
  findReviewByFromAndTarget,
  findReviewById,
  createReview,
  updateReview,
};
