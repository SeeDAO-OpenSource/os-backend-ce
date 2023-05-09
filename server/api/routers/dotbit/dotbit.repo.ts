import flureedb from "../../../config/flureedb"

//#region repo
const MintRecordCollectionName = 'subdid_mint_records'

export interface subDIDMintRecord {
  address: string,
  subDID: string,
  timestamp: number,
  verifier?: string,
}

const schema = [
  {
    "_id": "_collection",
    "name": MintRecordCollectionName
  },
  {
    "_id": "_predicate",
    "name": MintRecordCollectionName + "/address",
    "type": "string",
    "unique": true,
    "index": true
  },
  {
    "_id": "_predicate",
    "name": MintRecordCollectionName + "/subDID",
    "type": "string",
  },
  {
    "_id": "_predicate",
    "name": MintRecordCollectionName + "/timestamp",
    "type": "instant",
  },
  {
    "_id": "_predicate",
    "name": MintRecordCollectionName + "/verifier",
    "type": "string",
  }
]

export async function getMintRecords(address: string): Promise<subDIDMintRecord | undefined> {
  const query = {
    select: ['subDID'],
    from: MintRecordCollectionName,
    where: `address = "${address}"`,
  }
  const response = await flureedb.query(query)
  const result = await response.json()
  if (result.length === 0) {
    return undefined
  }
  return result[0]
}

export async function insertRecord(record: subDIDMintRecord) {
  const creator = [
    {
      _id: MintRecordCollectionName,
      ...record
    }
  ]
  const response = await flureedb.transact(creator)
  const result = await response.json();
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`insertMany failed: ${result.message}`)
  }
}

//#endregion