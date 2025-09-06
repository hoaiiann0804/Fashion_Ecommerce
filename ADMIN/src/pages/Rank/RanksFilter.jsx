import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/Popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../components/ui/Command";

const RanksFilter = ({ searchTerm, setSearchTerm }) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="search"
              placeholder="Tìm kiếm rank..."
              className="pl-10 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Popover open={isCommandOpen} onOpenChange={setIsCommandOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Tìm nhanh
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Tìm rank..." />
                <CommandList>
                  <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
                  <CommandGroup heading="Rank phổ biến">
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                      Vàng
                    </CommandItem>
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                      Bạc
                    </CommandItem>
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                      Đồng
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};

export default RanksFilter;