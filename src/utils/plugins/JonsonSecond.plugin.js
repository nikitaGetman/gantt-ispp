import { calcStartTimes } from "@/utils/core";

export const JonsonSecond = (data) => {
  const sortedData = data.sort(
    ({ times: timesOne }, { times: timesTwo }) =>
      timesTwo[timesTwo.length - 1] - timesOne[timesOne.length - 1]
  );
  return calcStartTimes(sortedData);
};
