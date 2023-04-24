<!-- eslint-disable no-undef -->
<!-- 图库管理 -->
<template>
  <div class="image">
    <div class="top">
      <el-button type="primary" size="small" @click="handleOpenDrawer"
        >新增图片分类</el-button
      >
      <el-button type="warning" size="small" @click="Pictures"
        >上传图片</el-button
      >
    </div>
    <div class="box">
      <div class="box-left">
        <el-menu
          :default-active="active"
          class="el-menu-vertical-demo"
          @select="huan"
        >
          <el-menu-item v-for="item in list" :key="item.id" :index="item.id">
            <span>{{ item.name }}</span>
            <div class="iconbox">
              <el-icon size="12px" color="#6bb4ff">
                <Edit @click="handleEdit(item)" />
              </el-icon>
              <el-popconfirm
                title="是否要删除该分类?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm.stop="del(item.id)"
              >
                <template #reference>
                  <el-icon size="12px" color="#6bb4ff">
                    <Close />
                  </el-icon>
                </template>
              </el-popconfirm>
            </div>
          </el-menu-item>
        </el-menu>
        <div class="box-left-bottom">
          <el-pagination
            background
            layout="prev, next"
            :total="total"
            @next-click="xia"
            @prev-click="shang"
          />
        </div>
      </div>
      <div class="box-right">
        <el-row :gutter="10">
          <el-col :span="6" v-for="item in imgList" :key="item.id" :offset="0">
            <el-card shadow="hover">
              <div class="imgage__cover h-[150px] relative" style="width: 100%">
                <img class="h-[150px]" :src="item.url" />
                <span class="cover__title text-sm">{{ item.name }}</span>
              </div>
              <div class="image__action flex item-center justify-center p-2">
                <el-button
                  type="primary"
                  text
                  size="small"
                  @click="editName(item)"
                  >重命名</el-button
                >
                <el-popconfirm
                  title="是否要删除该图片?"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm.stop="delAll(item.id)"
                >
                  <template #reference>
                    <el-button type="primary" text size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="right-bottom">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="imgTotal"
            @current-change="current"
          />
        </div>
      </div>
    </div>
  </div>
  <Drawer :title="title" ref="FormDrawerRef" @submit="handleSubmit">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      status-icon
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="ruleForm.order" :min="1" :max="100000" />
      </el-form-item>
    </el-form>
  </Drawer>
  <Drawer title="上传图片" size="30%" ref="FormPicturesRef">
    <el-upload
      class="upload-demo"
      drag
      action="/api/image/upload"
      multiple
      :headers="{ token: token }"
      data
      :on-change="handlePictures"
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
  </Drawer>
</template>

<script lang="ts" setup>
import {
  getImgList,
  getImage,
  deleteImage,
  deleteAll,
  getEditName,
  getAddImage,
  getEditImage
} from '@/http/api';
import { ref, reactive } from 'vue';
import Drawer from '@/components/Drawer.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getToken } from '@/composables/auth';

const token = getToken();

let active = ref(168);

let total = ref(); // 总页数
let page = ref(1); // 菜单 分类 当前页
let list = ref([]); // 分类列表
// 获取 菜单 分类列表
const getList = () => {
  getImgList(page.value).then((res: any) => {
    // console.log(res);
    list.value = res.list;
    total.value = res.totalCount;
  });
};
getList();

// 菜单 分类下一页
const xia = (e: any) => {
  console.log('下一页', e);
  page.value = e;
  getList();
};

// 菜单 分类上一页
const shang = (e: any) => {
  console.log('上一页', e);
  page.value = e;
  getList();
};

// 菜单删除
const del = (id: any) => {
  deleteImage(id).then((res) => {
    console.log(res);
  });
};

// 切换
const huan = (e: any) => {
  console.log(e);
  active.value = e;
  image();
};

let imgPage = ref(1);
let imgList = ref([]);
let imgTotal = ref();
// 获取 图片 列表
const image = async () => {
  getImage(active.value, imgPage.value).then((res: any) => {
    console.log(res);
    imgList.value = res.list;
    imgTotal.value = res.totalCount;
  });
};
image();

