"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { unixToTime } from "@/app/utils/extraUtils";
import { sunset } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";

const Sunset = () => {
  const { forecast } = useGlobalContext();
  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const times = forecast?.sys.sunset;
  const timezone = forecast?.timezone;
  const sunsetTime = unixToTime(times, timezone);
  const sunriseTime = unixToTime(forecast?.sys?.sunrise, timezone);

  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>{sunset}Sunset</h2>
        <p className='pt-4 text-2xl'>{sunsetTime}</p>
      </div>

      <p className='text-sm'>Sunrise: {sunriseTime}</p>
    </div>
  );
};

export default Sunset;
