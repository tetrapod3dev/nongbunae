import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "../views/Layout.vue";

import SplashScreen from "../views/SplashScreen.vue";

// user
import Login from "../views/user/Login.vue";
import Signup from "../views/user/Signup.vue";
import Register from "../views/user/Register.vue";
import Mypage from "../views/user/Mypage.vue";
import AddressForm from "../views/user/AddressForm.vue";

// plant
import PlantChoice from "../views/plant/PlantChoice.vue";
import PlantMain from "../views/plant/PlantMain.vue";
import PlantEmpty from "../views/plant/PlantEmpty.vue";
import Tutorial from "../views/plant/Tutorial.vue";
import PlantCalendar from "../views/plant/PlantCalendar.vue";
import PlantCalendar2 from "../views/plant/PlantCalendar2.vue";
import PlantReport from "../views/plant/PlantReport.vue";

// seed
import SeedList from "../views/seed/SeedList.vue";

// diary
import DiaryCreate from "../views/diary/DiaryCreate.vue";
import DiaryUpdate from "../views/diary/DiaryUpdate.vue";
import DiaryDetail from "../views/diary/DiaryDetail.vue";

// landing
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/bottom",
    name: "default",
    component: Layout,
    children: [
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
      },
      {
        path: "/mypage",
        name: "Mypage",
        component: Mypage,
      },
      {
        path: "/tutorial",
        name: "Tutorial",
        component: Tutorial,
      },
      // plant start
      {
        path: "/main",
        name: "PlantMain",
        component: PlantMain,
      },
      {
        path: "/empty",
        name: "PlantEmpty",
        component: PlantEmpty,
      },
      {
        path: "/choice",
        name: "PlantChoice",
        component: PlantChoice,
      },
      {
        path: "/calendar",
        name: "PlantCalendar",
        component: PlantCalendar,
      },
      {
        path: "/calendar2",
        name: "PlantCalendar2",
        component: PlantCalendar2,
      },
      {
        path: "/report",
        name: "PlantReport",
        component: PlantReport,
      },
      // plant end
      // seed start
      {
        path: "/list",
        name: "SeedList",
        component: SeedList,
      },
      // seed end
      // diary start
      {
        path: "/diary/create",
        name: "DiaryCreate",
        component: DiaryCreate,
      },
      {
        path: "/diary/update/:id",
        name: "DiaryUpdate",
        component: DiaryUpdate,
      },
      {
        path: "/diary/:id",
        name: "DiaryDetail",
        component: DiaryDetail,
      },
    ],
  },
  {
    path: "/app",
    component: Layout,
    props: { bottomnav: false },
    children: [
      {
        path: "/app",
        name: "SplashScreen",
        component: SplashScreen,
      },
      // user start
      {
        path: "/login",
        name: "Login",
        component: Login,
        props: { bottomnav: false },
      },
      {
        path: "/signup",
        name: "Signup",
        component: Signup,
      },
      {
        path: "/address",
        name: "AddressForm",
        component: AddressForm,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
        props: { bottomnav: false },
      },
      // user end
    ],
  },
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
