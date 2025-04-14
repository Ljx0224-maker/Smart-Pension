<template>
  <div class="coupon-container">

    <div class="filter-section">
      <div class="page-header">
        <h2>优惠券管理</h2>
      </div>
      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>状态</span>
            <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="可领用" value="可领用"></el-option>
              <el-option label="不可领用" value="不可领用"></el-option>
            </el-select>
          </div>

          <div class="filter-item">
            <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="fetchCoupons" style="margin-left: 10px;">
              <el-icon><Search /></el-icon>
            </el-button>
            <el-button @click="resetSearch" style="margin-left: 10px;">
              <el-icon><RefreshLeft /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="action-table-box">
      <div class="action-section">
        <div class="action-buttons">
          <el-button type="primary" @click="addNewCoupon">新增</el-button>
          <el-button @click="batchDelete">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="computedTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="discountName" label="优惠券名称"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <span :style="{ color: scope.row.status === '可领用' ? '#409EFF' : '#999' }">
              {{ scope.row.status === '可领用' ? '可领用' : '不可领用' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="effectiveTime" label="有效期"></el-table-column>
        <el-table-column prop="useScope" label="适用范围"></el-table-column>
        <el-table-column prop="customer" label="适用客户"></el-table-column>
        <el-table-column prop="receiveNum" label="领取数量/总数量"></el-table-column>
        <el-table-column prop="releaseTime" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="text" @click="editCoupon(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteCoupon(scope.row.discountId)" style="color: #FFB800;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handlePageChange"
      ></el-pagination>

      <!-- 编辑/新增弹窗 -->
      <el-dialog
        :title="dialogTitle"
        v-model="dialogVisible"
        width="500px"
      >
        <el-form :model="form" label-width="100px">
          <el-form-item label="优惠券名称">
            <el-input v-model="form.discountName"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="可领用" value="可领用"></el-option>
              <el-option label="不可领用" value="不可领用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效期">
            <el-input v-model="form.effectiveTime"></el-input>
          </el-form-item>
          <el-form-item label="适用范围">
            <el-input v-model="form.useScope"></el-input>
          </el-form-item>
          <el-form-item label="适用客户">
            <el-input v-model="form.customer"></el-input>
          </el-form-item>
          <el-form-item label="领取数量/总数量">
            <el-input v-model="form.receiveNum"></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker v-model="form.releaseTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCoupon">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import {
  queryCoupons,
  addOrUpdateCoupon,
  deleteCouponById,
} from '@/api/marketing';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      statusFilter: '',
      searchKeyword: '',
      dialogVisible: false,
      dialogTitle: '',
      form: {
        discountId: null,
        name: '',
        status: '可领用',
        content: '',
        scope: '',
        customer: '',
        quantity: '',
        publishTime: '',
      },
      selectedRows: [],
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    computedTableData() {
      // 筛选逻辑
      let filteredData = this.tableData;
  
      // 根据状态筛选
      if (this.statusFilter) {
        filteredData = filteredData.filter(item => item.status === this.statusFilter);
      }
  
      // 根据关键字筛选
      if (this.searchKeyword) {
        filteredData = filteredData.filter(item =>
          item.discountName.includes(this.searchKeyword)
        );
      }
  
      // 分页逻辑
      return filteredData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    async fetchCoupons() {
      const res = await queryCoupons();
      console.log(res);
      
      if (res && res.data) {
        this.tableData = res.data;
        this.total = res.data.length;
      }
    },
    resetSearch() {
      this.statusFilter = '';
      this.searchKeyword = '';
      this.fetchCoupons();
    },
    addNewCoupon() {
      this.dialogTitle = '新增优惠券';
      this.form = {
        discountId: null,
        discountName: '',
        status: '可领用',
        effectiveTime: '',
        useScope: '',
        customer: '',
        receiveNum: '',
        releaseTime: '',
      };
      this.dialogVisible = true;
    },
    editCoupon(row) {
      this.dialogTitle = '编辑优惠券';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    async deleteCoupon(discountId) {
      try {
        await deleteCouponById(discountId);
        ElMessage.success('删除成功');
        this.fetchCoupons();
      } catch (error) {
        ElMessage.error('删除失败');
      }
    },
    async saveCoupon() {
      try {
        await addOrUpdateCoupon(this.form);
        ElMessage.success(this.form.discountId ? '编辑成功' : '新增成功');
        this.dialogVisible = false;
        this.fetchCoupons();
      } catch (error) {
        ElMessage.error(this.form.discountId ? '编辑失败' : '新增失败');
      }
    },
    batchDelete() {
      if (this.selectedRows.length === 0) {
        ElMessage.warning('请至少选择一条记录');
        return;
      }
      this.$confirm('确定要批量删除选中的优惠券吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const ids = this.selectedRows.map(row => row.discountId);
        try {
          await Promise.all(ids.map(discountId => deleteCouponById(discountId)));
          ElMessage.success('批量删除成功');
          this.fetchCoupons();
        } catch (error) {
          ElMessage.error('批量删除失败');
        }
      });
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchCoupons();
  },
};
</script>

<style scoped>
.coupon-container {
  padding: 20px;
  background-color: #f5f7fa;
}

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

.filter-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.filter-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-row {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.filter-item {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.filter-item span {
  width: 80px;
  display: inline-block;
}

.action-table-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.action-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
}

.el-table {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.el-pagination {
  text-align: center;
}
</style>