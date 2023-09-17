import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./global";
import { useState } from "react";

const formValidationSchema = yup.object({
  userName: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export function Login() {
  const navigate = useNavigate();
  let [loginState, setLoginState] = useState("success")
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (user) => {
        // console.log("Form values", user);
        const data = await fetch(`${API}/admin/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(user),
        })
        if(data.status === 400){
          // console.log(Error);
          setLoginState("error");
          alert("invalid credentials");
        }else{
          setLoginState("success");
          const result = await data.json();
          console.log(result);
          sessionStorage.setItem("token", result.token);
          navigate("/admin")
          alert("Login Successful");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h3>Login Form</h3>
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
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        error={touched.password && errors.password}
        helperText={
          touched.password && errors.password ? errors.password : null
        }
      />
      <Button color={loginState} type="submit" variant="contained">
        {loginState==="success" ? "Submit" : "Retry"}
      </Button>
      <Button variant="text" onClick={() => navigate("/admin/signUp")}>
        New User?Signup
      </Button>
      {/* // <Button variant="text" onClick={() => navigate("/admin/forgetPassword")}>
      //   Forget Password
      // </Button> */}
    </form>
  );
}
