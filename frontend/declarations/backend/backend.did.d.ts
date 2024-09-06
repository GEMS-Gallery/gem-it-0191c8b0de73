import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Gem {
  'id' : bigint,
  'url' : string,
  'upvotes' : bigint,
  'title' : string,
  'description' : [] | [string],
  'timestamp' : bigint,
  'downvotes' : bigint,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export interface _SERVICE {
  'addGem' : ActorMethod<[string, [] | [string], string], Result_1>,
  'downvoteGem' : ActorMethod<[bigint], Result>,
  'getGem' : ActorMethod<[bigint], [] | [Gem]>,
  'getGems' : ActorMethod<[], Array<Gem>>,
  'upvoteGem' : ActorMethod<[bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
