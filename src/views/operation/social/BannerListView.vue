<template>
  <div class="banner-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>轮播图列表</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="searchBanners" style="margin-left: 10px;">
              <el-icon><Search/></el-icon>
            </el-button>
            <el-button @click="resetSearch" style="margin-left: 10px;">
              <el-icon><RefreshLeft/></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="action-table-box">
      <div class="action-section">
        <div class="action-buttons">
          <el-button type="primary" @click="addNewBanner">新增</el-button>
          <el-button @click="batchDelete">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="filteredBanners"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="number" label="序号" width="80"></el-table-column>
        <el-table-column label="Banner图" width="150">
          <template #default="scope">
            <img :src="scope.row.picture" alt="Banner图" style="width: 100px; height: 50px; object-fit: cover;" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="lastUpdatedBy" label="更新人"></el-table-column>
        <el-table-column prop="lastUpdatedAt" label="最后更新时间"></el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="启用"
              inactive-value="禁用"
              @change="toggleStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="editBanner(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteBanner(scope.row)" style="color: #FFB800;">删除</el-button>
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
    </div>

    <!-- 编辑/新增弹窗 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="500px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="序号">
          <el-input-number v-model="form.number" :min="1" style="width: 100%;"></el-input-number>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="form.picture" placeholder="请输入图片链接"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.link" placeholder="请输入跳转链接"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveBanner">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { getBanners, addOrUpdateBanner, deleteBanner, batchDeleteBanners } from '@/api/banner';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchKeyword: '',
      dialogVisible: false,
      dialogTitle: '',
      form: {
        carouselId: null,
        number: null,
        title: '',
        picture: '',
        link: '',
        status: '启用',
      },
      selectedRows: [],
      userInfo: this.$store.state.userInfo,
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    filteredBanners() {
      return this.tableData.filter(banner => {
        if (this.searchKeyword && !banner.title.includes(this.searchKeyword)) {
          return false;
        }
        return true;
      });
    },
  },
  methods: {
    searchBanners() {
      this.loadBanners();
    },
    resetSearch() {
      this.searchKeyword = '';
      this.loadBanners();
    },
    addNewBanner() {
      this.dialogTitle = '新增轮播图';
      this.form = {
        carouselId: null,
        number: null,
        title: '',
        picture: '',
        link: '',
        status: '启用',
        lastUpdatedBy: this.userInfo.staffName || '未知', // 自动填充更新人
      };
      this.dialogVisible = true;
    },
    editBanner(row) {
      this.dialogTitle = '编辑轮播图';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    deleteBanner(row) {
      ElMessageBox.confirm('确定要删除此轮播图吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteBanner(row.carouselId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadBanners();
          } else {
            ElMessage.error('删除失败');
          }
        });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    saveBanner() {
      if (this.form.carouselId) {
        // 编辑
        addOrUpdateBanner(this.form).then(res => {
          if (res.code === 200) {
            ElMessage.success('编辑成功');
            this.dialogVisible = false;
            this.loadBanners();
          } else {
            ElMessage.error('编辑失败');
          }
        });
      } else {
        // 新增
        addOrUpdateBanner(this.form).then(res => {
          if (res.code === 200) {
            ElMessage.success('新增成功');
            this.dialogVisible = false;
            this.loadBanners();
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

      ElMessageBox.confirm('确定要批量删除选中的轮播图吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.carouselId);
        batchDeleteBanners(ids).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadBanners();
            this.selectedRows = [];
          } else {
            ElMessage.error('批量删除失败');
          }
        });
      }).catch(() => {
        ElMessage.info('已取消批量删除');
      });
    },
    toggleStatus(row) {
      console.log('切换状态:', row);
      
      addOrUpdateBanner(row).then(res => {
        console.log('状态更新响应:', res);
        if (res.code === 200) {
          ElMessage.success('状态更新成功');
        } else {
          ElMessage.error('状态更新失败');
        }
      });
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadBanners();
    },
    loadBanners() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          keyword: this.searchKeyword,
        },
      };

      getBanners(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data;
          this.total = res.total;
        } else {
          ElMessage.error('获取数据失败');
        }
      });
    },
  },
  mounted() {
    this.loadBanners();
  },
};
</script>

<style scoped>
.banner-container {
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

.filter-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.filter-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
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
  margin-bottom: 15px;
}

.el-pagination {
  text-align: center;
}
</style>