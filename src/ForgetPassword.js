import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { API } from "./global";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  userName: yup.string().required().email(),
});

export function ForgetPassword() {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (newUser) => {
        // console.log("Form values", newUser);
        // addUser(newUser);
        const data = await fetch(`${API}/admin/forgetPassword`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (data.status === 400) {
          // console.log(Error);
          alert("UserName does not exist(redirecting to signup page)");
          navigate("/admin/signUp");
        }
        else {
          alert("Link will be forwaded to your email");
          navigate("/admin/linkCheck");
        } 
      },
    });
  return (<form onSubmit={handleSubmit} className="register-form">
  <h3>Forget Password Form</h3>
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
  <Button variant="contained" type="submit">
    Submit
  </Button>
</form>);
}
