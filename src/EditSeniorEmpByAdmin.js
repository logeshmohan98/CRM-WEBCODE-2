import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  userName: yup.string().required().email(),
  contact: yup.string().required().min(10).max(10),
  address: yup.string().required(),
});

export function EditSeniorEmpByAdmin() {
  const [seniorEmp, setSeniorEmp] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API}/admin/seniorEmp/${id}`)
      .then((res) => res.json())
      .then((result) => setSeniorEmp(result));
  }, [id]);
  return seniorEmp ? (
    <EditSeniorEmpForm data={seniorEmp} />
  ) : (
    <h2>Loading Form...</h2>
  );
}

function EditSeniorEmpForm({ data }) {
  const navigate = useNavigate()
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        contact: data.contact,
        address: data.address,
      },
      validationSchema: formValidationSchema,
      onSubmit: (editedSeniorEmp) => {
        console.log("Form values", editedSeniorEmp);
        editSeniorEmp(editedSeniorEmp);
      },
    });
  const editSeniorEmp = async (editedSeniorEmp) => {
    await fetch(`${API}/admin/edit/seniorEmp/${data._id}`, {
      method: "PUT",
      body: JSON.stringify(editedSeniorEmp),
      headers: { "Content-Type": "application/json" },
    });
    navigate("/admin/seniorEmp")
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <TextField
        label="First Name"
        variant="outlined"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.firstName && errors.firstName}
        helperText={
          touched.firstName && errors.firstName ? errors.firstName : null
        }
      />
      <TextField
        label="Last Name"
        variant="outlined"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.lastName && errors.lastName}
        helperText={
          touched.lastName && errors.lastName ? errors.lastName : null
        }
      />
      <TextField
        label="User Name"
        variant="outlined"
        name="userName"
        value={values.userName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.userName && errors.userName}
        helperText={
          touched.userName && errors.userName ? errors.userName : null
        }
      />
      <TextField
        label="Contact"
        variant="outlined"
        name="contact"
        value={values.contact}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.contact && errors.contact}
        helperText={touched.contact && errors.contact ? errors.contact : null}
      />
      <TextField
        label="Address"
        variant="outlined"
        name="address"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.address && errors.address}
        helperText={touched.address && errors.address ? errors.address : null}
      />
      <Button color="success" variant="contained" type="submit">
        Save
      </Button>
    </form>
  );
}
