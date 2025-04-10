<template>
  <div class="product-list-view">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <span>康复理疗商品管理</span>
        <el-button style="float: right;" type="primary" @click="addProduct">新增</el-button>
        <el-button style="float: right; margin-right: 10px;" @click="batchAction">批量操作</el-button>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="filter.keyword" placeholder="请输入关键字"></el-input>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="resetFilters">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="image" label="商品信息" width="180">
          <template #default="scope">
            <img :src="scope.row.image" alt="商品图片" class="product-image">
            <div>{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="productCode" label="商品编码" width="150"></el-table-column>
        <el-table-column prop="category" label="分类" width="100"></el-table-column>
        <el-table-column prop="price" label="价格（元）" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已上架' ? 'success' : 'danger'">
              {{ scope.row.status === '已上架' ? '已上架' : '已下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdatedBy" label="最后更新人" width="180"></el-table-column>
        <el-table-column prop="lastUpdatedAt" label="最后更新时间" width="200"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="mini" type="text" @click="editProduct(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" class="delete-btn" @click="removeProduct(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getKFProductList, addProduct, deleteProduct, updateProduct } from '@/api/service';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

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

    // 获取康复理疗商品列表
    const fetchProductList = async () => {
      try {
        const res = await getKFProductList(filter.value);
        if (res.code === 200) {
          tableData.value = res.data;
        } else {
          console.error('获取商品列表失败:', res);
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
        const res = await deleteProduct(row.productCode);
        if (res.success) {
          ElMessage.success('商品删除成功');
          fetchProductList();
        } else {
          ElMessage.error('商品删除失败');
        }
      } catch (error) {
        console.error('删除商品失败:', error);
        ElMessage.error('删除商品失败');
      }
    };

    return {
      tableData,
      filter,
      search,
      resetFilters,
      addProduct,
      batchAction,
      editProduct,
      removeProduct
    };
  }
};
</script>

<style scoped>
.product-list-view {
  padding: 20px;
}

.box-card {
  background-color: #fff;
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