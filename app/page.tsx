import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import Proposals from "./Proposals";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-md border p-2">
        <Search />
        <Input type="search" placeholder="Search for proposals" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium">Proposals</span>
        <Proposals />
      </div>
    </div>
  );
}
