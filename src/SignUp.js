import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { API } from "./global";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  userName: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export function SignUp() {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (newUser) => {
        // console.log("Form values", newUser);
        // addUser(newUser);
        const data = await fetch(`${API}/admin/signUp`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (data.status === 400) {
          // console.log(Error);
          alert("UserName already exist(redirecting to login page)");
          navigate("/admin/login");
        } else {
          alert("User added successfully");
          navigate("/admin/login");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h3>Signup Form</h3>
      <TextField
        label="User Name"
        variant="outlined"
        name="userName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.userName}
        error={touched.userName && errors.userName}
        helperText={
          touched.userName && errors.userName ? errors.userName : null
        }
      />
      <TextField
        label="Password"
        variant="outlined"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        error={touched.password && errors.password}
        helperText={
          touched.password && errors.password ? errors.password : null
        }
      />
      <Button variant="contained" type="submit">
        Sign Up
      </Button>
      <Button variant="text" onClick={() => navigate("/admin/login")}>
        Already an user? Login
      </Button>
    </form>
  );
}
