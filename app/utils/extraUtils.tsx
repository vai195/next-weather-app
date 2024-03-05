import moment from "moment";

export const kelvinToFarenheit = (kelvin: number) => {
  return Math.round((kelvin - 273.15) * (9 / 5) + 32);
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("ddd");
};

export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number;
  }
};

export const airQualityIndexText = [
  {
    rating: 10,
    description: "excellent",
  },
  {
    rating: 20,
    description: "good",
  },
  {
    rating: 30,
    description: "satisfactory",
  },
  {
    rating: 40,
    description: "fair",
  },
  {
    rating: 50,
    description: "moderate",
  },
  {
    rating: 60,
    description: "moderate",
  },
  {
    rating: 70,
    description: "poor",
  },
  {
    rating: 80,
    description: "poor",
  },
  {
    rating: 90,
    description: "very poor",
  },
  {
    rating: 100,
    description: "very poor",
  },
];
