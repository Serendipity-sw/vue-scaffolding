<template>
  <ul :class="style.init">
    <li>
      {{ demoProp.name }}：
      <input type="text" v-model="demoProp.value"/>
    </li>
    <li>
      {{ demoInject.name }}
      <input type="text" v-model="demoInject.value"/>
    </li>
  </ul>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  ref,
  watch,
  watchEffect,
} from "vue";
// @ts-ignore
import css from './index.pcss';

export default defineComponent({
  props: {
    demoProp: {
      type: Object as PropType<{ name: string; value: number }>,
      required: true,
    },
  },
  setup(props) {
    const demoInject = inject<{ name: string; value: number }>("injectData")!;

    const childData = ref(0);

    const style = ref(css)

    // 计算示例
    const computedDemo = computed(() => {
      return props.demoProp;
    });

    // 副作用函数示例
    const stopEffect = watchEffect(() => {
      if (computedDemo.value.value) {
        childData.value++;
        console.log("触发副作用,childData改变", childData);
      }
    });
    // watch示例
    const stopWatch = watch(childData, (newValue, oldValue) => {
      console.log("触发childData的watch");
      console.log("childData旧值", oldValue);
      console.log("childData新值", newValue);
    });

    return {
      demoInject,
      style
    };
  },
});
</script>
