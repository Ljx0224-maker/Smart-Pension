<template>
    <div class="dashboard-container">
        <div class="page-header">
            <h2>用户概况</h2>
        </div>
        <div class="date-picker">
          <span>选择日期</span>
          <input type="date" v-model="startDate" />
          <span>~</span>
          <input type="date" v-model="endDate" />
          <button class="calendar-icon">📅</button>
        
      </div>
      
      <div class="charts-container">
        <div class="trend-chart">
          <h3>用户趋势统计</h3>
          <div class="chart-wrapper">
            <canvas ref="trendChart"></canvas>
          </div>
        </div>
        
        <div class="demographics-charts">
          <div class="age-chart">
            <h3>用户年龄构成</h3>
            <div class="chart-wrapper">
              <canvas ref="ageChart"></canvas>
            </div>
            <div class="legend">
              <div class="legend-item">
                <span class="color-dot blue"></span>
                <span>50岁以下 100</span>
              </div>
              <div class="legend-item">
                <span class="color-dot green"></span>
                <span>50-60岁 240</span>
              </div>
              <div class="legend-item">
                <span class="color-dot light-blue"></span>
                <span>60-70岁 120</span>
              </div>
              <div class="legend-item">
                <span class="color-dot yellow"></span>
                <span>70-80岁 120</span>
              </div>
              <div class="legend-item">
                <span class="color-dot red"></span>
                <span>80岁以上 340</span>
              </div>
            </div>
          </div>
          
          <div class="gender-chart">
            <h3>用户性别构成</h3>
            <div class="chart-wrapper">
              <canvas ref="genderChart"></canvas>
            </div>
            <div class="legend">
              <div class="legend-item">
                <span class="color-dot green"></span>
                <span>男 540</span>
              </div>
              <div class="legend-item">
                <span class="color-dot yellow"></span>
                <span>女 560</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        startDate: '2024-03-01',
        endDate: '2024-03-07',
        trendChart: null,
        ageChart: null,
        genderChart: null
      };
    },
    mounted() {
      this.initTrendChart();
      this.initAgeChart();
      this.initGenderChart();
    },
    methods: {
      initTrendChart() {
        const ctx = this.$refs.trendChart.getContext('2d');
        this.trendChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
            datasets: [{
              label: '新增用户数量',
              data: [3400, 2900, 3000, 1700, 3200, 3000, 3400],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 5,
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `新增用户: ${context.parsed.y}`;
                  }
                }
              },
              annotation: {
                annotations: {
                  line1: {
                    type: 'line',
                    yMin: 1700,
                    yMax: 1700,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1
                  },
                  box1: {
                    type: 'box',
                    xMin: 3,
                    xMax: 3,
                    yMin: 0,
                    yMax: 1700,
                    backgroundColor: 'rgba(75, 192, 192, 0.3)'
                  },
                  text1: {
                    type: 'text',
                    x: 3,
                    y: 1750,
                    content: '1520'
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)'
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          }
        });
      },
      
      initAgeChart() {
        const ctx = this.$refs.ageChart.getContext('2d');
        this.ageChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['50岁以下', '50-60岁', '60-70岁', '70-80岁', '80岁以上'],
            datasets: [{
              data: [100, 240, 120, 120, 340],
              backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(173, 216, 230, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(255, 99, 132, 0.8)'
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.label}: ${context.parsed}人`;
                  }
                }
              }
            }
          }
        });
      },
      
      initGenderChart() {
        const ctx = this.$refs.genderChart.getContext('2d');
        this.genderChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['男', '女'],
            datasets: [{
              data: [540, 560],
              backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 206, 86, 0.8)'
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.label}: ${context.parsed}人`;
                  }
                }
              }
            }
          }
        });
      }
    }
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

  .dashboard-container {
    font-family: 'Arial', sans-serif;
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
  
  .charts-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .trend-chart {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .trend-chart h3 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .chart-wrapper {
    height: 300px;
  }
  
  .demographics-charts {
    display: flex;
    gap: 30px;
  }
  
  .age-chart, .gender-chart {
    flex: 1;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .age-chart h3, .gender-chart h3 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .color-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
  }
  
  .color-dot.blue {
    background-color: rgba(54, 162, 235, 0.8);
  }
  
  .color-dot.green {
    background-color: rgba(75, 192, 192, 0.8);
  }
  
  .color-dot.light-blue {
    background-color: rgba(173, 216, 230, 0.8);
  }
  
  .color-dot.yellow {
    background-color: rgba(255, 206, 86, 0.8);
  }
  
  .color-dot.red {
    background-color: rgba(255, 99, 132, 0.8);
  }
  </style>