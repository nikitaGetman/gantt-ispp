import { calcStartTimes } from "@/utils/core";
import { JonsonFirst } from "./JonsonFirst.plugin";
import { JonsonSecond } from "./JonsonSecond.plugin";
import { JonsonThird } from "./JonsonThird.plugin";
import { JonsonFourth } from "./JonsonFourth.plugin";

export const JonsonFifth = (data) => {
  const results = [
    JonsonFirst(data),
    JonsonSecond(data),
    JonsonThird(data),
    JonsonFourth(data),
  ];

  data.map((value) => {
    const indexSum = results.reduce(
      (acc, result) =>
        acc + result.findIndex((elem) => value.name === elem.name),
      0
    );
    return { ...value, indexSum };
  });

  const sortedData = data.sort(
    ({ indexSum: indexSumOne }, { indexSum: indexSumTwo }) =>
      indexSumOne - indexSumTwo
  );

  return calcStartTimes(sortedData);
};
