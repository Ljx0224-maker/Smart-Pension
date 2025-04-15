<template>
    <div class="appointment-board">
      <div class="page-header">
        <span>预约看板</span>
      </div>
      <div class="filter-section">
        <div class="filter-item">
          <span>选择日期</span>
          <el-date-picker v-model="filter.date" type="date" placeholder="请选择日期"></el-date-picker>
        </div>
        <div class="filter-item">
          <span>服务人员</span>
          <el-select v-model="filter.staff" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="王小倩" value="1"></el-option>
            <el-option label="李明" value="2"></el-option>
            <el-option label="张三" value="3"></el-option>
            <el-option label="赵四" value="4"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <span>服务类型</span>
          <el-select v-model="filter.serviceType" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="家政护工" value="1"></el-option>
            <el-option label="康复理疗" value="2"></el-option>
            <el-option label="上门体检" value="3"></el-option>
            <el-option label="心理咨询" value="4"></el-option>
          </el-select>
        </div>
      </div>
      <div class="timeline-container">
        <div class="timeline">
          <div class="time-slot" v-for="(time, index) in timeSlots" :key="index">
            <div class="time">{{ time }}</div>
            <div class="appointments">
              <div class="appointment-card" v-for="(appointment, idx) in appointments[index]" :key="idx">
                <div class="appointment-title">{{ appointment.title }}</div>
                <div class="appointment-details">
                  <div class="appointment-time">时间: {{ appointment.time }}</div>
                  <div class="appointment-user">用户: {{ appointment.user }}</div>
                </div>
                <div class="appointment-status">
                  <el-avatar :src="appointment.avatar" size="small"></el-avatar>
                  <span>{{ appointment.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filter: {
          date: '',
          staff: '',
          serviceType: ''
        },
        timeSlots: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        appointments: [
          [
            {
              title: '肌力增强训练',
              time: '9:00-10:00',
              user: '王强',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
              status: '已完成'
            }
          ],
          [
            {
              title: '全屋清洁',
              time: '10:00-11:00',
              user: '王强',
              avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
              status: '服务中'
            }
          ],
          [
            {
              title: '心理咨询',
              time: '11:00-12:00',
              user: '李明',
              avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
              status: '服务中'
            }
          ],
          [
            {
              title: '上门体检',
              time: '12:00-13:00',
              user: '张三',
              avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
              status: '待开始'
            }
          ],
          [
            {
              title: '康复理疗',
              time: '13:00-14:00',
              user: '赵四',
              avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
              status: '待开始'
            }
          ],
          [
            {
              title: '家政护工',
              time: '14:00-15:00',
              user: '王强',
              avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
              status: '待开始'
            }
          ],
          [
            {
              title: '心理咨询',
              time: '15:00-16:00',
              user: '李明',
              avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
              status: '待开始'
            }
          ],
          [
            {
              title: '全屋清洁',
              time: '16:00-17:00',
              user: '张三',
              avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
              status: '待开始'
            }
          ],
          []
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .appointment-board {
    max-width: 1200px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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
  
  .page-header span {
    font-size: 24px;
    font-weight: bold;
  }
  
  .filter-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .filter-item {
    display: flex;
    align-items: center;
  }
  
  .filter-item span {
    margin-right: 10px;
    min-width: 80px;
  }
  
  .timeline-container {
    margin-top: 20px;
  }
  
  .timeline {
    border-left: 1px solid #e6e6e6;
    padding-left: 20px;
  }
  
  .time-slot {
    position: relative;
    margin-bottom: 30px;
  }
  
  .time {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .appointments {
    background-color: #f9f9f9;
    border-radius: 4px;
    padding: 10px;
  }
  
  .appointment-card {
    background-color: #fff;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .appointment-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .appointment-details {
    margin-bottom: 10px;
    font-size: 14px;
    color: #666;
  }
  
  .appointment-status {
    display: flex;
    align-items: center;
  }
  
  .appointment-status span {
    margin-left: 10px;
    color: #4fc3f7;
  }
  </style>