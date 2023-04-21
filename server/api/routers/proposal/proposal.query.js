const COLLECTION_PROPOSAL = 'proposal';

const SELECT_PROPOSAL_LIST = [
  { proposer: ['nickname', 'wallet'] },
  'datetime',
  'title',
  'tags',
  'category',
  'type',
  'status',
  'sip',
  'main_poll',
]

const SELECT_PROPOSAL_FULL = [
  '*',
  { proposer: ['nickname', 'wallet'] },
  'datetime',
  'title',
  'content',
  'tags',
  'category',
  { links: ['title', 'url'] },
  'type',
  'status',
  'poll',
  'sip',
  'budget',
  'down_payment',
  'subpolls',
];

function createProposals(proposals) {
  let tx = [];
  proposals.forEach((proposal) => {
    tx.push({
      _id: COLLECTION_PROPOSAL,
      ...proposal,
    });
  });
  return tx;
}

function findProposalById(id) {
  return {
    select: SELECT_PROPOSAL_FULL,
    from: Number(id),
  };
}


function queryAllProposals(offset, limit){
  return {
    select: SELECT_PROPOSAL_LIST,
    from: COLLECTION_PROPOSAL,
    opts: {
      offset,
      limit,
      orderBy: ['DESC', 'datetime'],
    },
  };
}


function queryProposalsByCategory(category, offset, limit){
  return {
    select: SELECT_PROPOSAL_LIST,
    from: COLLECTION_PROPOSAL,
    where: `category = '${category}'`,
    opts: {
      offset,
      limit,
      orderBy: ['DESC', 'datetime'],
    },
  };
}

function findProposalIdByTitle(title){
  return {
    select: ['_id'],
    from: COLLECTION_PROPOSAL,
    where: `title = '${title}'`
  };
}

module.exports = {
  createProposals,
  queryProposalsByCategory,
  queryAllProposals,
  findProposalById,
  findProposalIdByTitle
};
