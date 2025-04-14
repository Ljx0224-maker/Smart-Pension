<template>
  <div class="transaction-dashboard">
    <div class="page-header">
      <h2>交易概况</h2>
    </div>

       <!-- 将日期选择器移动到这里 -->
       <div class="date-picker">
      <span>选择日期</span>
      <input type="date" v-model="startDate" />
      <span>~</span>
      <input type="date" v-model="endDate" />
      <button class="calendar-icon">📅</button>
    </div>
    <div class="transaction-overview">
      <h3>交易概况</h3>
      <div class="chart-wrapper">
        <canvas ref="overviewChart"></canvas>
      </div>
    </div>

 

    <div class="charts-container">
      <div class="trend-chart">
        <h3>成交趋势</h3>
        <div class="chart-wrapper">
          <canvas ref="trendChart"></canvas>
        </div>
      </div>

      <div class="order-distribution">
        <h3>订单金额分布</h3>
        <div class="chart-wrapper">
          <canvas ref="distributionChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      overviewChart: null,
      trendChart: null,
      distributionChart: null,
    };
  },
  mounted() {
    const today = new Date().toISOString().split("T")[0]; // 获取当前日期
    this.startDate = today; // 设置默认开始日期
    this.endDate = today; // 设置默认结束日期

    this.initOverviewChart();
    this.initTrendChart();
    this.initDistributionChart();
  },
  methods: {
    initOverviewChart() {
      const ctx = this.$refs.overviewChart.getContext("2d");
      this.overviewChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "浏览量",
            "访客量",
            "下单人数",
            "下单笔数",
            "支付人数",
            "支付订单数",
            "退款订单数",
          ],
          datasets: [
            {
              label: "数量",
              data: [2300, 2300, 300, 300, 100, 130, 1],
              backgroundColor: [
                "rgba(75, 192, 192, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
                "rgba(201, 203, 207, 0.7)",
                "rgba(255, 99, 132, 0.7)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(201, 203, 207, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.parsed.y}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    },
    initTrendChart() {
      const ctx = this.$refs.trendChart.getContext("2d");
      this.trendChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["03-01", "03-02", "03-03", "03-04", "03-05", "03-06", "03-07"],
          datasets: [
            {
              label: "订单金额",
              data: [2800, 2400, 2500, 1200, 2700, 2500, 2900],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              pointRadius: 5,
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `订单金额: ${context.parsed.y}元`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    },
    initDistributionChart() {
      const ctx = this.$refs.distributionChart.getContext("2d");
      this.distributionChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "100以下",
            "100-500",
            "500-1000",
            "1000-1500",
            "1500-2000",
            "2000-2500",
            "2500-3000",
            "3000以上",
          ],
          datasets: [
            {
              label: "订单数量",
              data: [800, 1100, 2400, 3410, 2400, 2100, 1300, 500],
              backgroundColor: "rgba(75, 192, 192, 0.7)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `订单数量: ${context.parsed.y}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.page-header::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 20px;
  background-color: #4fc3f7;
  margin-right: 10px;
  border-radius: 2px;
}
.transaction-dashboard {
  font-family: "Arial", sans-serif;
  padding: 20px;
  background-color: #f8f9fa;
}

.header {
  display: flex;
  justify-content: space-between; /* 保持原有布局 */
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
}

.title::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: #4caf50;
  margin-right: 10px;
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px; /* 增加底部间距 */
}

.date-picker input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.calendar-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #666;
}

.transaction-overview {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.transaction-overview h3 {
  margin-bottom: 20px;
  color: #333;
}

.chart-wrapper {
  height: 300px;
}

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.trend-chart,
.order-distribution {
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.trend-chart h3,
.order-distribution h3 {
  margin-bottom: 20px;
  color: #333;
}
</style>