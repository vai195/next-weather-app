"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

const Sunset = () => {
  const { forecast } = useGlobalContext();
  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const times = forecast?.sys.sunset;
  const timezone = forecast?.timezone;
  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      Sunset
    </div>
  );
};

export default Sunset;
