import fetch from 'node-fetch'
import { getSinFromPublicKey, signTransaction } from '@fluree/crypto-utils'


function headers() {
    return {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.FLUREE_TOKEN,
    }
}

function expire() {
    return Date.now() + 1000
}

function fuel() {
    return 100000
}

function nonce() {
    return 1
}

function deps() {
    return null
}

function queryURI(ledger: string | undefined, baseurl: string | undefined) {
    return `${baseurl}/fdb/${ledger}/query`
}

function commandURI(ledger: string | undefined, baseurl: string | undefined) {
    return `${baseurl}/fdb/${ledger}/command`
}

function passwordURI(action: string | undefined, ledger: string | undefined, baseurl: string | undefined) {
    return `${baseurl}/fdb/${ledger}/pw/${action}`
}

async function query(params: object, ledger = process.env.FLUREE_DEFAULT_LEDGER, baseurl = process.env.FLUREE_BASE_URL) {
    return fetch(queryURI(ledger, baseurl), { method: 'POST', headers: headers(), body: JSON.stringify(params) })
}

async function transact(tx: object, ledger = process.env.FLUREE_DEFAULT_LEDGER, baseurl = process.env.FLUREE_BASE_URL) {
    const authId = getSinFromPublicKey(process.env.FLUREE_PUBLIC_KEY)
    const command = signTransaction(authId, ledger, expire(), fuel(), nonce(), process.env.FLUREE_PRIVATE_KEY, JSON.stringify(tx), deps())
    Object.assign(command, { "txid-only": false })
    return fetch(commandURI(ledger, baseurl), { method: 'POST', headers: headers(), body: JSON.stringify(command) })
}

async function pwAction(tx: object, action: string | undefined, ledger = process.env.FLUREE_DEFAULT_LEDGER, baseurl = process.env.FLUREE_BASE_URL) {
    return fetch(passwordURI(action, ledger, baseurl), { method: 'POST', headers: headers(), body: JSON.stringify(tx) })
}

function bodyParser(body) {
    let result: { data: Array<any> } = { data: [] }
    if (body === '[]' || body === '') return null
    else if (body.charAt(0) === '"' && body.charAt(body.length - 1) === '"') return body.slice(1, body.length - 1)
    else if (body.charAt(0) === '{' && body.charAt(body.length - 1) === '}') return JSON.parse(body)
    else result = JSON.parse(`{"data": ${body} }`)
    if (result.data.length > 1) {
        return result.data
    }
    else if (result.data.length === 1) {
        return result.data[0]
    }
    else {
        return body
    }
}

export default {
    query,
    transact,
    pwAction,
    bodyParser
}