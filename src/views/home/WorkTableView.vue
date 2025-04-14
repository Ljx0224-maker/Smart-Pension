<template>
  <div class="work-table-container">
    <!-- 顶部欢迎信息 -->
    <div class="welcome-section">
      <h2>👋 早上好！Daisy</h2>
    </div>

    <!-- 数据统计卡片 -->
    <div class="statistics-cards">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="statistic-card">
            <div class="statistic-content">
              <div class="statistic-info">
                <h3>新增用户数量</h3>
                <p>1080</p>
                <span class="trend-up">较上周 +20%</span>
              </div>
              <div class="statistic-chart">
                <div ref="userChart" style="height: 60px;"></div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="statistic-card">
            <div class="statistic-content">
              <div class="statistic-info">
                <h3>新增工单数量</h3>
                <p>3400</p>
                <span class="trend-up">较上周 +30%</span>
              </div>
              <div class="statistic-chart">
                <div ref="workOrderChart" style="height: 60px;"></div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="statistic-card">
            <div class="statistic-content">
              <div class="statistic-info">
                <h3>新增订单数量</h3>
                <p>300</p>
                <span class="trend-down">较上周 -30%</span>
              </div>
              <div class="statistic-chart">
                <div ref="orderChart" style="height: 60px;"></div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="statistic-card">
            <div class="statistic-content">
              <div class="statistic-info">
                <h3>新增动态数量</h3>
                <p>8890</p>
                <span class="trend-up">较昨日 +38%</span>
              </div>
              <div class="statistic-chart">
                <div ref="dynamicChart" style="height: 60px;"></div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-access">
      <div class="quick-access-item" v-for="item in quickAccess" :key="item.label">
        <el-icon :size="30" :color="item.color">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </div>
    </div>

    <!-- 用户趋势统计 -->
    <div class="user-trend">
      <h3>用户趋势统计</h3>
      <el-card>
        <div ref="userTrendChart" style="height: 300px;"></div>
      </el-card>
    </div>

    <!-- 用户标签分布和各服务类型商品订单量占比 -->
    <div class="charts-section">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <h3>用户标签分布</h3>
            <div class="tag-distribution">
              <div class="tag-item" v-for="tag in userTags" :key="tag.name">
                <div class="tag-name">{{ tag.name }}</div>
                <div class="progress-bar">
                  <div class="progress" :style="{ width: `${tag.value}%`, backgroundColor: tag.color }"></div>
                </div>
                <div class="tag-value">{{ tag.value }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <h3>各服务类型商品订单量占比</h3>
            <div ref="serviceDistributionChart" style="height: 250px;"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 支付榜和服务人员业绩 -->
    <div class="ranking-section">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <h3>支付榜 TOP5 商品排行</h3>
            <el-table :data="topProducts" style="width: 100%">
              <el-table-column prop="rank" label="序号" width="80"></el-table-column>
              <el-table-column label="商品信息">
                <template #default="scope">
                  <div class="product-info">
                    <img :src="scope.row.image" alt="商品图片" />
                    <span>{{ scope.row.name }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="orders" label="支付订单数"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <h3>服务人员业绩 TOP5 排行</h3>
            <el-table :data="topEmployees" style="width: 100%">
              <el-table-column prop="rank" label="序号" width="80"></el-table-column>
              <el-table-column label="个人信息">
                <template #default="scope">
                  <div class="employee-info">
                    <img :src="scope.row.avatar" alt="头像" />
                    <span>{{ scope.row.name }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="服务类型"></el-table-column>
              <el-table-column prop="orders" label="服务订单数"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { User, Document, ChatDotRound, ShoppingCart } from '@element-plus/icons-vue';

export default {
  components: {
    User,
    Document,
    ChatDotRound,
    ShoppingCart,
  },
  data() {
    return {
      quickAccess: [
        { label: '全部用户', icon: 'User', color: '#409EFF' },
        { label: '报告管理', icon: 'Document', color: '#409EFF' },
        { label: '会话', icon: 'ChatDotRound', color: '#409EFF' },
        { label: '全部订单', icon: 'ShoppingCart', color: '#409EFF' },
      ],
      userTags: [
        { name: '高血压', value: 80, color: '#409EFF' },
        { name: '冠心病', value: 120, color: '#409EFF' },
        { name: '高血糖', value: 40, color: '#409EFF' },
        { name: '高血脂', value: 30, color: '#409EFF' },
        { name: '慢病护理', value: 110, color: '#409EFF' },
        { name: '多动症', value: 88, color: '#409EFF' },
      ],
      topProducts: [
        { rank: 1, name: '日常清洁 2小时1人急速清洁全程质保', image: '/images/product1.jpg', orders: 1300 },
        { rank: 2, name: '日常清洁 2小时1人急速清洁全程质保', image: '/images/product1.jpg', orders: 1300 },
        { rank: 3, name: '日常清洁 2小时1人急速清洁全程质保', image: '/images/product1.jpg', orders: 1300 },
        { rank: 4, name: '日常清洁 2小时1人急速清洁全程质保', image: '/images/product1.jpg', orders: 1300 },
        { rank: 5, name: '日常清洁 2小时1人急速清洁全程质保', image: '/images/product1.jpg', orders: 1300 },
      ],
      topEmployees: [
        { rank: 1, name: '王小倩', avatar: '/images/avatar1.jpg', type: '家政护工', orders: 2678 },
        { rank: 2, name: '王小倩', avatar: '/images/avatar1.jpg', type: '家政护工', orders: 2678 },
        { rank: 3, name: '王小倩', avatar: '/images/avatar1.jpg', type: '家政护工', orders: 2678 },
        { rank: 4, name: '王小倩', avatar: '/images/avatar1.jpg', type: '家政护工', orders: 2678 },
        { rank: 5, name: '王小倩', avatar: '/images/avatar1.jpg', type: '家政护工', orders: 2678 },
      ],
    };
  },
  mounted() {
    this.initUserTrendChart();
    this.initServiceDistributionChart();
    this.initStatisticCharts();
  },
  methods: {
    initUserTrendChart() {
      const chartDom = this.$refs.userTrendChart;
      const myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            if (params[0].dataIndex === 3) {
              return '03-04<br/>新增用户数量: 1520';
            }
            return params[0].axisValue + '<br/>新增用户数量: ' + params[0].value;
          },
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#409EFF'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '新增用户数量',
            type: 'line',
            stack: '总量',
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64, 158, 255, 0.5)' },
                { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [3500, 3000, 2800, 1520, 2000, 2500, 3000],
            markPoint: {
              data: [
                { type: 'min', name: '最小值' },
                { type: 'max', name: '最大值' },
                { xAxis: 3, name: '标记点', value: 1520 }
              ]
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    initServiceDistributionChart() {
      const chartDom = this.$refs.serviceDistributionChart;
      const myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          data: ['家政护理', '康复理疗', '上门体检']
        },
        series: [
          {
            name: '订单量占比',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 28, name: '家政护理' },
              { value: 55, name: '康复理疗' },
              { value: 17, name: '上门体检' }
            ],
            color: ['#409EFF', '#67C23A', '#F56C6C']
          }
        ]
      };
      myChart.setOption(option);
    },
    initStatisticCharts() {
      this.initUserChart();
      this.initWorkOrderChart();
      this.initOrderChart();
      this.initDynamicChart();
    },
    initUserChart() {
      const chartDom = this.$refs.userChart;
      const myChart = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: 'category',
          data: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            data: [3000, 3200, 3100, 3500, 3300, 3400, 3600],
            type: 'line',
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64, 158, 255, 0.5)' },
                { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
              ])
            },
            lineStyle: {
              color: '#409EFF'
            }
          }
        ],
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          containLabel: true
        }
      };
      myChart.setOption(option);
    },
    initWorkOrderChart() {
      const chartDom = this.$refs.workOrderChart;
      const myChart = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: 'category',
          data: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            data: [3000, 3200, 3100, 3500, 3300, 3400, 3600],
            type: 'bar',
            itemStyle: {
              color: '#E6A23C'
            }
          }
        ],
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          containLabel: true
        }
      };
      myChart.setOption(option);
    },
    initOrderChart() {
      const chartDom = this.$refs.orderChart;
      const myChart = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: 'category',
          data: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            data: [300, 320, 310, 250, 330, 340, 360],
            type: 'line',
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(245, 108, 108, 0.5)' },
                { offset: 1, color: 'rgba(245, 108, 108, 0.1)' }
              ])
            },
            lineStyle: {
              color: '#F56C6C'
            }
          }
        ],
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          containLabel: true
        }
      };
      myChart.setOption(option);
    },
    initDynamicChart() {
      const chartDom = this.$refs.dynamicChart;
      const myChart = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: 'category',
          data: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            data: [8000, 8200, 8500, 8300, 8700, 8900, 9000],
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#67C23A' },
                { offset: 1, color: '#909399' }
              ])
            }
          }
        ],
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          containLabel: true
        }
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.work-table-container {
  padding: 20px;
  background-color: #f0f2f5;
}

.welcome-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.statistics-cards {
  margin-bottom: 20px;
}

.statistic-card {
  height: 120px;
  display: flex;
  align-items: center;
  padding: 15px;
}

.statistic-content {
  display: flex;
  width: 100%;
}

.statistic-info {
  flex: 1;
}

.statistic-info h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.statistic-info p {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.trend-up {
  color: #409EFF;
  font-size: 14px;
}

.trend-down {
  color: #f56c6c;
  font-size: 14px;
}

.statistic-chart {
  flex: 1;
  margin-left: 20px;
}

.quick-access {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.quick-access-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.quick-access-item span {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.user-trend,
.charts-section,
.ranking-section {
  margin-bottom: 20px;
}

.tag-distribution {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tag-item {
  display: flex;
  align-items: center;
}

.tag-name {
  width: 100px;
  text-align: right;
  margin-right: 10px;
  color: #333;
}

.progress-bar {
  flex: 1;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  border-radius: 10px;
}

.tag-value {
  width: 50px;
  text-align: right;
  margin-left: 10px;
  color: #333;
}

.charts-section .el-card {
  height: 320px;
}

.product-info,
.employee-info {
  display: flex;
  align-items: center;
}

.product-info img,
.employee-info img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 10px;
}
</style>