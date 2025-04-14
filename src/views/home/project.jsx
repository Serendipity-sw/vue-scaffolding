import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute(),
      projectId = ref(route.params.projectId)

    return _ => <div>当前projectId为{projectId.value}</div>
  }
})
