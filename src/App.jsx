import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { TaskMasterLanding } from "./pages/Home";
import { Dashboard } from "./dashboard/dashboard";
import { CreateNewTask } from "./dashboard/createTask";
import { DashboardLayout } from "./layout/DashboardLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./pages/nav";
import { Toaster } from "react-hot-toast";
import { TaskDetails } from "./dashboard/TaskDetails";
import { ProtectedRoute } from "./components/protectedRoutes";
import { PublicRoute } from "./components/publicRoute";

function App() {

  return (
    <>
      <BrowserRouter>

        <Toaster position="top-center" reverseOrder={false} />

        <Navbar />

        <Routes>

          {/* Public Pages */}
          <Route path="/" element={<TaskMasterLanding />} />
          <Route path="/login" element={<PublicRoute>
              <Login />
            </PublicRoute>} />
          <Route path="/register" element={ <PublicRoute>
              <Register />
            </PublicRoute>} />

          {/* Dashboard Layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>

            <Route index element={ <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />

            <Route path="create-task" element={<CreateNewTask />} />

            <Route path="task/:id" element={<TaskDetails />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;