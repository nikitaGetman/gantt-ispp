import { calcStartTimes, maxValueIndex } from "@/utils/core";

export const JonsonThird = (data) => {
  const sortedData = data.sort(
    ({ times: timesOne }, { times: timesTwo }) =>
      maxValueIndex(timesTwo) - maxValueIndex(timesOne)
  );
  return calcStartTimes(sortedData);
};
