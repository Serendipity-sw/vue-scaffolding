import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const handleClick = _ => {
      router.push('/home/123/project')
    }

    return _ => (
      <div>
        <button onClick={handleClick}>页面跳转</button>
      </div>
    )
  }
})
