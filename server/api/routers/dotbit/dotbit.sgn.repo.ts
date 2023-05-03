import flureedb from "../../../config/flureedb"

export interface SGNMintRecord {
  address: string,
  tokenId: number,
  subDID: string,
  timestamp: number,
  contract: string,
}

const SGNMintRecordKey = 'sgn_mint_records'
const SGNMintRecordSchema = [
  {
    "_id": "_collection",
    "name": SGNMintRecordKey
  },
  {
    "_id": "_predicate",
    "name": SGNMintRecordKey + "/address",
    "type": "string"
  },
  {
    "_id": "_predicate",
    "name": SGNMintRecordKey + "/tokenId",
    "type": "instant",
    "unique": true,
    "index": true
  },
  {
    "_id": "_predicate",
    "name": SGNMintRecordKey + "/contract",
    "type": "string",
    "index": true
  },
  {
    "_id": "_predicate",
    "name": SGNMintRecordKey + "/timestamp",
    "type": "instant",
    "index": true
  },
  {
    "_id": "_predicate",
    "name": SGNMintRecordKey + "/subDID",
    "type": "string",
    "index": true
  }
]

function sgnMintCheckQuery(tokenId: bigint) {
  const queryMint = {
    select: ['*', 'address', 'tokenId', 'timestamp'],
    from: SGNMintRecordKey,
    where: `tokenId = ${tokenId.toString()}`,
  }
  return queryMint
}

export async function sgnHasMinted(tokenId: bigint): Promise<boolean> {
  const queryMint = sgnMintCheckQuery(tokenId)
  const response = await flureedb.query(queryMint)
  const result = await response.json();
  return result && result.length > 0
}

export async function insertSgnMintRecord(record: SGNMintRecord) {
  const createSql = [
    {
      _id: SGNMintRecordKey,
      ...record,
    },
  ]
  const response = await flureedb.transact(createSql)
  const result = await response.json();
  if (result.status == 200) {
    console.log('insertSgnMintRecord success')
  } else {
    console.warn(result)
  }
}

