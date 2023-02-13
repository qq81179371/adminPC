<template>
  <div class="header">
    <h4>智能客服管理系统</h4>
    <span @click="handleToAdmin">进入系统</span>
  </div>
  <div class="contents">
    <div class="fl">
      <v-chart class="chart" :option="option" />
      <v-chart class="chart" :option="option" />
    </div>
    <div class="fr">
      <v-chart class="chart" :option="option" />
      <v-chart class="chart" :option="option" />
    </div>
    <div class="dis_flex">
      <v-chart class="chart mr_30" :option="option1" />
      <v-chart class="chart" :option="option1" />
    </div>
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
import { ref, defineComponent } from 'vue'
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
    // [THEME_KEY]: 'dark'
  },
  setup() {
    const option = ref({
      title: {
        text: 'Traffic Sources',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
      },
      series: [
        {
          name: 'Traffic Sources',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 234, name: 'Ad Networks' },
            { value: 135, name: 'Video Ads' },
            { value: 1548, name: 'Search Engines' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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
    return { option, handleToAdmin, option1 }
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
  padding: 100px 10%;
  background-image: url('./../../assets/images/map.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  // padding: 100px 0 0 0;
  .chart {
  background: rgba($color: #0071C4, $alpha: 0.4);
    width: 400px;
    margin-bottom: 30px;
  }
  .dis_flex {
    width: 100%;
    display: flex;
    .chart {
      flex: 1;
      width: auto;
    }
  }
}
.chart {
  height: 400px;
}
</style>
