import { createBrowserRouter } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import SuccessCheckout from "@/pages/SuccessCheckout";
import NotFound from "@/pages/NotFound";
import LayoutDashboard from "@/components/Layouts/LayoutDashboard";
import Courses from "@/pages/Manager/Courses";
import CreateCourses from "@/pages/Manager/Courses/CreateCourses";
import Overview from "@/pages/Manager/Overview";
import CourseDetail from "@/pages/Manager/Courses/CourseDetail";
import AddCourseContent from "@/pages/Manager/Courses/AddCourseContent";
import CoursePreview from "@/pages/Manager/Courses/CoursePreview";
import Students from "@/pages/Manager/Students";
import Student from "@/pages/Student/StudentOverview";
import secureLocalStorage from "react-secure-storage";
import { MANAGER_SESSION, STORAGE_KEY } from "@/utils/const";
import { redirect } from "react-router-dom";
import {
  getCategories,
  getCourse,
  getCourseById,
  getDetailContent,
} from "@/services/courseService";
import AddStudent from "@/pages/Manager/Students/AddStudent";
import { getStudentById, getStudents } from "@/services/studentService";

const checkAuth = () => {
  const session = secureLocalStorage.getItem(STORAGE_KEY);
  if (!session || session.role !== "manager") {
    throw redirect("/manager/signin");
  }
  return session;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
    errorElement: <NotFound />,
  },
  {
    path: "/manager/signin",
    element: <SignIn />,
  },
  {
    path: "/manager/signup",
    element: <SignUp />,
  },
  {
    path: "/success-checkout",
    element: <SuccessCheckout />,
  },
  {
    path: "/manager",
    id: MANAGER_SESSION,
    loader: checkAuth,
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "courses",
        loader: async () => {
          const data = await getCourse();
          return data;
        },
        element: <Courses />,
      },
      {
        path: "courses/create",
        loader: async () => {
          const categories = await getCategories();
          return { categories, course: null };
        },
        element: <CreateCourses />,
      },
      {
        path: "courses/edit/:id",
        loader: async ({ params }) => {
          const categories = await getCategories();
          const course = await getCourseById(params.id);
          return { categories, course };
        },
        element: <CreateCourses />,
      },
      {
        path: "courses/:id",
        loader: async ({ params }) => {
          const course = await getCourseById(params.id);
          return course;
        },
        element: <CourseDetail />,
      },
      {
        path: "courses/:id/add-content",
        element: <AddCourseContent />,
      },
      {
        path: "courses/:id/edit/:contentId",
        loader: async ({ params }) => {
          const content = await getDetailContent(params.contentId);
          return content?.result;
        },
        element: <AddCourseContent />,
      },
      {
        path: "courses/:id/preview",
        loader: async ({ params }) => {
          const course = await getCourseById(params.id, true);
          return course?.result;
        },
        element: <CoursePreview />,
      },
      {
        path: "students",
        loader: async () => {
          const students = await getStudents();
          return students?.result;
        },
        element: <Students />,
      },
      {
        path: "students/create",
        element: <AddStudent />,
      },
      {
        path: "students/edit/:id",
        loader: async ({ params }) => {
          const student = await getStudentById(params.id);
          return student;
        },
        element: <AddStudent />,
      },
    ],
  },
  {
    path: "/student",
    element: <LayoutDashboard isAdmin={false} />,
    children: [
      {
        index: true,
        element: <Student />,
      },
      {
        path: "detail-course/:id",
        element: <CoursePreview />,
      },
    ],
  },
]);

export default router;
