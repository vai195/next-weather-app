"use client";

import Autoplay from "embla-carousel-autoplay";
import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
  thunder,
} from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import moment from "moment";
import { kelvinToFarenheit } from "@/app/utils/extraUtils";

function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();
  const { city, list } = fiveDayForecast;
  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const today = new Date();
  const todaytoString = today.toISOString().split("T")[0];

  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todaytoString);
    }
  );

  const { main: weatherDes } = forecast;

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
    <div
      className='air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex
  flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
      <div className='h-full flex gap-10 overflow-hidden'>
        {todaysForecast.length < 1 ? (
          <div className='flex justify-center items-center'>
            <Skeleton className='h-[12rem] w-full' />
          </div>
        ) : (
          <div className='w-full'>
            <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}>
              <CarouselContent>
                {todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className='flex flex-col gap-4 basis-[8.5rem] cursor-grab'>
                        <p className='text-grey-300'>
                          {moment(forecast.dt_txt).format("HH:mm")}
                        </p>
                        <p>{getWeatherIcon()}</p>
                        <p className='mt-2'>
                          {kelvinToFarenheit(forecast.main.temp)}°F
                        </p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;
