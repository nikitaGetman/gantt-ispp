<template>
  <div class="main">
    <div class="main__chart mt-8">
      <g-gantt-chart :chart-start="myChartStart" :chart-end="myChartEnd">
        <g-gantt-row
          v-for="(queue, index) in queues"
          :key="index"
          :label="`Станок: ${index + 1}`"
          :bars="queue"
          bar-start="start"
          bar-end="end"
        />
      </g-gantt-chart>
    </div>

    <v-row class="mt-8" align="center">
      <v-col :cols="3" class="d-flex align-center">
        <span class="text-h5 mr-5">Детали:</span>
        <v-select
          :items="numOptions"
          outlined
          v-model="details"
          hide-details
        ></v-select>
      </v-col>
      <v-col :cols="3" class="d-flex align-center">
        <span class="text-h5 mr-5">Станки:</span>
        <v-select
          :items="numOptions"
          outlined
          v-model="machines"
          hide-details
        ></v-select>
      </v-col>
      <v-col :cols="3" class="d-flex align-center">
        <span class="text-h5 mr-5">Метод:</span>
        <v-select
          item-text="label"
          item-value="value"
          :items="$options.METHODS"
          outlined
          v-model="method"
          hide-details
        ></v-select>
      </v-col>

      <v-spacer />

      <v-btn x-large @click="calc" color="primary" :disabled="!method">
        Рассчитать
      </v-btn>
    </v-row>

    <div class="main__matrix mt-6">
      <!-- header -->
      <div class="main__matrix-row d-flex align-center">
        <div class="mr-10 text-h6 main__fixed">Станок</div>
        <div
          class="main__matrix-cell subtitle-1"
          v-for="machine in machines"
          :key="machine"
        >
          {{ machine }}
        </div>
      </div>
      <!-- body -->
      <div
        class="main__matrix-row d-flex align-center"
        v-for="detail in details"
        :key="detail"
      >
        <div class="mr-2 text-h6 text-no-wrap main__fixed d-flex align-center">
          <v-sheet
            width="24"
            height="24"
            :color="$options.COLORS[detail - 1]"
            class="mr-4"
          />
          Деталь # {{ detail }}
        </div>
        <div
          class="main__matrix-cell"
          v-for="machine in machines"
          :key="machine"
        >
          <v-text-field
            class="main__matrix-cell"
            hide-details
            outlined
            type="number"
            v-model="matrix[detail - 1].times[machine - 1]"
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GGanttChart, GGanttRow } from "vue-ganttastic";
import { inputData, parseInputData } from "@/utils/core";
import { JonsonFirst } from "@/utils/plugins/JonsonFirst.plugin";
import { JonsonSecond } from "@/utils/plugins/JonsonSecond.plugin";
import { JonsonThird } from "@/utils/plugins/JonsonThird.plugin";
import { JonsonFourth } from "@/utils/plugins/JonsonFourth.plugin";
import { JonsonFifth } from "@/utils/plugins/JonsonFifth.plugin";
import { PetrovFirst } from "@/utils/plugins/PetrovFirst.plugin";
import { PetrovSecond } from "@/utils/plugins/PetrovSecond.plugin";
import { PetrovThird } from "@/utils/plugins/PetrovThird.plugin";
import { PetrovOptimal } from "@/utils/plugins/PetrovOptimal.plugin";

import moment from "moment";

const METHODS = [
  "Джонсон 1",
  "Джонсон 2",
  "Джонсон 3",
  "Джонсон 4",
  "Джонсон 5",
  "Петров 1",
  "Петров 2",
  "Петров 3",
  "Петров Оптимальный",
];

const METHODS_FUNCS = {
  "Джонсон 1": JonsonFirst,
  "Джонсон 2": JonsonSecond,
  "Джонсон 3": JonsonThird,
  "Джонсон 4": JonsonFourth,
  "Джонсон 5": JonsonFifth,
  "Петров 1": PetrovFirst,
  "Петров 2": PetrovSecond,
  "Петров 3": PetrovThird,
  "Петров Оптимальный": PetrovOptimal,
};

const COLORS = [
  "#F44336",
  "#9C27B0",
  "#2196F3",
  "#4CAF50",
  "#CDDC39",
  "#FFC107",
  "#795548",
  "#607D8B",
  "#FFEB3B",
  "#673AB7",
];

/* eslint-disable */

export default {
  name: "MainView",
  components: { GGanttChart, GGanttRow },
  COLORS,
  METHODS,
  data() {
    return {
      myChartStart: "2020-03-01 00:00",
      results: [],

      machines: 5,
      details: 5,
      method: null,
      matrix: inputData,
    };
  },
  created() {
    this.matrix = parseInputData(inputData);
  },
  watch: {
    details() {
      this.createMatrix();
    },
    machines() {
      this.createMatrix();
    },
  },
  computed: {
    numOptions() {
      return Array.apply(null, Array(10)).map(function (val, index) {
        return index + 1;
      });
    },
    myChartEnd() {
      return this.results.length ? [...this.queues[this.machines - 1]].pop().end : '2020-03-02 00:00';
    },
    detailTimes() {
      const startTime = moment(this.myChartStart);
    
      return this.results.map(({ name, startTimes, times }) => {
        const starts = startTimes.map( st => moment(startTime).add(st ,'hours'))
        const ends = starts.map((st, index) => moment(st).add(times[index], 'hours'))
        
        return { name, starts, ends };
      });

    },
    queues(){
      const detailTimes = this.detailTimes

      if(detailTimes.length){
          const queues = Array.from({length: this.machines}).map(() => Array.from({length: this.details}))

          for(let det=0; det < this.details; det++){
            for(let machine = 0; machine < this.machines; machine++){
              const detail = detailTimes[det]
            queues[machine][det] = {
              name: detail.name, 
              start: detail.starts[machine].format(), 
              end: detail.ends[machine].format(),
              ganttBarConfig: {
                  background: COLORS[detail.name-1]
              }
            }
          }
        }

        return queues
      }

      return []
    }
  },
  methods: {
    calc() {
      const data = parseInputData(inputData);
      const res = METHODS_FUNCS[this.method](data);

      this.results = res;
    },
    createMatrix() {
      // TODO считать правильно
      this.matrix = Array.from({ length: this.machines }, (v, index) =>
        ({name: index + 1,times: Array.from({ length: this.details })})
      );
    },
  },
};
</script>

<style lang="scss">
.main {
  &__matrix {
    overflow: auto;
  }
  &__matrix-cell {
    flex: 0 0 64px;
    text-align: center;
  }
  &__matrix-row {
    position: relative;
    padding-left: 168px;
  }
  &__fixed {
    position: absolute;
    left: 0;
  }
}
</style>
