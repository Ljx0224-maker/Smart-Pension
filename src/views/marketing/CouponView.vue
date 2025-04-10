<template>
    <div class="coupon-container">
      <div class="filter-section">
        <div class="filter-item">
          <span>状态</span>
          <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="可领用" value="available"></el-option>
            <el-option label="已过期" value="expired"></el-option>
          </el-select>
        </div>
  
        <div class="filter-item">
          <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
          <el-button type="primary" @click="searchCoupons">
            <el-icon><Search /></el-icon>
          </el-button>
          <el-button @click="resetSearch">
            <el-icon><RefreshLeft/></el-icon>
          </el-button>
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
          :data="filteredCoupons"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="优惠券名称"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <span :style="{ color: scope.row.status === 'available' ? '#409EFF' : '#999' }">
                {{ scope.row.status === 'available' ? '可领用' : '已过期' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>
          <el-table-column prop="scope" label="适用范围"></el-table-column>
          <el-table-column prop="users" label="适用客户"></el-table-column>
          <el-table-column prop="quantity" label="领取数量/总数量"></el-table-column>
          <el-table-column prop="publishTime" label="发布时间"></el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button type="text">数据</el-button>
              <el-button type="text" @click="editCoupon(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteCoupon(scope.row)">删除</el-button>
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
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="可领用" value="available"></el-option>
                <el-option label="已过期" value="expired"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内容">
              <el-input v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="适用范围">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
            <el-form-item label="适用客户">
              <el-input v-model="form.users"></el-input>
            </el-form-item>
            <el-form-item label="领取数量/总数量">
              <el-input v-model="form.quantity"></el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker v-model="form.publishTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
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
  import {Search,RefreshLeft  } from '@element-plus/icons-vue'
  import { getCoupons, addCoupon, updateCoupon, deleteCoupon, batchDeleteCoupons } from '@/api/marketing';
  
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: '新客专享优惠券',
            status: 'available',
            content: '¥20 满200元可用',
            scope: '全部商品',
            users: '全部客户',
            quantity: '30/200',
            publishTime: '2024-10-09 10:09:09',
          },
          {
            id: 2,
            name: '新客专享优惠券',
            status: 'available',
            content: '¥20 满200元可用',
            scope: '全部商品',
            users: '全部客户',
            quantity: '30/200',
            publishTime: '2024-10-09 10:09:09',
          },
          {
            id: 3,
            name: '新客专享优惠券',
            status: 'available',
            content: '¥20 满200元可用',
            scope: '全部商品',
            users: '全部客户',
            quantity: '30/200',
            publishTime: '2024-10-09 10:09:09',
          },
          {
            id: 4,
            name: '新客专享优惠券',
            status: 'available',
            content: '¥20 满200元可用',
            scope: '全部商品',
            users: '全部客户',
            quantity: '30/200',
            publishTime: '2024-10-09 10:09:09',
          },
          {
            id: 5,
            name: '新客专享优惠券',
            status: 'available',
            content: '¥20 满200元可用',
            scope: '全部商品',
            users: '全部客户',
            quantity: '30/200',
            publishTime: '2024-10-09 10:09:09',
          },
          {
            id: 6,
            name: '新客专享优惠券',
            status: 'available',
            content: '¥20 满200元可用',
            scope: '全部商品',
            users: '全部客户',
            quantity: '30/200',
            publishTime: '2024-10-09 10:09:09',
          },
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        statusFilter: '',
        searchKeyword: '',
        dialogVisible: false,
        dialogTitle: '',
        form: {
          id: null,
          name: '',
          status: 'available',
          content: '',
          scope: '',
          users: '',
          quantity: '',
          publishTime: '',
        },
        selectedRows: [],
      };
    },
    computed: {
      filteredCoupons() {
        return this.tableData.filter(coupon => {
          // 筛选状态
          if (this.statusFilter && coupon.status !== this.statusFilter) {
            return false;
          }
  
          // 筛选关键字
          if (this.searchKeyword && !coupon.name.includes(this.searchKeyword)) {
            return false;
          }
  
          return true;
        });
      },
    },
    components:{
        Search,
        RefreshLeft

    },
    methods: {
      searchCoupons() {
        // 搜索框功能
      },
      resetSearch() {
        this.statusFilter = '';
        this.searchKeyword = '';
      },
      addNewCoupon() {
        this.dialogTitle = '新增优惠券';
        this.form = {
          id: null,
          name: '',
          status: 'available',
          content: '',
          scope: '',
          users: '',
          quantity: '',
          publishTime: '',
        };
        this.dialogVisible = true;
      },
      editCoupon(row) {
        this.dialogTitle = '编辑优惠券';
        this.form = { ...row };
        this.dialogVisible = true;
      },
      deleteCoupon(row) {
        this.$confirm('确定要删除此优惠券吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteCoupon(row.id).then(res => {
            if (res.code === 200) {
              ElMessage.success('删除成功');
              this.tableData = this.tableData.filter(item => item.id !== row.id);
            } else {
              ElMessage.error('删除失败');
            }
          });
        }).catch(() => {
          ElMessage.info('已取消删除');
        });
      },
      saveCoupon() {
        if (this.form.id) {
          // 编辑
          updateCoupon(this.form.id, this.form).then(res => {
            if (res.code === 200) {
              ElMessage.success('编辑成功');
              const index = this.tableData.findIndex(item => item.id === this.form.id);
              if (index !== -1) {
                this.tableData[index] = { ...this.form };
              }
              this.dialogVisible = false;
            } else {
              ElMessage.error('编辑失败');
            }
          });
        } else {
          // 新增
          addCoupon(this.form).then(res => {
            if (res.code === 200) {
              ElMessage.success('新增成功');
              this.tableData.unshift(res.data);
              this.dialogVisible = false;
            } else {
              ElMessage.error('新增失败');
            }
          });
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
        }).then(() => {
          const ids = this.selectedRows.map(row => row.id);
          batchDeleteCoupons(ids).then(res => {
            if (res.code === 200) {
              ElMessage.success('批量删除成功');
              this.tableData = this.tableData.filter(item => !ids.includes(item.id));
              this.selectedRows = [];
            } else {
              ElMessage.error('批量删除失败');
            }
          });
        }).catch(() => {
          ElMessage.info('已取消批量删除');
        });
      },
      handleSelectionChange(selection) {
        this.selectedRows = selection;
      },
      handlePageChange(page) {
        this.currentPage = page;
        // 加载对应页的数据
      },
    },
    mounted() {
      // 初始化数据
      this.total = this.tableData.length;
    },
  };
  </script>
  
  <style scoped>
  .coupon-container {
    padding: 20px;
    background-color: #f5f7fa;
  }
  
  .filter-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .filter-item {
    margin-bottom: 15px;
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
    margin-bottom: 15px;
  }
  
  .el-pagination {
    text-align: center;
  }
  </style>