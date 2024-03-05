"use client";

import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { commandIcon } from "@/app/utils/icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const SearchDialog = () => {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  const [openSearchDialog, setSearchDialog] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "f") {
        event.preventDefault();
        setSearchDialog((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className='search-btn'>
      <Dialog open={openSearchDialog} onOpenChange={setSearchDialog}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200'>
            <p className='text-sm text-muted-foreground'>Search Here...</p>
            <div className='command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2'>
              {commandIcon}
              <span className='text-[9px]'>F</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className='p-0'>
          <Command className='rounded-lg border shadow-sm'>
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder='Search for a City'></CommandInput>
            <ul className='px-3 pb-2'>
              <p className='p-2 text-sm text-muted-foreground'>Suggestions</p>
              {geoCodedList?.length === 0 ||
                (!geoCodedList && <p>No Results</p>)}

              {geoCodedList &&
                geoCodedList.map(
                  (
                    item: {
                      name: string;
                      country: string;
                      state: string;
                      lat: number;
                      lon: number;
                    },
                    index: number
                  ) => {
                    const { country, state, name } = item;
                    return (
                      <li
                        key={index}
                        className='py-3 px-2 text-sm rounded-sm cursor-default hover:bg-accent'
                        onClick={() => {
                          getClickedCoords(item.lat, item.lon);
                        }}>
                        <p className='text'>
                          {name}, {state && state + ","} {country}
                        </p>
                      </li>
                    );
                  }
                )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
