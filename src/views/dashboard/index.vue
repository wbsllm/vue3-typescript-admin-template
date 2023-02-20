<template>
  <div class="dashboard-container">
    dashboard
    <!-- <component :is="currentRole"></component> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { mapGetters } from 'vuex'
// import adminDashboard from './admin/index.vue'
// import editorDashboard from './editor/index.vue'
export default defineComponent({
  name: 'Dashboard',
  // components: {
  //   adminDashboard,
  //   editorDashboard
  // },
  // setup() {
  //   return {
  //     currentRole: ref('adminDashboard')
  //   }
  // },
  // computed: {
  //   ...mapGetters([
  //     'roles'
  //   ])
  // },
  // created() {
  //   if (!this.roles.includes('admin')) {
  //     this.currentRole = 'editorDashboard'
  //   }
  // }
})
</script>
