import AirPollution from "./components/AirPollution/AirPollution";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import FeelsLike from "./components/FeelsLike/FeelsLike";
import Humidity from "./components/Humidity/Humidity";
import Mapbox from "./components/Mapbox/Mapbox";
import Navbar from "./components/Navbar";
import Population from "./components/Population/Population";
import Pressure from "./components/Pressure/Pressure";
import Sunset from "./components/Sunset/Sunset";
import Temperature from "./components/Temperature/Temperature";
import UvIndex from "./components/UvIndex/UvIndex";
import Visibility from "./components/Visibility/Visibility";

import Wind from "./components/Wind/Wind";
import defaultStates from "./utils/defaultStates";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "./context/globalContext";
import MapCities from "./components/MapCities/MapCities";
import { ClientComponent } from "./components/ClientComponent/ClientComponent";

export default function Home() {
  return (
    <main className='mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto'>
      <Navbar />
      <div className='pb-4 flex flex-col gap-4 md:flex-row'>
        <div className='flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]'>
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className='flex flex-col w-full'>
          <div className='instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4'>
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className='mapbox-con mt-4 flex gap-4'>
            <ClientComponent />
            <MapCities />
          </div>
        </div>
      </div>
      <footer className='flex justify-center pb-8'>
        <p className='text-sm flex items-center gap-1'>Made by Vaibhav</p>
      </footer>
    </main>
  );
}
