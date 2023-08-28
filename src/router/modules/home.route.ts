import {RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Index",
        component: () => import('@/views/Index.jsx')
    }
]

export default routes
