export type ElectionData = [
  bigint[], // ids
  string[], // names
  string[], // descriptions
  bigint[] // proposalCounts
];

export type FormattedElection = {
  id: number;
  name: string;
  description: string;
  proposalCount: number;
};
