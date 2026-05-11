# 智慧养老综合管理平台

![Vue.js](https://img.shields.io/badge/Vue.js-Framework-4FC08D?logo=vue.js) ![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite) ![Vuex](https://img.shields.io/badge/Vuex-State_Management-4FC08D) ![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4)

## 项目简介
本项目是“智慧养老”综合服务平台的管理系统。系统包含web前端和小程序用户端，旨在通过数字化手段，为养老机构、社区及居家老人提供全方位的健康照护与生活服务管理。

## 核心业务模块
系统覆盖了现代智慧养老业务的完整闭环，主要包含以下功能模块：

* **数据大盘与统计**
  * **首页控制台**：提供实时服务数据看板与趋势图表展示。
  * **交易与数据中心**：多维度的财务与服务订单数据统计与分析。
* **健康管理**
  * **用户档案管理**：用户基础信息录入、标签化管理。
  * **健康与监测详情**：包含体征健康数据、智能穿戴设备绑定以及用药记录追踪。
* **服务调度**
  * 分类涵盖：家政护理、康复理疗、上门体检 等标准化服务的上架与派单管理。
* **订单与财务中台**
  * 支撑全流程订单生命周期管理，包含：订单列表查询、售后退款审核及服务资金结算。
* **运营与营销中心**
  * **营销活动**：积分商城、优惠券发放及核销管理。
  * **日常运营**：养老机构信息维护、健康菜谱定制、疾病管理、线下活动报名及资讯 Banner 轮播配置。
* **权限与配置 (Staff & Settings)**
  * 员工管理、系统设置及服务协议维护。

## 技术栈选型
* **核心框架**: Vue.js
* **状态管理**: Vuex
* **路由管理**: Vue Router
* **网络请求**: Axios
* **图表可视化**: ECharts

## 项目目录结构
```text
Smart-Pension/
├── src/
│   ├── api/            # 集中管理后端 API 请求 (分模块如 order.js, user.js, marketing.js 等)
│   ├── assets/         # 静态资源 (图片、字体、全局 CSS)
│   ├── components/     # 全局复用组件 (如面包屑 BreadCrumbCom, 侧边栏 AsideCom, 图表组件)
│   ├── router/         # Vue Router 路由配置文件
│   ├── store/          # Vuex 状态管理模块
│   ├── utils/          # 工具类函数 (如 request.js 的 Axios 拦截器配置)
│   └── views/          # 核心页面视图 (按业务模块划分)
├── public/             # 公共静态文件 (如 favicon.png)
├── index.html          # 项目入口模板
├── vite.config.js      # Vite 构建配置文件
└── package.json        # 项目依赖配置
```

**注：本存储库只有web前端代码**

## 界面效果部分展示：
<img width="2209" height="1199" alt="登录" src="https://github.com/user-attachments/assets/ac2f4762-fa16-4a40-aa09-1f6f8e5c2dbe" />
<img width="2196" height="1197" alt="首页-工作台" src="https://github.com/user-attachments/assets/fec404ed-495c-4446-8bd1-62d90f0a7ea6" />
<img width="2184" height="1203" alt="首页-预约看板" src="https://github.com/user-attachments/assets/dd7ba877-68ec-4fbf-b15b-24ea7e990b81" />
<img width="1657" height="894" alt="全部服务人员列表" src="https://github.com/user-attachments/assets/4239c4fe-1973-43b5-96d2-155fd6b04de4" />
<img width="992" height="826" alt="编辑服务人员信息" src="https://github.com/user-attachments/assets/dff81d68-6614-4a9b-9dcc-6aa1a77c9823" />
<img width="1845" height="921" alt="用户概况" src="https://github.com/user-attachments/assets/11c6af7a-f94f-44a9-9036-8b23b4f0684b" />
<img width="2182" height="1215" alt="交易管理-订单列表" src="https://github.com/user-attachments/assets/19dbf0c8-a0cf-43c9-a89b-7b3669704743" />
<img width="1838" height="919" alt="用户列表" src="https://github.com/user-attachments/assets/63d3a436-4fdc-4830-944e-ad1f70a42ed6" />
<img width="2199" height="1200" alt="消息管理-会话" src="https://github.com/user-attachments/assets/226eb5cd-aff2-4f3f-969b-60349f87651b" />

