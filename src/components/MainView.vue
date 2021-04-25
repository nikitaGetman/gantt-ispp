<template>
  <div class="main">
    <div class="main__chart mt-8">
      <g-gantt-chart :chart-start="myChartStart" :chart-end="myChartEnd">
        <g-gantt-row
          label="My row"
          :bars="myBars"
          bar-start="myBarStart"
          bar-end="myBarEnd"
        />
      </g-gantt-chart>
    </div>

    <v-row class="mt-8">
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
    </v-row>

    <div class="main__matrix mt-6">
      <!-- header -->
      <div class="main__matrix-row d-flex align-center">
        <div class="mr-10 text-h6 main__fixed">Деталь</div>
        <div
          class="main__matrix-cell subtitle-1"
          v-for="detail in details"
          :key="detail"
        >
          {{ detail }}
        </div>
      </div>
      <!-- body -->
      <div
        class="main__matrix-row d-flex align-center"
        v-for="machine in machines"
        :key="machine"
      >
        <div class="mr-2 text-h6 text-no-wrap main__fixed">
          Станок # {{ machine }}
        </div>
        <div class="main__matrix-cell" v-for="detail in details" :key="detail">
          <v-text-field
            class="main__matrix-cell"
            hide-details
            outlined
            type="number"
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GGanttChart, GGanttRow } from "vue-ganttastic";

export default {
  name: "MainView",
  components: { GGanttChart, GGanttRow },
  data() {
    return {
      myChartStart: "2020-03-01 00:00",
      myChartEnd: "2020-03-02 00:00",
      myBars: [
        {
          myBarStart: "2020-03-01 01:30",
          myBarEnd: "2020-03-01 06:00",
        },
        {
          myBarStart: "2020-03-01 15:10",
          myBarEnd: "2020-03-01 20:00",
        },
      ],

      machines: 1,
      details: 1,
      matrix: [[0]],
    };
  },
  created() {
    this.createMatrix();
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
      return Array.apply(null, Array(100)).map(function (val, index) {
        return index + 1;
      });
    },
  },
  methods: {
    createMatrix() {
      this.matrix = Array.from({ length: this.machines }, () =>
        Array.from({ length: this.details })
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
    padding-left: 128px;
  }
  &__fixed {
    position: absolute;
    left: 0;
  }
}
</style>
