<template>
  <div :class="{ 'show': show }" class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch" filterable default-first-option
      remote placeholder="Search" class="header-search-select" @change="change">
      <el-option v-for="{ item } in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script lang="ts">
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import * as path from 'path-browserify'
import i18n from '@/lang';
const { t } = i18n.global;
import { RouteConfig } from '@/router'
interface Option { path: string, title: Array<string> }
export default {
  name: 'HeaderSearch',
  setup() {
    return {
      search: ref(''),
      options: reactive<Fuse.FuseResult<Option>[]>([]),
      searchPool: ref<Array<Option>>([]),
      show: ref(false),
      fuse: ref<Fuse<Option>>()
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    },
    lang() {
      return this.$store.getters.language
    },
    supportPinyinSearch() {
      return this.$store.state.settings.supportPinyinSearch
    }
  },
  watch: {
    lang() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list: Array<Option>) {

      // Support pinyin search
      if (this.lang === 'zh' && this.supportPinyinSearch) {
        this.addPinyinField(list)
      }
      this.initFuse(list)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)

  },
  methods: {
    async addPinyinField(list: any) {
      const { default: pinyin } = await import('pinyin')
      if (Array.isArray(list)) {
        list.forEach(element => {
          const title = element.title
          if (Array.isArray(title)) {
            title.forEach(v => {
              v = pinyin(v, {
                style: pinyin.STYLE_NORMAL
              }).join('')
              element.pinyinTitle = v
            })
          }
        })
        return list
      }
    },
    click() {
      this.show = !this.show
      if (this.show) {
        this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as any).focus()
      }
    },
    close() {
      this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as any).blur()
      this.options = []
      this.show = false
    },
    change(val: Option) {
      this.$router.push(val.path)
      this.search = ''
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    initFuse(list: Option[]) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'pinyinTitle',
          weight: 0.3
        }, {
          name: 'path',
          weight: 0.3
        }]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes: RouteConfig[], basePath = '/', prefixTitle = []) {
      let res: any[] = []
      for (const router of routes) {
        // skip hidden router
        if (router.hidden) { continue }
        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }
        if (router.meta && router.meta.title) {
          // generate internationalized title
          const i18ntitle = t(`route.${router.meta.title.toLocaleLowerCase()}`)
          data.title = [...data.title, i18ntitle] as any
          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }
        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    querySearch(query: string) {
      if (query !== '') {
        this.options = this.fuse?.search(query)!
        console.log(this.options);
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss">
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