// 图片下一页
const current = (e: any) => {
  imgPage.value = e;
  image();
};

// 删除图片
const delAll = (id: any) => {
  deleteAll(id).then((res) => {
    console.log(res);
    image();
  });
};

// 重命名
const editName = (e: any) => {
  console.log(e);
  ElMessageBox.prompt('重命名', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: e.name
  })
    .then(({ value }) => {
      console.log(value);
      e.name = value;
      getEditName(e).then((res) => {
        image();
      });

      ElMessage({
        type: 'success',
        message: `Your email is:${value}`
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消'
      });
    });
};

// 抽屉数据
const title = ref('新增');
const FormDrawerRef = ref();
const ruleFormRef = ref();
const editId = ref();

// 打开抽屉弹窗方法
const handleOpenDrawer = () => {
  editId.value = 0;
  title.value = '新增';
  ruleForm.name = '';
  ruleForm.order = 50;
  FormDrawerRef.value.open();
};

// 修改
const handleEdit = (row: any) => {
  console.log('row=>', row);
  editId.value = row.id;
  title.value = '修改';
  ruleForm.name = row.name;
  ruleForm.order = row.order;
  FormDrawerRef.value.open();
};

// 关闭抽屉弹窗方法
const handleCloseDrawer = () => {
  FormDrawerRef.value.close();
};

// 表单数据
const ruleForm = reactive({
  name: '',
  order: 50
});
// 校验规则
const rules = reactive({
  name: [{ required: true, message: '图库分类名称不能为空', trigger: 'blur' }]
});
// 提交数据
const handleSubmit = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      editId.value === 0 ? addImageCategoryData() : updateImageCategoryData();
    } catch (error) {
      console.log(error);
    }
  });
};
// 新增分类数据
const addImageCategoryData = async () => {
  try {
    console.log('editId', editId.value);
    FormDrawerRef.value.showLoading();
    await getAddImage(ruleForm);
    handleCloseDrawer();
    getList();
  } catch (error) {
    console.log(error);
  } finally {
    FormDrawerRef.value.hideLoading();
  }
};
// 编辑分类技术
const updateImageCategoryData = async () => {
  try {
    FormDrawerRef.value.showLoading();
    await getEditImage(editId.value, ruleForm);
    handleCloseDrawer();
    getList();
  } catch (error) {
    console.log(error);
  } finally {
    FormDrawerRef.value.hideLoading();
  }
};

const FormPicturesRef = ref();
const data = reactive({
  name: '',
  path: ''
});
// 上传图片
const Pictures = () => {
  FormPicturesRef.value.open();
};

const handlePictures = (e: any) => {
  console.log(e);
  data.name = e.name;
  data.path = e.name;
};
</script>

<style lang="scss">
.image {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .top {
    width: 100%;
    height: 60px;
    padding: 0 20px;
    line-height: 60px;
  }
  .box {
    border-top: 1px solid #eeeeee;
    width: 100%;
    height: 750px;
    display: flex;
    .box-left {
      width: 220px;
      height: 100%;
      border-right: 1px colid !important;
      .el-menu {
        width: 220px;
        height: calc(100% - 50px);
        --bg-color: #eff6ff;
        .el-menu-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .iconbox {
            width: 40px;
            height: 100%;
            color: #6bb4ff !important;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-popconfirm {
              width: 50%;
              height: 100%;
              padding: 0 !important;
            }
          }
        }
      }
      .box-left-bottom {
        flex: 1;
        height: 50px;
        border-right: 1px colid !important;
        .el-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .box-right {
      width: calc(100% - 220px);
      margin: 0 10px;
      position: relative;
      .el-col {
        margin-bottom: 10px;
      }
      .el-card__body {
        padding: 0;
      }
      .cover__title {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        color: #fff;
        background: rgba(0, 0, 0, 0.6);
        line-height: 28px;
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .right-bottom {
        width: 100%;
        position: absolute;
        bottom: 10px;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
