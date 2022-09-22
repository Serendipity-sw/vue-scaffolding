import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Index",
        component: () => import('@/views/Demo.vue')
    }
]

export default routes
