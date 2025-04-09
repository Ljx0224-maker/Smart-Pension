<template>
    <div class="news-container">
      <div class="filter-section">
        <div class="filter-item">
          <span>发布日期</span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px;"
          ></el-date-picker>
        </div>
  
        <div class="filter-item">
          <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
          <el-button type="primary" @click="searchNews">
            <el-icon><Search/></el-icon>
          </el-button>
          <el-button @click="resetSearch">
            <el-icon><RefreshLeft/></el-icon>
          </el-button>
        </div>
      </div>
  
      <div class="action-table-box">
        <div class="action-section">
          <div class="action-buttons">
            <el-button @click="batchDelete">批量操作</el-button>
          </div>
        </div>
  
        <el-table
          :data="filteredNews"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="content" label="内容">
            <template #default="scope">
              <div class="news-content">
                <img :src="scope.row.image" alt="动态图片" class="news-image">
                <div class="news-text">{{ scope.row.content }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="topic" label="话题"></el-table-column>
          <el-table-column prop="likes" label="点赞"></el-table-column>
          <el-table-column prop="favorites" label="收藏"></el-table-column>
          <el-table-column prop="shares" label="分享"></el-table-column>
          <el-table-column prop="comments" label="评论"></el-table-column>
          <el-table-column label="发布人">
            <template #default="scope">
              <div class="publisher">
                <img :src="scope.row.publisherAvatar" alt="发布人头像" class="publisher-avatar">
                <div class="publisher-info">
                  <div class="publisher-name">{{ scope.row.publisherName }}</div>
                  <div class="publisher-id">{{ scope.row.publisherId }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" label="发布时间"></el-table-column>
          <el-table-column label="状态">
            <template #default="scope">
              <el-switch
                v-model="scope.row.visible"
                active-text="显示"
                inactive-text="隐藏"
                @change="toggleVisibility(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button type="text" @click="deleteNews(scope.row)">删除</el-button>
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
    </div>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus';
  import {Search,RefreshLeft  } from '@element-plus/icons-vue'
  import { getNews, updateNewsVisibility, deleteNews, batchDeleteNews } from '@/api/banner';
  
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            content: '今天，阳光正好，忍不住出门去公园散散步，散步的过程中，我遇到了一位老友...',
            topic: '摄影',
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            publisherName: '笑看人生',
            publisherId: '19288664488',
            publisherAvatar: 'https://via.placeholder.com/40',
            publishTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
            visible: true,
          },
          {
            id: 2,
            content: '今天，阳光正好，忍不住出门去公园散散步，散步的过程中，我遇到了一位老友...',
            topic: '摄影',
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            publisherName: '笑看人生',
            publisherId: '19288664488',
            publisherAvatar: 'https://via.placeholder.com/40',
            publishTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
            visible: true,
          },
          {
            id: 3,
            content: '今天，阳光正好，忍不住出门去公园散散步，散步的过程中，我遇到了一位老友...',
            topic: '摄影',
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            publisherName: '笑看人生',
            publisherId: '19288664488',
            publisherAvatar: 'https://via.placeholder.com/40',
            publishTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
            visible: true,
          },
          {
            id: 4,
            content: '今天，阳光正好，忍不住出门去公园散散步，散步的过程中，我遇到了一位老友...',
            topic: '摄影',
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            publisherName: '笑看人生',
            publisherId: '19288664488',
            publisherAvatar: 'https://via.placeholder.com/40',
            publishTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
            visible: true,
          },
          {
            id: 5,
            content: '今天，阳光正好，忍不住出门去公园散散步，散步的过程中，我遇到了一位老友...',
            topic: '摄影',
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            publisherName: '笑看人生',
            publisherId: '19288664488',
            publisherAvatar: 'https://via.placeholder.com/40',
            publishTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
            visible: true,
          },
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        dateRange: '',
        searchKeyword: '',
        selectedRows: [],
      };
    },
    components:{
        Search,
        RefreshLeft

    },
    computed: {
      filteredNews() {
        return this.tableData.filter(news => {
          // 筛选日期范围
          if (this.dateRange && news.publishTime) {
            const newsDate = new Date(news.publishTime);
            const startDate = this.dateRange[0];
            const endDate = this.dateRange[1];
            if (newsDate < startDate || newsDate > endDate) {
              return false;
            }
          }
  
          // 筛选关键字
          if (this.searchKeyword && !news.content.includes(this.searchKeyword)) {
            return false;
          }
  
          return true;
        });
      },
    },
    methods: {
      searchNews() {
        // 搜索功能
      },
      resetSearch() {
        this.dateRange = '';
        this.searchKeyword = '';
      },
      toggleVisibility(row) {
        updateNewsVisibility(row.id, { visible: row.visible }).then(res => {
          if (res.code === 200) {
            ElMessage.success(row.visible ? '显示成功' : '隐藏成功');
          } else {
            ElMessage.error(row.visible ? '显示失败' : '隐藏失败');
            row.visible = !row.visible; // 恢复原状态
          }
        });
      },
      deleteNews(row) {
        this.$confirm('确定要删除此动态吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteNews(row.id).then(res => {
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
      batchDelete() {
        if (this.selectedRows.length === 0) {
          ElMessage.warning('请至少选择一条记录');
          return;
        }
  
        this.$confirm('确定要批量删除选中的动态吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const ids = this.selectedRows.map(row => row.id);
          batchDeleteNews(ids).then(res => {
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
  .news-container {
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
  
  .news-content {
    display: flex;
    align-items: center;
  }
  
  .news-image {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  
  .publisher {
    display: flex;
    align-items: center;
  }
  
  .publisher-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  </style>