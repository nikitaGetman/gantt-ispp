import { sumArray, calcStartTimes } from "@/utils/core";

export const PetrovSecond = (data) => {
  const sortedData = [...data].sort(
    ({ times: timesOne }, { times: timesTwo }) =>
      sumArray(timesTwo) - timesTwo[0] - (sumArray(timesOne) - timesOne[0])
  );
  return calcStartTimes(sortedData);
};
