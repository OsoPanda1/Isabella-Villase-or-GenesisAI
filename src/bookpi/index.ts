export { buildBookPiEvent } from "./emitter";
export {
  canonicalJson,
  sha256Hex,
  sha3_512Hex,
  hmacSha256Hex,
  computeEventHash,
  computeEventIntegrity,
  eventCore,
  signEvent,
  verifyEventSignature,
  verifyChainLink,
  ZERO_HASH,
} from "./crypto";
export { createJsonlStorage } from "./storage-jsonl";
export { createPostgresStorage, BOOKPI_TABLE, type PostgresLike, type PostgresBookPiRow } from "./storage-postgres";
export { BOOKPI_PROTOCOL } from "./types";
export { InMemoryBookPiLedger, bookPiLedger, type BookPiEvent, type BookPiEventInput, type BookPiVerification } from "./ledger";
export {
  BOOKPI_CHUNK_SIZE,
  chunkBuffer,
  buildMerkleTree,
  generateMerkleProof,
  verifyChunkProof,
  generateZkCommitment,
  registerManuscript,
  type ChunkProof,
  type MerkleTree,
  type ChunkedBuffer,
  type ZkCommitment,
  type ManuscriptInput,
  type ManuscriptRegistration,
} from "./merkle";
export {
  BASIS_POINTS_DIVISOR,
  TOTAL_BASIS_POINTS,
  calculateBookPiRoyalties,
  settleRoyalties,
  sharesAreBalanced,
  type FederationShare,
  type RoyaltySplit,
  type RoyaltySettlement,
} from "./royalties";
export type {
  BookPiEventContext,
  BookPiEventMeta,
  BookPiEventRecord,
  BookPiEventSeed,
  BookPiHeader,
  BookPiStorage,
  HeHePContext,
  JsonValue,
} from "./types";