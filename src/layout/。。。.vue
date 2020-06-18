<template>
  <div>
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      router
      :default-active="activePath"
    >
      <!-- 一级菜单 -->
      <el-submenu :index="item.index + ''" v-for="item in sidebarInfo" :key="item.index">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <!-- <i :class="iconsObj[item.id]"></i> -->
          <!-- 文本 -->
          <span>{{item.authName}}</span>
        </template>

        <!-- 二级菜单 -->
        <el-menu-item
          :index="'/' + subItem.path"
          v-for="subItem in item.subNav"
          :key="subItem.index"
          
        >
        <!-- @click="saveNavState('/' + subItem.path)" -->
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本 -->
            <span>{{subItem.title}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>