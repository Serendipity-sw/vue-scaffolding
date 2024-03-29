import {useRouter} from 'vue-router'
import {Options, Vue} from 'vue-class-component'
import style from './index.pcss'
import {serverMethod} from "./decoratorsDemo"

@Options({
  components: {}
})
export default class extends Vue {
  #router = useRouter()

  #leavePage = _ => {
    this.#router.push("/")
  }

  leavePageBtn = _ => {
    this.#leavePage()
  }

  @serverMethod
  saveData(){
    debugger
    console.log('nihao')
  }

  render() {
    return (
      <div className={style.name}>
        <div>
          <span onClick={this.saveData}>提交1</span>
          <span onClick={this.leavePageBtn}>取2消</span>
        </div>
      </div>
    )
  }
}
