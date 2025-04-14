<template>
  <div class="media-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>视频列表</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span style="margin-left: 0px;">标签</span>
            <el-select v-model="tagFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="心血管" value="心血管"></el-option>
              <el-option label="健康" value="健康"></el-option>
              <el-option label="糖尿病" value="糖尿病"></el-option>
              <el-option label="预防" value="预防"></el-option>
              <el-option label="心理健康" value="心理健康"></el-option>
              <el-option label="老年人" value="老年人"></el-option>
              <el-option label="高血压" value="高血压"></el-option>
              <el-option label="睡眠" value="睡眠"></el-option>
              <el-option label="视力保护" value="视力保护"></el-option>
              <el-option label="用药安全" value="用药安全"></el-option>
              <el-option label="运动" value="运动"></el-option>
              <el-option label="疾病预防" value="疾病预防"></el-option>
              <el-option label="饮食" value="饮食"></el-option>
              <el-option label="营养" value="营养"></el-option>
              <el-option label="听力保护" value="听力保护"></el-option>
              <el-option label="口腔健康" value="口腔健康"></el-option>
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
            <el-button type="primary" @click="searchVideos" style="margin-left: 10px;">
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
          <el-button type="primary" @click="addNewVideo">新增</el-button>
          <el-button @click="batchDelete">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="filteredVideos"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="healthLectureName" label="视频名称"></el-table-column>
        <el-table-column label="视频标签">
          <template #default="scope">
            <el-tag
              v-for="tag in scope.row.tag"
              :key="tag"
              :type="getTagType(tag)"
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="love" label="点赞"></el-table-column>
        <el-table-column prop="collect" label="收藏"></el-table-column>
        <el-table-column prop="share" label="分享"></el-table-column>
        <el-table-column prop="comment" label="评论"></el-table-column>
        <el-table-column prop="lastUpdatedBy" label="更新人"></el-table-column>
        <el-table-column prop="lastUpdatedAt" label="最后更新时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="editVideo(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteVideo(scope.row)" style="color: #FFB800;">删除</el-button>
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
          <el-form-item label="视频名称">
            <el-input v-model="form.healthLectureName"></el-input>
          </el-form-item>
          <el-form-item label="视频标签">
            <el-select v-model="form.tag" multiple placeholder="请选择">
              <el-option label="心血管" value="心血管"></el-option>
              <el-option label="健康" value="健康"></el-option>
              <el-option label="糖尿病" value="糖尿病"></el-option>
              <el-option label="预防" value="预防"></el-option>
              <el-option label="心理健康" value="心理健康"></el-option>
              <el-option label="老年人" value="老年人"></el-option>
              <el-option label="高血压" value="高血压"></el-option>
              <el-option label="睡眠" value="睡眠"></el-option>
              <el-option label="视力保护" value="视力保护"></el-option>
              <el-option label="用药安全" value="用药安全"></el-option>
              <el-option label="运动" value="运动"></el-option>
              <el-option label="疾病预防" value="疾病预防"></el-option>
              <el-option label="饮食" value="饮食"></el-option>
              <el-option label="营养" value="营养"></el-option>
              <el-option label="听力保护" value="听力保护"></el-option>
              <el-option label="口腔健康" value="口腔健康"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveVideo">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { getVideos, addVideo, updateVideo, deleteVideo, batchDeleteVideos } from '@/api/banner';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tagFilter: '',
      dateRange: '',
      searchKeyword: '',
      dialogVisible: false,
      dialogTitle: '',
      form: {
        healthLectureId: null,
        healthLectureName: '',
        tag: [],
        love: 0,
        collect: 0,
        share: 0,
        comment: 0,
        lastUpdatedAt: new Date().toISOString(),
      },
      selectedRows: [],
      userInfo: this.$store.state.userInfo, // 从 Vuex 获取当前登录用户信息
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    filteredVideos() {
      return this.tableData.filter(video => {
        // 筛选标签
        if (this.tagFilter && !video.tag.includes(this.tagFilter)) {
          return false;
        }

        // 筛选日期范围
        if (this.dateRange && video.lastUpdatedAt) {
          const videoDate = new Date(video.lastUpdatedAt);
          const startDate = this.dateRange[0];
          const endDate = this.dateRange[1];
          if (videoDate < startDate || videoDate > endDate) {
            return false;
          }
        }

        // 筛选关键字
        if (this.searchKeyword && !video.healthLectureName.includes(this.searchKeyword)) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    getTagType(tag) {
      if (tag === '心血管') {
        return 'info';
      } else if (tag === '健康') {
        return 'success';
      } else if (tag === '糖尿病') {
        return 'warning';
      } else if (tag === '预防') {
        return 'primary';
      } else if (tag === '心理健康') {
        return 'danger';
      } else if (tag === '老年人') {
        return 'info';
      } else if (tag === '高血压') {
        return 'warning';
      } else if (tag === '睡眠') {
        return 'primary';
      } else if (tag === '视力保护') {
        return 'success';
      } else if (tag === '用药安全') {
        return 'danger';
      } else if (tag === '运动') {
        return 'info';
      } else if (tag === '疾病预防') {
        return 'warning';
      } else if (tag === '饮食') {
        return 'primary';
      } else if (tag === '营养') {
        return 'success';
      } else if (tag === '听力保护') {
        return 'info';
      } else if (tag === '口腔健康') {
        return 'warning';
      }
      return '';
    },
    searchVideos() {
      this.loadVideos();
    },
    resetSearch() {
      this.statusFilter = '';
      this.tagFilter = '';
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadVideos();
    },
    addNewVideo() {
      this.dialogTitle = '新增视频';
      this.form = {
        healthLectureId: null,
        healthLectureName: '',
        tag: [],
        love: 0,
        collect: 0,
        share: 0,
        comment: 0,
        lastUpdatedAt: new Date().toISOString(),
        lastUpdatedBy: this.userInfo.staffName || '未知', // 自动填充更新人
      };
      this.dialogVisible = true;
    },
    editVideo(row) {
      this.dialogTitle = '编辑视频';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    deleteVideo(row) {
      ElMessageBox.confirm(
        '确定要删除此视频吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        deleteVideo(row.healthLectureId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadVideos();
          } else {
            ElMessage.error('删除失败');
          }
        });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    saveVideo() {
      const formData = {
        ...this.form,
        tag: this.form.tag.join('、'), // 将数组转换为字符串
      };

      if (this.form.healthLectureId) {
        // 编辑
        updateVideo(this.form.healthLectureId, formData).then(res => {
          if (res.code === 200) {
            ElMessage.success('编辑成功');
            this.dialogVisible = false;
            this.loadVideos();
          } else {
            ElMessage.error('编辑失败');
          }
        });
      } else {
        // 新增
        addVideo(formData).then(res => {
          if (res.code === 200) {
            ElMessage.success('新增成功');
            this.dialogVisible = false;
            this.loadVideos();
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

      ElMessageBox.confirm('确定要批量删除选中的视频吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.healthLectureId);
        batchDeleteVideos(ids).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadVideos();
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
      this.loadVideos();
    },
    loadVideos() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          tag: this.tagFilter,
          keyword: this.searchKeyword,
        },
      };

      if (this.dateRange) {
        params.params.startDate = this.dateRange[0];
        params.params.endDate = this.dateRange[1];
      }

      getVideos(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.map(item => ({
            ...item,
            tag: item.tag ? item.tag.split('、') : [], // 将字符串分解为数组
          }));
          this.total = res.total;
        } else {
          ElMessage.error('获取数据失败');
        }
      });
    },
  },
  mounted() {
    this.loadVideos();
  },
};
</script>

<style scoped>
.media-container {
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
  margin-left: 0px;
  align-items: flex-start;
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

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.tag-item {
  margin-right: 3px;
  margin-bottom: 3px;
}
</style>