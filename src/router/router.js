import HomeView from "@/views/HomeView.vue";
import OfficerHomeView from "@/views/OfficerHomeView.vue";
import WineSearchView from "@/views/WineSearchView.vue";
import CartItemView from "@/views/CartItemView.vue";
import RegisterView from "@/views/RegisterView.vue";
import VerifyEmailView from "@/views/VerifyEmailView.vue";
import ImportLiquorView from "@/views/ImportLiquorView.vue";
import ScanQRView from "@/views/ScanQRView.vue";
import ImportWineListView from "@/views/ImportWineListView.vue";
import WineListView from "@/views/WineListView.vue";
import EditWineListView from "@/views/EditWineListView.vue";
import WineListInCart from "@/views/WineListInCartView.vue";
import ImportWineListInCart from "@/views/ImportWineListInCartView.vue";
import CheckWineByUpload from "@/views/CheckWineByUploadView.vue";
import CheckTheCorrectness from "@/views/CheckTheCorrectnessView.vue"
import WineListDetails from "@/views/WineListDetailView.vue"
import ImportWineListUser from "@/views/ImportWineListUserView.vue"
import CartDetailView from "@/views/CartDetailView.vue";
import PdfView from "@/views/PdfView.vue";
import LoginView from "@/views/LoginView.vue";
import ToRegisterView from "@/views/ToRegisterView.vue"
import CreateAccountView from "@/views/CreateAccountView.vue";
import RegistrationVerifyViewVue from "@/views/RegistrationVerifyView.vue";

import { createRouter, createWebHistory } from "vue-router";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import dayjs from "dayjs";

const routes = [
  {
    path: "/",
    // name: 'wine-search',
    component: HomeView,
    children: [
      {
        path: "",
        name: "wine-search",
        component: WineSearchView,
      },
      {
        path: "your-cart",
        name: "your-cart",
        component: CartItemView,
      },
      {
        path: "register",
        name: "register",
        component: RegisterView,
      },
      {
        path: "verify-email",
        name: "verify-email",
        component: VerifyEmailView,
      },
      {
        path: "import-liquor",
        name: "import-liquor",
        component: ImportLiquorView,
      },
      {
        path: "wine-list",
        name: "wine-list",
        component: WineListView,
      },
      {
        path: "scan-qr",
        name: "scan-qr",
        component: ScanQRView,
      },
      {
        path: "wine-list-in-cart",
        name: "wine-list-in-cart",
        component: WineListInCart,
      },
      {
        path: "your-import-wine-list",
        name: "your-import-wine-list",
        component: ImportWineListUser,
      },
      {
        path: 'cart-details',
        name: 'cart-details',
        component: CartDetailView,
      }
    ],
    meta: { requiresUser: true },
  },
  {
    // This path is for admin. When usertypeId == 21, these paths can be go
    path: "/import-wine-list",
    component: OfficerHomeView,
    children: [
      {
        path: "",
        name: "import-wine-list",
        component: ImportWineListView,
      },
      {
        path: "edit-wine-list",
        name: "edit-wine-list",
        component: EditWineListView,
      },
      {
        path: "import-wine-list-in-cart/:cartId",
        name: "import-wine-list-in-cart",
        component: ImportWineListInCart,
        props: true
      },
      {
        path: "check-wine-by-upload",
        name: "check-wine-by-upload",
        component: CheckWineByUpload,
      },
      {
        path: "check-the-correctness",
        name: "check-the-correctness",
        component: CheckTheCorrectness,
      },
      {
        path: "wine-list-details",
        name: "wine-list-details",
        component: WineListDetails,
      }
    ],
    meta: { requiresAdmin: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/to-register",
    name: "/to-register",
    component: ToRegisterView,
  },
  {
    path: "/create-account",
    name: "create-account",
    component: CreateAccountView,
  },
  {
    path: "/verify-register",
    name: "verify-register",
    component: RegistrationVerifyViewVue
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPasswordView
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPasswordView
  },
  {
    path: "/pdf-view",
    name: "pdf-view",
    component: PdfView,
    meta: { requiresUser: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userTypeId = localStorage.getItem("userTypeId");
  const accessTokenExpiredAt = localStorage.getItem("accessTokenExpiredAt");

  // token checking
  if (!accessTokenExpiredAt) {
    isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userTypeId');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiredAt');
  }
  const now = dayjs();
  const accessTokenExpiredIn = dayjs(accessTokenExpiredAt);
  const accessTokenRefreshIn = accessTokenExpiredIn.clone().subtract(1, "hour");
  if (isLoggedIn && now.isAfter(accessTokenRefreshIn)) {
    if (now.isAfter(accessTokenExpiredIn)) {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userTypeId');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenExpiredAt');
      next({ path: "/", query: { sessionExpired: true } });
    } else {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
  
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          "refreshToken": refreshToken
        }),
      };
  
      fetch("https://asia-southeast1-tbit-excise.cloudfunctions.net/apiv4-RefreshToken", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          localStorage.setItem('token', result.data.accessToken);
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('userTypeId', result.data.FtUserTypeId);
          localStorage.setItem('refreshToken', result.data.refreshToken);
          localStorage.setItem('accessTokenExpiredAt', result.data.expiredAt);
        })
        .catch((error) => console.error(error)); 
    }
  }

  // redirection
  if (to.path == "/" || to.path == "/your-cart" || to.path == "/register" || to.path == "/verify-email") {
    if (isLoggedIn && userTypeId === "21") {
      next({ path: "/import-wine-list" })
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (isLoggedIn && userTypeId === "21") {
      next();
    } else if (isLoggedIn && userTypeId !== "21") {
      next({ path: "/" });
    } else {
      next({ path: "/login" });
    }
  } else if (to.matched.some((record) => record.meta.requiresUser)) {
    if (isLoggedIn && userTypeId !== 21) {
      next();
    } else if (isLoggedIn && userTypeId === 21) {
      next({ path: "/import-wine-list" });
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;