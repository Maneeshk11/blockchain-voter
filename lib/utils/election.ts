import { ElectionData, ElectionsData, FormattedElection } from "./types";

const formatElections = (elections: ElectionsData): FormattedElection[] => {
  const typedElections = elections
    ? {
        ids: elections[0] || [],
        names: elections[1] || [],
        descriptions: elections[2] || [],
        proposalCounts: elections[3] || [],
      }
    : { ids: [], names: [], descriptions: [], proposalCounts: [] };

  // Create a formatted array of elections for easier rendering
  const formattedElections: FormattedElection[] = typedElections.ids.map(
    (id: bigint, index: number) => ({
      id: Number(id),
      name: typedElections.names[index],
      description: typedElections.descriptions[index],
      proposalCount: Number(typedElections.proposalCounts[index]),
    })
  );

  return formattedElections;
};

const formatElection = (election: ElectionData): FormattedElection => {
  return {
    id: Number(election[0]),
    name: election[1],
    description: election[2],
    proposals: election[3].map((proposal) => ({
      id: Number(proposal.id),
      name: proposal.name,
      votecount: Number(proposal.votecount),
    })),
    proposalCount: Number(election[3].length),
  };
};

export { formatElections, formatElection };
