export type ElectionsData = [
  bigint[], // ids
  string[], // names
  string[], // descriptions
  bigint[] // proposalCounts
];

export type ElectionData = [
  bigint, // id
  string, // name
  string, // description
  Proposal[], // proposals
  boolean // voted
];

export type FormattedElection = {
  id: number;
  name: string;
  description: string;
  proposalCount?: number;
  proposals?: Proposal[];
  voted: boolean;
};

export type Proposal = {
  id: number;
  name: string;
  votecount: number;
};
