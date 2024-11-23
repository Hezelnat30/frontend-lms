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
import { MANAGER_SESSION, STORAGE_KEY, STUDENT_SESSION } from "@/utils/const";
import { redirect } from "react-router-dom";
import {
  getCategories,
  getCourse,
  getCourseById,
  getDetailContent,
  getStudentsCourse,
} from "@/services/courseService";
import AddStudent from "@/pages/Manager/Students/AddStudent";
import {
  getCoursesStudents,
  getStudentById,
  getStudents,
} from "@/services/studentService";
import StudentList from "@/pages/Manager/Students/StudentList";
import AddStudentToCourse from "@/pages/Manager/Courses/AddStudentToCourse";
import { getOverviews } from "@/services/overviewService";

const checkAuth = (role) => {
  return () => {
    const session = secureLocalStorage.getItem(STORAGE_KEY);
    if (!session || session.role !== role) {
      throw redirect(`/${role}/signin`);
    }
    return session;
  };
};

const checkAlreadySignedIn = (role) => {
  return () => {
    const session = secureLocalStorage.getItem(STORAGE_KEY);

    if (session && session.role === role) {
      throw redirect(`/${role}`);
    }
    return true;
  };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
    errorElement: <NotFound />,
  },
  {
    path: "/manager/signin",
    loader: checkAlreadySignedIn("manager"),
    element: <SignIn />,
  },
  {
    path: "/manager/signup",
    loader: checkAlreadySignedIn("manager"),
    element: <SignUp />,
  },
  {
    path: "/success-checkout",
    element: <SuccessCheckout />,
  },
  {
    path: "/manager",
    id: MANAGER_SESSION,
    loader: checkAuth("manager"),
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        loader: async () => {
          const overviews = await getOverviews();
          return overviews?.result;
        },
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
      {
        path: "courses/students/:id",
        loader: async ({ params }) => {
          const courseStudents = await getStudentsCourse(params.id);
          return courseStudents?.result;
        },
        element: <StudentList />,
      },
      {
        path: "courses/students/:id/add",
        loader: async () => {
          const students = await getStudents();
          return students?.result;
        },
        element: <AddStudentToCourse />,
      },
    ],
  },
  {
    path: "/student",
    id: STUDENT_SESSION,
    loader: checkAuth("student"),
    element: <LayoutDashboard isAdmin={false} />,
    children: [
      {
        index: true,
        loader: async () => {
          const studentsCourses = await getCoursesStudents();
          return studentsCourses?.result;
        },
        element: <Student />,
      },
      {
        path: "detail-course/:id",
        loader: async ({ params }) => {
          const course = await getCourseById(params.id, true);
          return course?.result;
        },
        element: <CoursePreview />,
      },
    ],
  },
  {
    path: "/student/signin",
    loader: checkAlreadySignedIn("student"),
    element: <SignIn type="student" />,
  },
]);

export default router;
