/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { kelvinToFarenheit } from "@/app/utils/extraUtils";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
  thunder,
} from "@/app/utils/icons";
import moment from "moment";

const Temperature = () => {
  const { forecast } = useGlobalContext();
  const { timezone, name, main, weather } = forecast;

  const [localtime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    //update time
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      //format
      const formatTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setLocalTime(formatTime);
      setCurrentDay(day);
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);
  // console.log(localtime);
  // console.log(currentDay);
  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const temp = kelvinToFarenheit(main?.temp);
  const mintemp = kelvinToFarenheit(main?.temp_min);
  const maxtemp = kelvinToFarenheit(main?.temp_max);
  const { main: weatherDes, description } = weather[0];

  const getWeatherIcon = () => {
    switch (weatherDes) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      case "ThunderStorm":
        return thunder;
      default:
        return clearSky;
    }
  };

  return (
    <div className='pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <p className='flex justify-between items-center'>
        <span className='font-medium'>{currentDay}</span>
        <span className='font-medium'>{localtime}</span>
      </p>
      <p className='pt-2 font-bold flex gap-1'>
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className='py-10 text-9xl font-bold self-center'>{temp}°</p>
      <div>
        <div>
          <span>{getWeatherIcon()}</span>
          <p className='pt-2 capitalize text-lg font-medium'>{description}</p>
        </div>
        <p className='flex items-center gap-2'>
          <span>Low: {mintemp}°</span>
          <span>High: {maxtemp}°</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;
