<template>
  <div class="work-table-container">
    <!-- 顶部欢迎信息 -->
    <div class="welcome-section">
      <h2>👋 早上好！Daisy</h2>
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

    <!-- 数据统计 -->
    <div class="statistics-section">
      <div class="statistic-card" v-for="stat in statistics" :key="stat.title">
        <h3>{{ stat.title }}</h3>
        <p>{{ stat.value }}</p>
        <span :class="stat.trend > 0 ? 'trend-up' : 'trend-down'">
          较上周 {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
        </span>
      </div>
    </div>

    <!-- 用户趋势统计 -->
    <div class="user-trend">
      <h3>用户趋势统计</h3>
      <el-card>
        <echarts :options="userTrendOptions" style="height: 300px;"></echarts>
      </el-card>
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
import TrendCharts from '@/components/TrendCharts.vue'; // 假设有封装的 ECharts 组件
import { User, Document, ChatDotRound, ShoppingCart } from '@element-plus/icons-vue';

export default {
  components: {
    TrendCharts,
    User,
    Document,
    ChatDotRound,
    ShoppingCart,
  },
  data() {
    return {
      quickAccess: [
        { label: '全部用户', icon: 'User', color: '#67C23A' },
        { label: '报告管理', icon: 'Document', color: '#E6A23C' },
        { label: '会话', icon: 'ChatDotRound', color: '#409EFF' },
        { label: '全部订单', icon: 'ShoppingCart', color: '#F56C6C' },
      ],
      statistics: [
        { title: '新增用户数量', value: 1080, trend: 20 },
        { title: '新增工单数量', value: 3400, trend: 30 },
        { title: '新增订单数量', value: 300, trend: -30 },
        { title: '新增动态数量', value: 8890, trend: 38 },
      ],
      userTrendOptions: {
        xAxis: {
          type: 'category',
          data: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [3500, 3000, 2800, 1520, 2000, 2500, 3000],
            type: 'line',
            smooth: true,
            areaStyle: {},
          },
        ],
      },
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
};
</script>

<style scoped>
.work-table-container {
  padding: 20px;
  background-color: #f5f7fa;
}

.welcome-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
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
}

.statistics-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.statistic-card {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.statistic-card h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.statistic-card p {
  font-size: 24px;
  font-weight: bold;
}

.trend-up {
  color: #67c23a;
}

.trend-down {
  color: #f56c6c;
}

.user-trend {
  margin-bottom: 20px;
}

.ranking-section {
  margin-top: 20px;
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