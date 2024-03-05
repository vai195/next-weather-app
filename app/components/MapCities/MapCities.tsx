"use client";

import { useGlobalContextUpdate } from "@/app/context/globalContext";
import defaultStates from "@/app/utils/defaultStates";
import React from "react";

function MapCities() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className='cities flex flex-col gap-3 flex-1'>
      <h2 className='flex items-center gap-2 font-medium'>
        Top Largest Cities
      </h2>
      <div className='flex flex-col gap-4 '>
        {defaultStates.map((city, index) => {
          return (
            <div
              key={index}
              className='border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none'
              onClick={() => {
                getClickedCityCords(city.lat, city.lon);
              }}>
              <p className='px-6 py-4 '>{city.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MapCities;
