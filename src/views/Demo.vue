<template>
  <div>
    <demo-component :demoProp="demoProp"/>
    <button @click="demoPropValueChange">click</button>
    <div :class="style.init">
      <span>姓名</span>
      <input type="text" v-model="name">
      <span>年龄</span>
      <input type="text" v-model="age">
      <span>当年龄为44岁时触发按钮事件会被阻止</span>
      <button @click="handleClick">触发按钮</button>
    </div>
  </div>
</template>
<script lang="ts">
import DemoComponent from "@/components/DemoComponent.vue";
import {defineComponent, provide, reactive, ref} from "@vue/runtime-core";
import {PersonStore} from "@/views/store";
// @ts-ignore
import style from './demo.pcss'

export default defineComponent({
  name: "Demo",
  components: {
    DemoComponent,
  },
  setup() {
    const personStoreData = PersonStore.InitDeferDestroy()

    const demoProp = ref({
      name: "propData",
      value: 1,
    });

    // 注入示例
    const injectData = reactive({
      name: "demoInject",
      value: 3,
    });
    provide("injectData", injectData);

    function demoPropValueChange() {
      demoProp.value.value++;
    }

    return {
      demoProp,
      name: personStoreData.name,
      // @ts-ignore
      age: personStoreData.age,
      handleClick: personStoreData.click,
      style,
      demoPropValueChange,
    };
  },
});
</script>
