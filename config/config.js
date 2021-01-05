// https://umijs.org/config/
import { defineConfig } from 'umi'
import darkTheme from '@ant-design/dark-theme'
import defaultSettings from './defaultSettings'
import proxy from './proxy' // const { REACT_APP_ENV } = process.env

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: '注册',
          path: '/',
          component: './user/register',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    ...darkTheme,
    'primary-color': '#e0529c',
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Proxy for integrated test
  proxy: {
    '/api/v1': {
      target: 'http://bh39uz.natappfree.cc',
      changeOrigin: true,
    },
  },
})
