"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { sun } from "@/app/utils/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { UvProgress } from "../UvProgress/UvProgress";

function UvIndex() {
  const { uvIndex } = useGlobalContext();
  console.log(uvIndex);
  if (
    !uvIndex ||
    !uvIndex.daily ||
    !uvIndex.daily === undefined ||
    !uvIndex.daily.uv_index_max ||
    !uvIndex.daily.uv_index_clear_sky_max
  ) {
    return <Skeleton className='h-[12rem] w-full' />;
  }
  const { daily } = uvIndex;
  console.log(daily);
  //const { uv_index_clear_sky_max, uv_index_max } = daily;
  const uvIndexMax = daily.uv_index_max[0].toFixed(0);
  const uvIndexClearSkyMax = daily.uv_index_clear_sky_max[0];
  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: "Low",
        protection: "No protection required",
      };
    } else if (uvIndex <= 5) {
      return {
        text: "Moderate",
        protection: "Stay in shade near midday.",
      };
    } else if (uvIndex <= 7) {
      return {
        text: "High",
        protection: "Wear a hat and sunglasses.",
      };
    } else if (uvIndex <= 10) {
      return {
        text: "Very High",
        protection: "Apply sunscreen SPF 30+ every 2 hours.",
      };
    } else if (uvIndex > 10) {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    } else {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    }
  };
  const marginLeftPercentage = (uvIndexMax / 14) * 100;
  // <p className='pt-4 text-2xl'>
  //         {uvIndexMax}
  //         <span className='text-sm'>({uvIndexCategory(uvIndexMax).text})</span>
  //       </p>
  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className='top'>
        <h2 className='flex items-center gap-2 font-medium'>{sun} UV Index</h2>
        <div className='pt-4 flex flex-col gap-1'>
          <p className='text-2xl'>
            {uvIndexMax}
            <span className='text-sm'>
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>

          <UvProgress
            value={marginLeftPercentage}
            max={14}
            className='progress-aq'
          />
        </div>
      </div>
      <p className='text-sm'>{uvIndexCategory(uvIndexMax).protection}</p>
    </div>
  );
}

export default UvIndex;
