export const inputData =
  "5;2;5;6;9\n3;10;8;10;11\n11;4;3;13;11\n2;7;7;8;5\n10;10;3;11;10";

export const parseInputData = (inputDataString) =>
  inputDataString.split("\n").reduce((acc, curr, index) => {
    if (curr === "") return acc;
    return [
      ...acc,
      {
        name: index + 1,
        times: curr.split(";").map(Number),
      },
    ];
  }, []);

export const dataToDoubleArray = (data) => data.map(({ times }) => [...times]);

export const getDurationMatrix = (data) => {
  const matrix = dataToDoubleArray(data);
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let col = 0; col < cols; col++)
    matrix[0][col] = (col > 0 ? matrix[0][col - 1] : 0) + matrix[0][col];

  for (let row = 1; row < rows; row++) {
    matrix[row][0] += matrix[row - 1][0];
    for (let col = 1; col < cols; col++) {
      matrix[row][col] += Math.max(matrix[row - 1][col], matrix[row][col - 1]);
    }
  }
  return matrix;
};

export const calcStartTimes = (data) => {
  const durationMatrix = getDurationMatrix(data);
  return data.map((detail, detailIndex) => {
    const startTimes = detail.times.map(
      (time, index) => durationMatrix[detailIndex][index] - time
    );
    return { ...detail, startTimes };
  });
};

export const getTotalTime = (data) => {
  const lastDetail = data[data.length - 1];
  const lastIndex = lastDetail.times.length - 1;
  return lastDetail.times[lastIndex] + lastDetail.startTimes[lastIndex];
};

export const maxValueIndex = (array) =>
  array.reduce(
    (maxIndex, curr, currentIndex) =>
      array[maxIndex] > curr ? maxIndex : currentIndex,
    0
  );

export const sumArray = (array) => array.reduce((sum, curr) => sum + curr, 0);
