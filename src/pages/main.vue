<template>
  <!-- 后台首页 -->
  <!-- 订单统计 -->
  <div class="main_top">
    <mainTop v-for="(item, index) in mainList" :item="item" :key="index" />
  </div>
  <!-- 分类 -->
  <div class="fenlei">
    <fen
      @click="goBath(item.path)"
      v-for="(item, index) in fenlei"
      :key="index"
      :item="item"
    />
  </div>
  <!-- 图标 店铺 -->
  <div class="bootom">
    <!-- 图表 -->
    <div class="tubiao">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <template #header>
          <div class="flex justify-between items-center">
            <span>订单统计</span>
            <div>
              <el-check-tag
                @click="handleCheckTag(item.type)"
                v-for="(item, index) in options"
                :key="index"
                :checked="item.type === type"
                style="margin-right: 8px"
                >{{ item.name }}</el-check-tag
              >
            </div>
          </div>
        </template>
        <!-- card body -->
        <div ref="el" id="chart"></div>
      </el-card>
    </div>
    <!-- 商铺 -->
    <div class="shopdian">
      <div class="shop">
        <div class="shop_top tubiao_top">
          <div>店铺及商品提示</div>
          <div class="span">店铺及商品提示</div>
        </div>
        <div class="shop_bottom">
          <div class="shop_bottom_box">
            <div
              class="shop_bottom_box_content"
              v-for="(item, index) in goods"
              :key="index"
            >
              <div class="text-xl">{{ item.value }}</div>
              <div class="text-xs">{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="shop" style="margin-top: 10px">
        <div class="shop_top tubiao_top">
          <div>交易提示</div>
          <div class="span">需要立即处理的交易订单</div>
        </div>
        <div class="shop_bottom">
          <div class="shop_bottom_box">
            <div
              class="shop_bottom_box_content"
              v-for="(item, index) in order"
              :key="index"
            >
              <div class="text-xl">{{ item.value }}</div>
              <div class="text-xs">{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import mainTop from '@/components/main/top.vue';
import fen from '@/components/main/fen.vue';
import { getStatistics1, getStatistics2, getStatistics3 } from '@/http/api';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';

const { push } = useRouter();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mainList: any = ref([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let goods: any = ref([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let order: any = ref([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
getStatistics1().then((res: any) => {
  mainList.value = res.panels;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
getStatistics2().then((res: any) => {
  goods.value = res.goods;
  order.value = res.order;
});

const fenlei = reactive([
  {
    title: '用户',
    icon: 'User',
    color: '#0ea5e9',
    path: 'user_user-list_list'
  },
  {
    title: '商品',
    icon: 'ShoppingCart',
    color: '#9165f6',
    path: 'shop_goods_list'
  },
  {
    title: '订单',
    icon: 'Tickets',
    color: '#d946ef',
    path: ''
  },
  {
    title: '评价',
    icon: 'ChatDotSquare',
    color: '#5ccec1',
    path: 'shop_comment_list'
  },
  {
    title: '图库',
    icon: 'Picture',
    color: '#f6627b',
    path: ''
  },
  {
    title: '公告',
    icon: 'Bell',
    color: '#1fbd88',
    path: ''
  },
  {
    title: '配置',
    icon: 'SetUp',
    color: '#979798',
    path: ''
  },
  {
    title: '优惠券',
    icon: 'Files',
    color: '#f59e0b',
    path: 'shop_coupon_list'
  }
]);

// 点击分类 跳转
let goBath = (e: string) => {
  push(e);
};

const type = ref('week');
const options = [
  { name: '近1个月', type: 'month' },
  { name: '近1周', type: 'week' },
  { name: '近24小时', type: 'hour' }
];
const handleCheckTag = (item: string) => {
  // console.log(item);

  type.value = item;
  // console.log(type.value);
  getData();
};

var myChart: any = null;
onMounted(() => {
  var chartDom: any = document.getElementById('chart');
  myChart = echarts.init(chartDom);
  getData(chartDom, myChart);
});

const getData = async () => {
  var option;

  option = {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  try {
    const res: any = await getStatistics3(type.value);
    console.log(res);

    option.xAxis.data = res.x;
    option.series[0].data = res.y;
  } catch (error) {
    // console.log(error);
  }

  option && myChart.setOption(option);
};
const el = ref(null);
</script>

<style lang="scss">
#chart {
  width: 100%;
  height: 300px;
}
.main_top {
  width: 100%;
  @apply flex justify-center items-start;
}
.fenlei {
  width: 100%;
  @apply flex justify-between items-start;
}
.main_top__box_top {
  border-bottom: 1px solid #ccc;
  @apply bg-light-300 flex justify-between items-center p-2 text-sm;
}
.bootom {
  width: 100%;
  height: 387px;
  @apply flex justify-between items-center;
  .shopdian {
    flex: 1;
    height: 100%;
    padding: 0 10px;

    .shop_bottom {
      background-color: #fff;
      @apply flex justify-between items-center;
      .shop_bottom_box {
        width: 100%;
        height: 130px;
        background-color: #fff;
        @apply flex justify-around items-center;
        .shop_bottom_box_content {
          flex: 1;
          height: 90px;
          background-color: #f6f6f6 !important;
          margin: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          div {
            text-align: center;
          }
        }
        .shop_bottom_box_content:hover {
          @apply shadow-md;
        }
      }
      .shop_bottom-content:hover {
        @apply shadow-md;
      }
    }
  }
  .tubiao {
    flex: 1;
    height: 100%;
    background-color: #fff;

    .tubiao_bot {
      height: calc(100% - 30px);
      margin: 10px;
      padding: 0 10px;
    }
  }
  .tubiao_top {
    padding: 10px;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ccc;
    background-color: #f9fafb;
    @apply flex justify-between items-center text-sm;
  }
}

.span {
  border: 1px solid red;
  padding: 2px 5px;
  border-radius: 4px;
  color: red;
}

.tubiao_top_right {
  @apply flex justify-between items-center;
  span {
    display: inline-block;
    padding: 2px 5px;
    margin: 0 5px;
    background-color: #f4f4f5;
  }
}
.shop_top {
  @apply flex justify-between items-center;
}
</style>
