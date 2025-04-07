import {createStore} from "vuex";
// 导入数据持久化操作的创建函数
import createPersistedstate from 'vuex-persistedstate'

// 定义全局状态的实例
const store = createStore({
    // 严格模式,在生产环境中不要打开
    strict: process.env.NODE_ENV !== 'production',
    state(){
        //全局状态
        return{
            count:100,
            // 放用户信息的对象
            userInfo:{},
            // 记录当前的路由路径
            currentPath:'/'
        }
    },
    //唯一修改数据的方法，不支持异步，尽量不要在里面做异步
    mutations:{
        add(state){
            //setTimeout(()=>{
                state.count++
            //},5000)
        },

        addnum(state,value){
            state.count+=value
        },
        // 保存用户数据
        updateUserInfo(state,value){
            state.userInfo = value

        },
        // 修改路由路径的方法
        updateCurrentPath(state,value){
            state.currentPath=value
        }


    },
    //异步修改数据的地方，同步commit，异步dispatch
    actions:{
        addActions(context){
            console.log(context);

            setTimeout(()=>{
                // 所谓的异步也还要调用同步到方法来进行修改数据
                context.commit('add')
            },5000)
            
        },
        addnumActions({commit},value){
            commit('addnum',value)
        }
    },
    //Vuex中的计算属性
    getters:{
        
    },
    //状态模块
    modules:{

    },
    //vuex配置插件
    plugins:[
        // 创建持久化对象
        createPersistedstate({
            // 配置需要持久化的数据
            reducer:state=>{
                return{
                    // 需要持久化的数据
                    userInfo:state.userInfo
                }
            }
        })
    ]
})

// 导出创建好的对应实例
export default store