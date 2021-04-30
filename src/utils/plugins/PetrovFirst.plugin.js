import { calcStartTimes, sumArray } from "@/utils/core";

export const PetrovFirst = (data) => {
  const sortedData = [...data].sort(
    ({ times: timesOne }, { times: timesTwo }) =>
      sumArray(timesOne) -
      timesOne[timesOne.length - 1] -
      (sumArray(timesTwo) - timesTwo[timesTwo.length - 1])
  );
  return calcStartTimes(sortedData);
};
