import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Index",
        component: () => import('@/views/classDemo.jsx')
    }
]

export default routes
