import { calcStartTimes } from "@/utils/core";

export const PetrovThird = (data) => {
  const sortedData = [...data].sort(
    ({ times: timesOne }, { times: timesTwo }) =>
      timesTwo[timesTwo.length - 1] -
      timesTwo[0] -
      (timesOne[timesOne.length - 1] - timesOne[0])
  );
  return calcStartTimes(sortedData);
};
