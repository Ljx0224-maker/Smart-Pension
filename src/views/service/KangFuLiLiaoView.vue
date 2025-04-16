<template>
  <div class="product-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>康复理疗</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>状态</span>
            <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="已上架" value="已上架"></el-option>
              <el-option label="已下架" value="下架"></el-option>
            </el-select>
          </div>

          <div class="filter-item">
            <span style="margin-left: 70px;">分类</span>
            <el-select v-model="categoryFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="运动康复" value="运动康复"></el-option>
              <el-option label="心理康复" value="心理康复"></el-option>
              <el-option label="神经康复" value="神经康复"></el-option>
            </el-select>
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-item">
            <span>更新日期</span>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 300px;"
            ></el-date-picker>
          </div>

          <div class="filter-item">
            <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="searchProducts" style="margin-left: 10px;">
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
          <el-button type="primary" @click="addNewProduct">新增</el-button>
          <el-button @click="batchDelete" :disabled="selectedRows.length === 0">批量删除</el-button>
        </div>
      </div>

      <el-table
        :data="filteredProducts"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        
        <!-- 商品名称列 -->
        <el-table-column prop="productName" label="商品名称" width="140">
          <template #default="scope">
            <div>{{ scope.row.productName }}</div>
          </template>
        </el-table-column>
        
        <el-table-column label="商品编码" width="120">
          <template #default="scope">
            <div>
              <div>{{ scope.row.productId }}</div>
              <div>{{ scope.row.productCode }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="image" label="商品信息" width="120">
          <template #default="scope">
            <!-- 替换为默认图片 -->
            <img :src="defaultImage" alt="商品图片" class="product-image">
            <div>{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="100"></el-table-column>
        <el-table-column prop="price" label="价格（元）" width="100"></el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已上架' ? 'success' : 'danger'">
              {{ scope.row.status === '已上架' ? '已上架' : '已下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdatedBy" label="最后更新人" width="110"></el-table-column>
        <el-table-column prop="lastUpdatedAt" label="最后更新时间" width="200"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="mini" type="text" @click="editProduct(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" class="delete-btn" @click="removeProduct(scope.row)" style="color: #FFB800;">删除</el-button>
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
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品编码">
            <el-input v-model="form.productCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.category" placeholder="请选择">
              <el-option label="运动康复" value="运动康复"></el-option>
              <el-option label="心理康复" value="心理康复"></el-option>
              <el-option label="神经康复" value="神经康复"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number v-model="form.price" :min="0" :precision="2"></el-input-number>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="已上架" value="已上架"></el-option>
              <el-option label="已下架" value="下架"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品备注">
            <el-input v-model="form.productRemark"></el-input>
          </el-form-item>
          <el-form-item label="服务详情">
            <el-input type="textarea" v-model="form.serviceDetails"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input-number v-model="form.sales" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="服务人数">
            <el-input-number v-model="form.servicePeople" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="服务时长（分钟）">
            <el-input-number v-model="form.serviceDuration" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片">
            <!-- 替换为默认图片，移除上传组件 -->
            <img :src="defaultImage" alt="商品图片" class="product-image">
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProduct">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, RefreshLeft, Plus } from '@element-plus/icons-vue';
import { getKFProductList, addProduct, updateProduct, deleteProduct } from '@/api/service';

// 导入默认图片
import defaultImage from '@/assets/kfll.jpg';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      statusFilter: '',
      categoryFilter: '',
      dateRange: '',
      // 关键字搜索输入框绑定的数据
      searchKeyword: '', 
      dialogVisible: false,
      dialogTitle: '',
      form: {
        id: null,
        name: '',
        productCode: '',
        category: '',
        price: 0,
        status: '',
        productRemark: '',
        serviceDetails: '',
        sales: 0,
        servicePeople: 0,
        serviceDuration: 0,
      },
      selectedRows: [],
      userInfo: this.$store.state.userInfo,
      defaultImage: defaultImage
    };
  },
  components: {
    Search,
    RefreshLeft,
    Plus,
  },
  computed: {
    filteredProducts() {
      return this.tableData.filter(product => {
        // 筛选状态
        if (this.statusFilter && product.status !== this.statusFilter) {
          return false;
        }

        // 筛选分类
        if (this.categoryFilter && product.category !== this.categoryFilter) {
          return false;
        }

        // 筛选日期范围
        if (this.dateRange && product.lastUpdatedAt) {
          const productDate = new Date(product.lastUpdatedAt);
          const startDate = this.dateRange[0];
          const endDate = this.dateRange[1];
          if (productDate < startDate || productDate > endDate) {
            return false;
          }
        }

        // 筛选关键字
        if (this.searchKeyword) {
          const nameMatch = product.name && product.name.includes(this.searchKeyword);
          const productNameMatch = product.productName && product.productName.includes(this.searchKeyword);
          const productCodeMatch = product.productCode && product.productCode.includes(this.searchKeyword);

          if (!nameMatch && !productNameMatch && !productCodeMatch) {
            return false;
          }
        }

        return true;
      });
    },
  },
  methods: {
    generateRandomCode() {
      const timestamp = Date.now().toString(36); 
      const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); 
      return `KF-${timestamp}-${randomPart}`; 
    },
    searchProducts() {
      this.loadProducts();
    },
    resetSearch() {
      this.statusFilter = '';
      this.categoryFilter = '';
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadProducts();
    },
    addNewProduct() {
      this.dialogTitle = '新增商品';
      this.form = {
        id: null,
        name: '', 
        productCode: this.generateRandomCode(), 
        category: '', 
        price: 0, 
        status: '下架', 
        productRemark: '', 
        serviceDetails: '', 
        sales: 0, 
        servicePeople: 0, 
        serviceDuration: 0, 
        serviceType: '康复理疗', 
        lastUpdatedBy: this.userInfo.staffName || '未知', 
      };
      this.dialogVisible = true;
    },
    editProduct(row) {
      this.dialogTitle = '编辑商品';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    removeProduct(row) {
      ElMessageBox.confirm(
        '确定要删除此商品吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        deleteProduct(row.productId) 
          .then(res => {
            if (res.code === 200) { 
              ElMessage.success('删除成功');
              this.loadProducts(); 
            } else {
              ElMessage.error('删除失败: ' + (res.message || '未知错误'));
            }
          })
          .catch(err => {
            ElMessage.error('删除失败: ' + (err.message || '未知错误'));
          });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    saveProduct() {
      const payload = {
        ...this.form,
        productName: this.form.name, 
        status: this.form.status === '已上架' ? '已上架' : '下架', 
        serviceType: '康复理疗', 
      };

      if (this.form.id) {
        updateProduct(payload).then(res => {
          if (res.code === 200) {
            ElMessage.success('编辑成功');
            this.dialogVisible = false;
            this.loadProducts(); 
          } else {
            ElMessage.error('编辑失败: ' + res.message);
          }
        }).catch(err => {
          ElMessage.error('编辑失败: ' + (err.message || '未知错误'));
        });
      } else {
        addProduct(payload).then(res => {
          if (res.code === 200) {
            ElMessage.success('新增成功');
            this.dialogVisible = false;
            this.loadProducts(); 
          } else {
            ElMessage.error('新增失败: ' + res.message);
          }
        }).catch(err => {
          ElMessage.error('新增失败: ' + (err.message || '未知错误'));
        });
      }
    },
    batchDelete() {
      if (this.selectedRows.length === 0) {
        ElMessage.warning('请至少选择一条记录');
        return;
      }

      ElMessageBox.confirm('确定要批量删除选中的商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const productIds = this.selectedRows.map(row => row.productId);
        deleteProduct(productIds).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadProducts();
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
      this.loadProducts();
    },
    loadProducts() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          status: this.statusFilter,
          category: this.categoryFilter,
          keyword: this.searchKeyword,
          serviceType: '康复理疗', 
        },
      };

      if (this.dateRange) {
        params.params.startDate = this.dateRange[0];
        params.params.endDate = this.dateRange[1];
      }

      getKFProductList(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data; 
          this.total = res.total; 
        } else {
          ElMessage.error('商品列表加载失败: ' + (res.message || '未知错误'));
        }
      }).catch(err => {
        ElMessage.error('获取数据失败: ' + (err.message || '未知错误'));
      });
    },
  },
  mounted() {
    this.loadProducts();
  },
};
</script>

<style scoped>
.product-container {
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
  margin-bottom: 15px;
}

.el-pagination {
  text-align: center;
}

.product-image {
  width: 150px;
  height: 100px;
  object-fit: cover;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>