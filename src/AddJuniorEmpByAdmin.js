import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "./global";
import * as yup from "yup";

const formValidationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  userName: yup.string().required().email(),
  contact: yup.string().required().min(10).max(10),
  address: yup.string().required(),
});

export function AddJuniorEmpByAdmin() {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      contact: "",
      address: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (newJuniorEmp) => {
      console.log("Form values", newJuniorEmp);
      addingManager(newJuniorEmp);
    },
  });
  let addingManager = async (newJuniorEmp) => {
    await fetch(`${API}/admin/create/juniorEmp`, {
      method: "POST",
      body: JSON.stringify(newJuniorEmp),
      headers: { "Content-Type": "application/json" },
    });
    navigate("/admin/juniorEmp");
  };
  return (
      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="First Name"
          variant="outlined"
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          onBlur={handleBlur}
          error={touched.firstName && errors.firstName}
          helperText={touched.firstName && errors.firstName ? errors.firstName : null}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          onBlur={handleBlur}
          error={touched.lastName && errors.lastName}
          helperText={touched.lastName && errors.lastName ? errors.lastName : null}
        />
        <TextField
          label="User Name"
          variant="outlined"
          name="userName"
          type="email"
          onChange={handleChange}
          value={values.userName}
          onBlur={handleBlur}
          error={touched.userName && errors.userName}
          helperText={touched.userName && errors.userName ? errors.userName : null}
        />
        <TextField
          label="Contact"
          variant="outlined"
          name="contact"
          onChange={handleChange}
          value={values.contact}
          onBlur={handleBlur}
          error={touched.contact && errors.contact}
          helperText={touched.contact && errors.contact ? errors.contact : null}
        />
        <TextField
          label="Address"
          variant="outlined"
          name="address"
          onChange={handleChange}
          value={values.address}
          onBlur={handleBlur}
          error={touched.address && errors.address}
          helperText={touched.address && errors.address ? errors.address : null}
        />
        <Button variant="outlined" type="submit">
          Add Junior Employee
        </Button>
      </form>
  );
}
