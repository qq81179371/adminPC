<template>
  <div class="search_bar">
    <span class="label">机型: </span>
    <el-input
      v-model="listQuery.kw"
      placeholder="请输入内容"
      @keyup.enter="handleRefresh"
      @clear="handleRefresh"
      size="small"
      clearable
    ></el-input>
    <span class="label ml_30">时间段: </span>
    <el-date-picker
      size="small"
      v-model="time"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="YYYY-MM-DD"
    >
    </el-date-picker>
  </div>
  <div class="contents">
    <v-chart class="chart" :option="option" />
    <v-chart class="chart" :option="option1" />
  </div>
</template>
<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, reactive, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

export default defineComponent({
  name: 'HelloWorld',
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: '#fff'
  },
  setup() {
    const listQuery = reactive({
      kw: '',
      time: ''
    })
    const option = ref({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    })
    const option1 = ref({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    })

    const router = useRouter()
    const handleToAdmin = () => {
      router.push({
        name: 'chat'
      })
    }
    const handleRefresh = () => {}
    return {
      option,
      option1,
      listQuery,
      handleToAdmin,
      handleRefresh
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba($color: #0071c4, $alpha: 0.8);
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
  h4 {
    font-size: 18px;
    color: #fff;
  }
  span {
    cursor: pointer;
    font-size: 14px;
    color: #fff;
  }
}
.contents {
  padding: 100px 0 0 0;
  display: flex;
  .chart {
    width: 50%;
  }
}
.chart {
  height: 400px;
}
.search_bar {
  display: flex;
  align-items: center;
  .label {
    margin-right: 5px;
  }
  .el-input {
    width: 300px;
  }
}
</style>
