/**
 * SeeDao-OS-API
 * SeeDao-OS-API description
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { DotbitControllerConsumeKeyRequest } from '../types';
import { DotbitControllerMintRequest } from '../types';
import { DotbitControllerMintSignMsgRequest } from '../types';
import { InsertSGNMintRecordDto } from '../types';
import { SGNMintRecordModel } from '../types';
import { SubDIDCdKeyDto } from '../types';
import { SubDIDMintRecordDto } from '../types';
/**
 * DotbitApi - axios parameter creator
 * @export
 */
export declare const DotbitApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     *
     * @summary Mint a SubDID
     * @param {string} address
     * @param {string} subDID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerCheckSubDID: (address: string, subDID: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary Consume a SubDID CD key
     * @param {DotbitControllerConsumeKeyRequest} dotbitControllerConsumeKeyRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerConsumeKey: (dotbitControllerConsumeKeyRequest: DotbitControllerConsumeKeyRequest, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary generate cdkeys
     * @param {number} num
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerGenerate: (num: number, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary Get cdkey
     * @param {string} key
     * @param {boolean} all
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerGetCdkey: (key: string, all: boolean, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary Get SubDIDMintRecord by address
     * @param {string} address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerGetSubDIDMintRecord: (address: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary Check if a token has been minted
     * @param {number} tokenId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerHasMinted: (tokenId: number, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary Insert a new SGN Mint Record
     * @param {InsertSGNMintRecordDto} insertSGNMintRecordDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerInsertSgnMintRecord: (insertSGNMintRecordDto: InsertSGNMintRecordDto, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary Mint a SubDID
     * @param {DotbitControllerMintRequest} dotbitControllerMintRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerMint: (dotbitControllerMintRequest: DotbitControllerMintRequest, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary Sign Message
     * @param {DotbitControllerMintSignMsgRequest} dotbitControllerMintSignMsgRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerMintSignMsg: (dotbitControllerMintSignMsgRequest: DotbitControllerMintSignMsgRequest, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary Query a SGN Mint Record by tokenId
     * @param {number} tokenId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerQuerySgnMintRecord: (tokenId: number, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @param {string} address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerVerify: (address: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    /**
     *
     * @summary can-mint
     * @param {string} address
     * @param {string} cdkey
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerVerifyCanMintSubDID: (address: string, cdkey: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
/**
 * DotbitApi - functional programming interface
 * @export
 */
export declare const DotbitApiFp: (configuration?: Configuration) => {
    /**
     *
     * @summary Mint a SubDID
     * @param {string} address
     * @param {string} subDID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerCheckSubDID(address: string, subDID: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    /**
     *
     * @summary Consume a SubDID CD key
     * @param {DotbitControllerConsumeKeyRequest} dotbitControllerConsumeKeyRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerConsumeKey(dotbitControllerConsumeKeyRequest: DotbitControllerConsumeKeyRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    /**
     *
     * @summary generate cdkeys
     * @param {number} num
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerGenerate(num: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    /**
     *
     * @summary Get cdkey
     * @param {string} key
     * @param {boolean} all
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerGetCdkey(key: string, all: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SubDIDCdKeyDto>>;
    /**
     *
     * @summary Get SubDIDMintRecord by address
     * @param {string} address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerGetSubDIDMintRecord(address: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SubDIDMintRecordDto>>;
    /**
     *
     * @summary Check if a token has been minted
     * @param {number} tokenId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerHasMinted(tokenId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>>;
    /**
     *
     * @summary Insert a new SGN Mint Record
     * @param {InsertSGNMintRecordDto} insertSGNMintRecordDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerInsertSgnMintRecord(insertSGNMintRecordDto: InsertSGNMintRecordDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    /**
     *
     * @summary Mint a SubDID
     * @param {DotbitControllerMintRequest} dotbitControllerMintRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerMint(dotbitControllerMintRequest: DotbitControllerMintRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    /**
     *
     * @summary Sign Message
     * @param {DotbitControllerMintSignMsgRequest} dotbitControllerMintSignMsgRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerMintSignMsg(dotbitControllerMintSignMsgRequest: DotbitControllerMintSignMsgRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    /**
     *
     * @summary Query a SGN Mint Record by tokenId
     * @param {number} tokenId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerQuerySgnMintRecord(tokenId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SGNMintRecordModel>>;
    /**
     *
     * @param {string} address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerVerify(address: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    /**
     *
     * @summary can-mint
     * @param {string} address
     * @param {string} cdkey
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerVerifyCanMintSubDID(address: string, cdkey: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
/**
 * DotbitApi - factory interface
 * @export
 */
export declare const DotbitApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     *
     * @summary Mint a SubDID
     * @param {string} address
     * @param {string} subDID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerCheckSubDID(address: string, subDID: string, options?: any): AxiosPromise<void>;
    /**
     *
     * @summary Consume a SubDID CD key
     * @param {DotbitControllerConsumeKeyRequest} dotbitControllerConsumeKeyRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerConsumeKey(dotbitControllerConsumeKeyRequest: DotbitControllerConsumeKeyRequest, options?: any): AxiosPromise<void>;
    /**
     *
     * @summary generate cdkeys
     * @param {number} num
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerGenerate(num: number, options?: any): AxiosPromise<void>;
    /**
     *
     * @summary Get cdkey
     * @param {string} key
     * @param {boolean} all
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerGetCdkey(key: string, all: boolean, options?: any): AxiosPromise<SubDIDCdKeyDto>;
    /**
     *
     * @summary Get SubDIDMintRecord by address
     * @param {string} address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerGetSubDIDMintRecord(address: string, options?: any): AxiosPromise<SubDIDMintRecordDto>;
    /**
     *
     * @summary Check if a token has been minted
     * @param {number} tokenId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerHasMinted(tokenId: number, options?: any): AxiosPromise<boolean>;
    /**
     *
     * @summary Insert a new SGN Mint Record
     * @param {InsertSGNMintRecordDto} insertSGNMintRecordDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerInsertSgnMintRecord(insertSGNMintRecordDto: InsertSGNMintRecordDto, options?: any): AxiosPromise<void>;
    /**
     *
     * @summary Mint a SubDID
     * @param {DotbitControllerMintRequest} dotbitControllerMintRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerMint(dotbitControllerMintRequest: DotbitControllerMintRequest, options?: any): AxiosPromise<void>;
    /**
     *
     * @summary Sign Message
     * @param {DotbitControllerMintSignMsgRequest} dotbitControllerMintSignMsgRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerMintSignMsg(dotbitControllerMintSignMsgRequest: DotbitControllerMintSignMsgRequest, options?: any): AxiosPromise<void>;
    /**
     *
     * @summary Query a SGN Mint Record by tokenId
     * @param {number} tokenId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerQuerySgnMintRecord(tokenId: number, options?: any): AxiosPromise<SGNMintRecordModel>;
    /**
     *
     * @param {string} address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerVerify(address: string, options?: any): AxiosPromise<void>;
    /**
     *
     * @summary can-mint
     * @param {string} address
     * @param {string} cdkey
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dotbitControllerVerifyCanMintSubDID(address: string, cdkey: string, options?: any): AxiosPromise<void>;
};
/**
 * DotbitApi - object-oriented interface
 * @export
 * @class DotbitApi
 * @extends {BaseAPI}
 */
export declare class DotbitApi extends BaseAPI {
    /**
     *
     * @summary Mint a SubDID
     * @param {string} address
     * @param {string} subDID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerCheckSubDID(address: string, subDID: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    /**
     *
     * @summary Consume a SubDID CD key
     * @param {DotbitControllerConsumeKeyRequest} dotbitControllerConsumeKeyRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerConsumeKey(dotbitControllerConsumeKeyRequest: DotbitControllerConsumeKeyRequest, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    /**
     *
     * @summary generate cdkeys
     * @param {number} num
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerGenerate(num: number, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    /**
     *
     * @summary Get cdkey
     * @param {string} key
     * @param {boolean} all
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerGetCdkey(key: string, all: boolean, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<SubDIDCdKeyDto, any>>;
    /**
     *
     * @summary Get SubDIDMintRecord by address
     * @param {string} address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerGetSubDIDMintRecord(address: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<SubDIDMintRecordDto, any>>;
    /**
     *
     * @summary Check if a token has been minted
     * @param {number} tokenId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerHasMinted(tokenId: number, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<boolean, any>>;
    /**
     *
     * @summary Insert a new SGN Mint Record
     * @param {InsertSGNMintRecordDto} insertSGNMintRecordDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerInsertSgnMintRecord(insertSGNMintRecordDto: InsertSGNMintRecordDto, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    /**
     *
     * @summary Mint a SubDID
     * @param {DotbitControllerMintRequest} dotbitControllerMintRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerMint(dotbitControllerMintRequest: DotbitControllerMintRequest, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    /**
     *
     * @summary Sign Message
     * @param {DotbitControllerMintSignMsgRequest} dotbitControllerMintSignMsgRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerMintSignMsg(dotbitControllerMintSignMsgRequest: DotbitControllerMintSignMsgRequest, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    /**
     *
     * @summary Query a SGN Mint Record by tokenId
     * @param {number} tokenId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerQuerySgnMintRecord(tokenId: number, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<SGNMintRecordModel, any>>;
    /**
     *
     * @param {string} address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerVerify(address: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    /**
     *
     * @summary can-mint
     * @param {string} address
     * @param {string} cdkey
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DotbitApi
     */
    dotbitControllerVerifyCanMintSubDID(address: string, cdkey: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
}
