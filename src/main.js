import { createApp } from 'vue'
import { realImg } from '@/directive'
import ElementPlus from 'element-plus'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'
import App from './App.vue'
import router from './router'

import store from './store'
import '@/permission'

import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import './element-variables.scss'
// 需要全局引入再添加
import SvgIcon from './components/SvgIcon.vue' // 全局svg图标组件

const app = createApp(App)

app.directive('img', realImg)

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
])
app.use(store)
app.use(router)
app.use(ElementPlus)

app.component('v-chart', ECharts)
app.component('svg-icon', SvgIcon)

app.mount('#app')
