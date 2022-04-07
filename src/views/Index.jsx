import { defineComponent, toRef } from 'vue'
import { useRxState, syncRef } from 'vuse-rx'
import { tap } from 'rxjs/operators'

export default defineComponent({
  setup() {
    const {
      actions: { increment, setCount },
      state,
      state$
    } = useRxState({ count: 0 })(
      {
        increment: () => (state, mutation) => ({
          count: state.count + 1
        }),
        setCount: (count) => ({
          count: isNaN(Number(count)) ? 0 : Number(count)
        })
      },
      (state$) => state$.pipe(tap((state) => console.log('state is updated', state)))
    )

    state$.subscribe((state) => console.log('counter: ', state.count))

    const countRef = syncRef(toRef(state, 'count'), { to: String })

    return () => (
      <div>
        <p>Counter: {state.count}</p>
        <button onClick={increment}>increment</button>
        <input v-model={countRef.value} />
      </div>
    )
  }
})
