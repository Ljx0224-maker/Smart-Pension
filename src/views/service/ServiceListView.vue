<template>
  <div class="service-list-view">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <span>商品管理</span>
        <el-button style="float: right;" type="primary" @click="addProduct">新增</el-button>
        <el-button style="float: right; margin-right: 10px;" @click="batchAction">批量操作</el-button>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="分类">
          <el-select v-model="filter.category" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="生活照料" value="livingCare"></el-option>
            <!-- Add more categories as needed -->
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filter.status" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="已上架" value="listed"></el-option>
            <el-option label="已下架" value="unlisted"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="filter.minPrice" placeholder="最低价格"></el-input>
          <el-input v-model="filter.maxPrice" placeholder="最高价格"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="filter.date" type="daterange" placeholder="选择日期范围"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="resetFilters">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="category" label="分类" width="150"></el-table-column>
        <el-table-column prop="serviceType" label="服务类型" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已上架' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdatedBy" label="最后更新人" width="150"></el-table-column>
        <el-table-column prop="lastUpdatedAt" label="最后更新时间" width="200"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="mini" type="text" @click="editProduct(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" class="delete-btn" @click="removeProduct(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
        v-model:current-page="currentPage"
        :page-size="pageSize"
        @current-change="fetchProductList"
      />
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getProductList, addProduct, deleteProduct, updateProduct } from '@/api/service';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
  setup() {
    const router = useRouter();
    const tableData = ref([]);
    const filter = ref({
      category: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      date: [],
      keyword: ''
    });
    const total = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(10);

    // 获取商品列表
    const fetchProductList = async () => {
      try {
        const params = {
          category: filter.value.category,
          status: filter.value.status,
          minPrice: filter.value.minPrice,
          maxPrice: filter.value.maxPrice,
          keyword: filter.value.keyword,
          pageNum: currentPage.value, // 当前页码
          pageSize: pageSize.value,   // 每页条数
        };

        // 转换日期范围
        if (filter.value.date.length === 2) {
          params.startDate = filter.value.date[0];
          params.endDate = filter.value.date[1];
        }

        const res = await getProductList(params);
        if (res.code === 200) {
          tableData.value = res.data; // 将后端返回的商品列表赋值给表格数据
          total.value = res.total;   // 设置总记录数
        } else {
          console.error('获取商品列表失败:', res.message);
          tableData.value = [];
        }
      } catch (error) {
        console.error('获取商品列表失败:', error);
        ElMessage.error('获取商品列表失败');
        tableData.value = [];
      }
    };

    onMounted(() => {
      fetchProductList();
    });

    const search = () => {
      fetchProductList();
    };

    const resetFilters = () => {
      filter.value = {
        category: '',
        status: '',
        minPrice: '',
        maxPrice: '',
        date: [],
        keyword: ''
      };
      fetchProductList(); // 重置后重新加载数据
    };

    const addProduct = () => {
      // 跳转到添加商品页面
      router.push('/product/addProduct');
    };

    const batchAction = () => {
      // 批量操作的逻辑
      console.log('批量操作');
    };

    const editProduct = (row) => {
      // 跳转到编辑商品页面
      router.push({ path: '/product/editProduct', query: { productId: row.productCode } });
    };

    const removeProduct = async (row) => {
      try {
        const confirm = await ElMessageBox.confirm(
          '确定要删除该商品吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        );

        if (confirm) {
          const res = await deleteProduct(row.productCode);
          if (res.code === 200) {
            ElMessage.success('商品删除成功');
            fetchProductList(); // 重新加载商品列表
          } else {
            ElMessage.error('商品删除失败');
          }
        }
      } catch (error) {
        console.error('删除商品失败:', error);
        ElMessage.error('删除商品失败');
      }
    };

    return {
      tableData,
      filter,
      total,
      currentPage,
      pageSize,
      search,
      resetFilters,
      addProduct,
      batchAction,
      editProduct,
      removeProduct,
    };
  }
};
</script>

<style scoped>
.service-list-view {
  padding: 20px;
  background-color: #fff;
}

.box-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.delete-btn {
  color: #f56c6c;
  border: none;
}
</style>