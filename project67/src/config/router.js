import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Home from "../pages/privite/Home"
import Group from "../pages/privite/Group"
import Reception from "../pages/privite/Reception"
import Teacher from "../pages/privite/Teacher"
import News from "../pages/privite/News"
import Error from "../pages/Error/Error"
import Course from "../pages/privite/Course"
import Students from "../pages/privite/Students"
export const AuthRouter = [
    {
        kay: "login",
        path: "/login",
        element: <Login />
    },
    {
        kay: "*",
        path: "*",
        element: <Error />,
        role: ["admin,user"]
    },
    // {
    //     kay: "registre",
    //     path: "/register",
    //     element: <Register />
    // },

]

export const PrivateRouter = [
    {
        kay: "home",
        path: "/",
        element: <Home />,
        role: ["admin"]
    },
    {
        kay: "dashboard",
        path: "/home",
        element: <Home />,
        role: ["admin"]
    },
    {
        kay: "course",
        path: "/course",
        element: <Course />,
        role: ["admin"]
    },

    {
        kay: "group",
        path: "/group",
        element: <Group />,
        role: ["admin"]
    },
    {
        kay: "reception",
        path: "/reception",
        element: <Reception />,
        role: ["admin"]
    },
    {
        kay: "teacher",
        path: "/teacher",
        element: <Teacher />,
        role: ["admin"]
    },
    {
        kay: "news",
        path: "/news",
        element: <News />,
        role: ["admin"]
    },
    {
        kay: "/add-student",
        path: "/add-student/:id",
        element: <Students />,
        role: ["admin,user"]
    },
    {
        kay: "*",
        path: "/notfound",
        element: <Error />,
        role: ["admin,user"]
    }
]