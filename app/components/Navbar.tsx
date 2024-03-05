"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { github } from "../utils/icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className='w-full py-4 flex items-center justify-between'>
      <div className='left'></div>
      <div className='search-div flex shrink-0 w-full gap-2 sm:w-fit'>
        <SearchDialog />
        <div className='btns flex items-center gap-2'>
          <ThemeDropdown />
          <Button
            className='source-code flex items-center gag-2'
            onClick={() => {
              router.push("https://github.com");
            }}>
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
