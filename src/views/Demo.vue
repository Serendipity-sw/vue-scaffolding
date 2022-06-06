<template>
  <div>
    <demo-component :demo-prop="demoProp" />
    <button @click="demoPropValueChange">click</button>
  </div>
</template>
<script lang="ts">
  import DemoComponent from '@/components/DemoComponent.vue'
  import { defineComponent, provide, reactive, ref } from '@vue/runtime-core'
  import { useRoute, useRouter } from 'vue-router'

  export default defineComponent({
    name: 'Demo',
    components: {
      DemoComponent
    },
    setup() {
      // setup中使用route和router
      const route = useRoute()
      const router = useRouter()

      const demoProp = ref({
        name: 'propData',
        value: 1
      })

      // 注入示例
      const injectData = reactive({
        name: 'demoInject',
        value: 0
      })
      provide('injectData', injectData)

      function demoPropValueChange() {
        demoProp.value.value++
      }

      return {
        demoProp,
        demoPropValueChange
      }
    }
  })
</script>
