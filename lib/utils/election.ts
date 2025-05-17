import { ElectionData, FormattedElection } from "./types";

const formatElections = (elections: ElectionData): FormattedElection[] => {
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

export default formatElections;
