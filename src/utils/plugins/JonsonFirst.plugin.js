import { calcStartTimes } from "@/utils/core";

export const JonsonFirst = (data) => {
  const sortedData = data.sort(
    ({ times: timesOne }, { times: timesTwo }) => timesOne[0] - timesTwo[0]
  );
  return calcStartTimes(sortedData);
};
