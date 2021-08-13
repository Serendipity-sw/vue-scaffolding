import DemoComponent from "@/components/DemoComponent.vue";
import { defineComponent, provide, reactive, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    // setup中使用route和router
    const route = useRoute();
    const router = useRouter();
    console.log("setup路由相关", route, router);

    const demoProp = ref({
      name: "propData",
      value: 1,
    });

    // 注入示例
    const injectData = reactive({
      name: "demoInject",
      value: 0,
    });
    provide("injectData", injectData);

    function demoPropValueChange() {
      demoProp.value.value++;
    }

    return ()=>(
      <div>
        <DemoComponent demoProp={demoProp.value} />
        <button onClick={demoPropValueChange}>click</button>
      </div>
    )
  },
});
