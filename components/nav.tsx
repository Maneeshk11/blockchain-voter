import { useConnectors, useDisconnect } from "wagmi";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAccount } from "wagmi";
import { LogOut } from "lucide-react";
import { formatEthereumAddress } from "@/lib/utils/address";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
const Nav = () => {
  const connectors = useConnectors();
  const account = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <nav className="flex items-center justify-between py-4">
      <span className="text-2xl font-medium">Voter.com</span>

      {account.address ? (
        <div className="flex items-center gap-2">
          <div className="text-center bg-muted rounded-full py-2 px-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-default">
                    {formatEthereumAddress(account.address)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{account.address}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button
            className="rounded-full cursor-pointer"
            onClick={() => disconnect()}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Connect</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {connectors.map((connector) => (
              <DropdownMenuItem
                key={connector.id}
                onClick={() =>
                  connector.connect({
                    chainId: 11155111,
                  })
                }
              >
                <span>{connector.icon}</span>
                {connector.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default Nav;
