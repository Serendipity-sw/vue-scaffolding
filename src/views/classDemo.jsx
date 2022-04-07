import { useRouter } from 'vue-router'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {}
})
export default class extends Vue {
  #router = useRouter()

  #leavePage = (_) => {
    this.#router.push('/')
  }

  leavePageBtn = (_) => {
    console.log(12)
    this.#leavePage()
  }

  saveData = (_) => {}

  render() {
    return (
      <div>
        <div>
          <span onClick={this.saveData}>提交</span>
          <span onClick={this.leavePageBtn}>取消</span>
        </div>
      </div>
    )
  }
}
