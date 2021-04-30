import { calcStartTimes, sumArray } from "@/utils/core";

export const JonsonFourth = (data) => {
  const sortedData = data.sort(
    ({ times: timesOne }, { times: timesTwo }) =>
      sumArray(timesTwo) - sumArray(timesOne)
  );
  return calcStartTimes(sortedData);
};
