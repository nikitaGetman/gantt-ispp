import { PetrovFirst } from "@/utils/plugins/PetrovFirst.plugin";
import { PetrovSecond } from "@/utils/plugins/PetrovSecond.plugin";
import { PetrovThird } from "@/utils/plugins/PetrovThird.plugin";
import { getTotalTime } from "@/utils/core";

export const PetrovOptimal = (data) => {
  const results = [PetrovFirst(data), PetrovSecond(data), PetrovThird(data)];
  console.log(results.map(getTotalTime));
  const minIndex = results
    .map(getTotalTime)
    .reduce((acc, curr, index, arr) => (arr[acc] > curr ? index : acc), 0);
  return results[minIndex];
};
