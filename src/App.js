import "./App.css";
import { Home } from "./Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Administrator } from "./Administrator";
import { AdminManager } from "./AdminManager";
import { AdminSeniorEmp } from "./AdminSeniorEmp";
import { AdminJuniorEmp } from "./AdminJuniorEmp";
import { ManagerDetails } from "./ManagerDetails";
import { SeniorEmpDetails } from "./SeniorEmpDetails";
import { JuniorEmpDetails } from "./JuniorEmpDetails";
import { AddManagerByAdmin } from "./AddManagerByAdmin";
import { AddSeniorEmpByAdmin } from "./AddSeniorEmpByAdmin";
import { AddJuniorEmpByAdmin } from "./AddJuniorEmpByAdmin";
import { EditManagerByAdmin } from "./EditManagerByAdmin";
import { EditSeniorEmpByAdmin } from "./EditSeniorEmpByAdmin";
import { EditJuniorEmpByAdmin } from "./EditJuniorEmpByAdmin";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { ProtectedRoute } from "./ProtectedRoute";
import { ForgetPassword } from "./ForgetPassword";
// import { Manager } from "./Manager";
// import { SeniorEmployees } from "./SeniorEmployees";
// import { JuniorEmployees } from "./JuniorEmployees";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/admin")}>
              Administrator
            </Button>
            {/* <Button color="inherit" onClick={() => navigate("/manager")}>
              Manager
            </Button>
            <Button color="inherit" onClick={() => navigate("/seniorEmp")}>
              Senior Employees
            </Button>
            <Button color="inherit" onClick={() => navigate("/juniorEmp")}>
              Junior Employees
            </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/signUp" element={<SignUp />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/forgetPassword" element={<ForgetPassword />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Administrator />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/manager" element={<AdminManager />} />
        <Route path="/admin/manager/:id" element={<ManagerDetails />} />
        <Route path="/admin/create/manager" element={<AddManagerByAdmin />} />
        <Route
          path="/admin/edit/manager/:id"
          element={<EditManagerByAdmin />}
        />
        <Route path="/admin/seniorEmp" element={<AdminSeniorEmp />} />
        <Route path="/admin/seniorEmp/:id" element={<SeniorEmpDetails />} />
        <Route
          path="/admin/create/seniorEmp"
          element={<AddSeniorEmpByAdmin />}
        />
        <Route
          path="/admin/edit/seniorEmp/:id"
          element={<EditSeniorEmpByAdmin />}
        />
        <Route path="/admin/juniorEmp" element={<AdminJuniorEmp />} />
        <Route path="/admin/juniorEmp/:id" element={<JuniorEmpDetails />} />
        <Route
          path="/admin/create/juniorEmp"
          element={<AddJuniorEmpByAdmin />}
        />
        <Route
          path="/admin/edit/juniorEmp/:id"
          element={<EditJuniorEmpByAdmin />}
        />
        {/* <Route path="/manager" element={<Manager />} />
        <Route path="/seniorEmp" element={<SeniorEmployees />} />
        <Route path="/juniorEmp" element={<JuniorEmployees />} /> */}
      </Routes>
    </div>
  );
}

export default App;
