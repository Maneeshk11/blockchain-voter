import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import Elections from "./Elections";
import AddElection from "./AddElection";
import { ElectionContextProvider } from "./ElectionContextProvider";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-md border p-2">
        <Search />
        <Input type="search" placeholder="Search for elections" />
      </div>

      <ElectionContextProvider>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <span className="text-lg font-medium">Elections</span>
            <AddElection />
          </div>
          <Elections />
        </div>
      </ElectionContextProvider>
    </div>
  );
}
