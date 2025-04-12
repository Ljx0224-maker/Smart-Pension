<template>
  <div class="service-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>商品分类统计</h2>
      </div>
      <div class="search-box">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入服务类型或分类进行搜索"
          clearable
          class="search-input"
        >
          <template #append>
            <el-button type="primary" @click="searchServices">搜索</el-button>
          </template>
        </el-input>
      </div>
    </div>

    <div class="action-table-box">
      <el-card class="box-card" shadow="hover">
        <el-table :data="filteredClassTableData" style="width: 100%;">
          <el-table-column prop="serviceType" label="服务类型" width="150"></el-table-column>
          <el-table-column prop="category" label="分类" width="150"></el-table-column>
          <el-table-column prop="count" label="数量" width="100"></el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已上架' ? 'success' : 'danger'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdatedBy" label="最后更新人" width="150"></el-table-column>
          <el-table-column prop="lastUpdatedAt" label="最后更新时间" width="200"></el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button type="text" @click="openEditDialog(scope.row)">编辑</el-button>
              <el-button type="text" @click="confirmDelete(scope.row)" style="color: #FF4D4F;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑商品" :visible.sync="editDialogVisible" width="500px">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="服务类型">
          <el-input v-model="editForm.serviceType" disabled></el-input>
        </el-form-item>
        <el-form-item label="旧分类">
          <el-input v-model="editForm.oldCategory" disabled></el-input>
        </el-form-item>
        <el-form-item label="新分类">
          <el-input v-model="editForm.newCategory"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="已上架" value="已上架"></el-option>
            <el-option label="已下架" value="已下架"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { getProductClassList, deleteProduct } from '@/api/service';
import { ElMessageBox, ElMessage } from 'element-plus';
import { editProduct, deleteClassProduct } from '@/api/service'; // 引入编辑和删除接口

export default {
  setup() {
    const classTableData = ref([]);
    const searchKeyword = ref('');
    const editDialogVisible = ref(false);
    const editForm = ref({
      serviceType: '',
      oldCategory: '',
      newCategory: '',
      status: '',
    });

    const fetchProductClassList = async () => {
      try {
        const res = await getProductClassList();
        if (res.code === 200) {
          classTableData.value = res.data;
        } else {
          console.error('获取商品分类统计失败:', res.message);
        }
      } catch (error) {
        console.error('获取商品分类统计失败:', error);
      }
    };

    const filteredClassTableData = computed(() => {
      if (!searchKeyword.value) {
        return classTableData.value;
      }
      return classTableData.value.filter(
        (item) =>
          item.serviceType.includes(searchKeyword.value) ||
          item.category.includes(searchKeyword.value)
      );
    });

    const searchServices = () => {
      console.log('搜索关键字:', searchKeyword.value);
    };

    const openEditDialog = (row) => {
      editForm.value = {
        serviceType: row.serviceType,
        oldCategory: row.category,
        newCategory: row.category,
        status: row.status,
      };
      editDialogVisible.value = true;
    };

    const submitEdit = async () => {
      try {
        const res = await editProduct(editForm.value);
        if (res.code === 200) {
          ElMessage.success('编辑成功');
          editDialogVisible.value = false;
          fetchProductClassList(); // 刷新列表
        } else {
          ElMessage.error('编辑失败: ' + res.message);
        }
      } catch (error) {
        ElMessage.error('编辑失败: ' + error.message);
      }
    };

    const confirmDelete = (row) => {
      ElMessageBox.confirm(
        `确定要删除服务类型 "${row.serviceType}" 下的分类 "${row.category}" 吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          try {
            const res = await deleteClassProduct({
              serviceType: row.serviceType,
              category: row.category,
            });
            if (res.code === 200) {
              ElMessage.success('删除成功');
              fetchProductClassList(); // 刷新列表
            } else {
              ElMessage.error('删除失败: ' + res.message);
            }
          } catch (error) {
            ElMessage.error('删除失败: ' + error.message);
          }
        })
        .catch(() => {
          ElMessage.info('已取消删除');
        });
    };

    const removeProduct = (row) => {
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
              fetchProductClassList();
            } else {
              ElMessage.error('删除失败: ' + (res.message || '未知错误'));
            }
          })
          .catch(err => {
            console.error('Delete error:', err);
            ElMessage.error('删除失败: ' + (err.message || '未知错误'));
          });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    };

    onMounted(() => {
      fetchProductClassList();
    });

    return {
      classTableData,
      searchKeyword,
      filteredClassTableData,
      searchServices,
      editDialogVisible,
      editForm,
      openEditDialog,
      submitEdit,
      confirmDelete,
      removeProduct,
    };
  },
};
</script>

<style scoped>
.service-container {
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

.search-box {
  margin-top: 10px;
}

.search-input {
  width: 400px;
}

.action-table-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-table {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}
</style>