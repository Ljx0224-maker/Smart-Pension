<template>
    <div class="employee-form">
      <div class="header">
        <div class="title">新增员工</div>
      </div>
      
      <div class="form-container">
        <form>
          <div class="form-row">
            <div class="form-group">
              <label for="name">姓名 <span class="required">*</span></label>
              <input type="text" id="name" placeholder="请输入" />
            </div>
            
            <div class="form-group">
              <label for="employee-id">员工编号</label>
              <input type="text" id="employee-id" value="4001009001" readonly />
            </div>
            
            <div class="form-group avatar-group">
              <label>头像</label>
              <div class="avatar-upload">
                <div class="avatar-preview">
                  <img src="" alt="头像" />
                </div>
                <span class="upload-text">+点击上传</span>
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="phone">手机号码 <span class="required">*</span></label>
              <input type="text" id="phone" placeholder="请输入" />
              <div class="hint">登录账号，请确认填写的信息正确</div>
            </div>
            
            <div class="form-group">
              <label for="role">角色</label>
              <select id="role">
                <option value="">请选择</option>
                <option value="admin">管理员</option>
                <option value="staff">员工</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="password">登录密码 <span class="required">*</span></label>
              <input type="password" id="password" placeholder="请输入" />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>状态</label>
              <div class="switch">
                <input type="checkbox" id="status" checked />
                <label for="status">启用</label>
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group full-width">
              <label for="notes">备注</label>
              <textarea id="notes" placeholder="请输入"></textarea>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn save-btn">保存</button>
            <button type="button" class="btn back-btn">返回</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 表单数据
        form: {
          name: '',
          employeeId: '4001009001',
          phone: '',
          role: '',
          password: '',
          status: true,
          notes: ''
        }
      };
    }
  };
  </script>
  
  <style scoped>
  .employee-form {
    font-family: 'Arial', sans-serif;
    padding: 20px;
    background-color: #f8f9fa;
  }
  
  .header {
    margin-bottom: 20px;
  }
  
  .title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
  }
  
  .title::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 20px;
    background-color: #4CAF50;
    margin-right: 10px;
  }
  
  .form-container {
    background-color: white;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .form-row {
    display: flex;
    margin-bottom: 20px;
  }
  
  .form-group {
    flex: 1;
    margin-right: 20px;
  }
  
  .form-group:last-child {
    margin-right: 0;
  }
  
  .full-width {
    flex: 100%;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #666;
  }
  
  .required {
    color: #f44336;
  }
  
  input[type="text"],
  input[type="password"],
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  textarea {
    height: 100px;
    resize: vertical;
  }
  
  .hint {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
  
  .avatar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .avatar-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .avatar-preview {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .avatar-preview img {
    max-width: 100%;
    max-height: 100%;
  }
  
  .upload-text {
    color: #4CAF50;
    cursor: pointer;
  }
  
  .switch {
    display: flex;
    align-items: center;
  }
  
  .switch input[type="checkbox"] {
    display: none;
  }
  
  .switch label {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    background-color: #ddd;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    padding: 0;
  }
  
  .switch input:checked + label {
    background-color: #4CAF50;
  }
  
  .switch label:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: left 0.3s;
  }
  
  .switch input:checked + label:after {
    left: 28px;
  }
  
  .form-actions {
    margin-top: 30px;
    display: flex;
    gap: 15px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .save-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .back-btn {
    background-color: #f0f0f0;
    color: #333;
  }
  </style>