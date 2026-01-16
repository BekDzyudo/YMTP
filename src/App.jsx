import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {

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
          element: <HududLayout/>,
          children: [
            {
              index: true,
              element: <Region />,
            },
            {
              path: "districts/:districtId",
              element: <Districts/>,
            },
            {
              path: "districts/:districtId/collages/:collageId",
              element: <Collages />,
            },
            {
              path:"districts/:districtId/collages/:collageId/collage/:Id",
              element: <CollageLayout/>,
              children: [
                {
                  index: true,
                  element: <AllDataCollage/>
                },
                {
                  path:"professions",
                  element: <Professions/>
                },
                {
                  path:"professions/:kasbId",
                  element: <ProfessionsDetail/>
                },
                {
                  path:"teachers",
                  element: <TeachersCollage/>
                },
                {
                  path:"strategy",
                  element: <Strategy/>
                },
                {
                  path:"short-term-courses",
                  element: <ShortTermCourse/>
                },
                {
                  path:"short-term-courses/:shortTermCourseId",
                  element: <ShortTermCourseDetail/>
                },
                {
                  path:"dual-education",
                  element: <DualEducation/>
                },
                {
                  path:"dual-education/:DualsId",
                  element: <DualEducationDetail/>
                }
              ]
            }
          ],
        },
        {
          path:"rating",
          element:<Rating/>
        },
        {
          path:"/profile",
          element: <TeacherProfil/>
        }
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
