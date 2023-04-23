<!-- 商品管理 -->
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
    <el-tab-pane label="全部" name="all"></el-tab-pane>
    <el-tab-pane label="审核中" name="审核中"></el-tab-pane>
    <el-tab-pane label="出售中" name="出售中"></el-tab-pane>
    <el-tab-pane label="已下架" name="已下架"></el-tab-pane>
    <el-tab-pane label="库存预警" name="库存预警"></el-tab-pane>
    <el-tab-pane label="回收站" name="回收站"></el-tab-pane>
  </el-tabs>
  <div class="content">
    <el-form
      size="small"
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="关键词">
        <el-input v-model="formInline.user" placeholder="商品名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button>重置</el-button>
        <el-button v-if="zhan" @click="zhan = !zhan" type="primary" link>
          展开
          <el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </el-button>
        <el-button v-else @click="zhan = !zhan" type="primary" link>
          收起
          <el-icon class="el-icon--right"><ArrowUp /></el-icon>
        </el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" v-permission="['getStatistics1,GET']"
      >新增</el-button
    >
    <el-button type="danger" v-permission="['getStatistics3,GET']"
      >批量删除</el-button
    >
    <el-button v-permission="['getStatistics2,GET']">上架</el-button>
    <el-button v-permission="['remove']">下架</el-button>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column label="商品">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="实际销量" />
      <el-table-column property="" label="商品状态" />
      <el-table-column property="" label="审核状态" />
      <el-table-column property="" label="总库存" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { reactive } from 'vue';
import { getGoods } from '@/http/api';

let activeName = ref('all');
let pages = ref(1);

const handleClick = (tab: TabsPaneContext) => {
  console.log(tab);
  activeName.value = tab;
  console.log(activeName.value);
};

const tableData = reactive([]);

getGoods({ tab: activeName.value, pages: pages.value }).then((res) => {
  console.log(res);
});

const formInline = reactive({
  user: '',
  region: ''
});

const onSubmit = () => {
  console.log('submit!');
};

// 展开收起
let zhan = ref(true);

const handleEdit = (index: number, row) => {
  console.log(index, row);
};
const handleDelete = (index: number, row) => {
  console.log(index, row);
};
</script>
<style lang="scss">
.content {
  height: calc(100% - 40px);
  background-color: #fff;
  padding: 10px;
}
.el-form {
  display: flex;
  justify-content: space-between;
}
.el-input {
  width: 231px !important;
}
</style>
