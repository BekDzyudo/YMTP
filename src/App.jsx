import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home-page/Home";
import Region from "./pages/kasbiy-talim-tashkilotlari/Region";
import Collages from "./pages/kasbiy-talim-tashkilotlari/Collages";
import Districts from "./pages/kasbiy-talim-tashkilotlari/Districts";
import HududLayout from "./layouts/HududLayout";
import CollageLayout from "./pages/kasbiy-talim-tashkilotlari/CollageLayout";
import AllDataCollage from "./pages/kasbiy-talim-tashkilotlari/collage-detail/AllDataCollage";
import Professions from "./pages/kasbiy-talim-tashkilotlari/collage-detail/Professions";
import TeachersCollage from "./pages/kasbiy-talim-tashkilotlari/collage-detail/TeachersCollage";
import Strategy from "./pages/kasbiy-talim-tashkilotlari/collage-detail/Strategy";
import ShortTermCourse from "./pages/kasbiy-talim-tashkilotlari/collage-detail/ShortTermCourse";
import DualEducation from "./pages/kasbiy-talim-tashkilotlari/collage-detail/DualEducation";
import ProfessionsDetail from "./pages/kasbiy-talim-tashkilotlari/collage-detail/ProfessionsDetail";
import ShortTermCourseDetail from "./pages/kasbiy-talim-tashkilotlari/collage-detail/ShortTermCourseDetail";
import DualEducationDetail from "./pages/kasbiy-talim-tashkilotlari/collage-detail/DualEducationDetail";
import Rating from "./pages/rating/Rating";
import TeacherProfil from "./pages/profil/teacher/TeacherProfil";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ConfirmEmail from "./pages/auth/reset-parol/ConfirmEmail";
import NewPassword from "./pages/auth/reset-parol/NewPassword";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ExpertProfil from "./pages/profil/expert/ExpertProfil";
import MaterialCheckingDetail from "./pages/profil/expert/MaterialCheckingDetail";
import TeachersMaterial from "./pages/materials/TeachersMaterial";
import AllMaterials from "./pages/materials/AllMaterials";
import MaterialDetail from "./pages/materials/MaterialDetail";

function App() {

  const {auth} = useContext(AuthContext)

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "region",
          element: <HududLayout />,
          children: [
            {
              index: true,
              element: <Region />,
            },
            {
              path: "districts/:districtId",
              element: <Districts />,
            },
            {
              path: "districts/:districtId/collages/:collageId",
              element: <Collages />,
            },
            {
              path: "districts/:districtId/collages/:collageId/collage/:Id",
              element: <CollageLayout />,
              children: [
                {
                  index: true,
                  element: <AllDataCollage />,
                },
                {
                  path: "professions",
                  element: <Professions />,
                },
                {
                  path: "professions/:kasbId",
                  element: <ProfessionsDetail />,
                },
                {
                  path: "teachers",
                  element: <TeachersCollage />,
                },
                {
                  path: "strategy",
                  element: <Strategy />,
                },
                {
                  path: "short-term-courses",
                  element: <ShortTermCourse />,
                },
                {
                  path: "short-term-courses/:shortTermCourseId",
                  element: <ShortTermCourseDetail />,
                },
                {
                  path: "dual-education",
                  element: <DualEducation />,
                },
                {
                  path: "dual-education/:DualsId",
                  element: <DualEducationDetail />,
                },
              ],
            },
          ],
        },
        {
          path: "rating",
          element: <Rating />,
        },
        {
          path: "teachers",
          element: <TeachersMaterial/>
        },
        {
          path: "teachers/:teacherMaterialId",
          element: <AllMaterials/>
        },
        {
          path: "materials-detail/:materialDetailId",
          element: <MaterialDetail/>
        },
        {
          path: "expert-profile",
          element: <ExpertProfil/>,
        },
        {
          path: "expert-profile/material-detail/:materialId",
          element: <MaterialCheckingDetail/>
        },
        {
          path: "/profile",
          element: <TeacherProfil />,
        }
      ],
    },
    {
      path: "login",
      element: auth.refreshToken ? <Navigate to="/"/> :  <Login />,
    },
    {
      path: "register",
      element: auth.refreshToken ? <Navigate to="/"/> :  <Register/>
    },
    {
      path:"confirm-email",
      element: auth.refreshToken ? <Navigate to="/"/> :  <ConfirmEmail/>
    },
    {
      path:"create-new-parol",
      element: auth.refreshToken ? <Navigate to="/"/> :  <NewPassword/>
    }
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
