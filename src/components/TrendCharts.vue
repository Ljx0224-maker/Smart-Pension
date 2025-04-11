<!-- filepath: src/components/TrendCharts.vue -->
<template>
  <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.chart.setOption(this.options);
  },
  watch: {
    options: {
      deep: true,
      handler(newOptions) {
        if (this.chart) {
          this.chart.setOption(newOptions);
        }
      },
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>