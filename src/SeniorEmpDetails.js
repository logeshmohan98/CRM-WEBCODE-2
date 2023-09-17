import { useEffect, useState } from "react";
import { API } from "./global";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export function SeniorEmpDetails() {
  const [seniorEmp, setSeniorEmp] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${API}/admin/seniorEmp/${id}`)
      .then((res) => res.json())
      .then((result) => setSeniorEmp(result));
  }, [id]);

  return seniorEmp ? (
    <SeniorEmpDet seniorEmp={seniorEmp} />
  ) : (
    <h2>Loading...</h2>
  );
}

function SeniorEmpDet({ seniorEmp }) {
  const navigate = useNavigate();
  return (
    <div className="main-card">
      <h3 className="title">
        Hello all welcome to the {seniorEmp.firstName} details page
      </h3>
      <div className="card">
        <p>
          <strong>FirstName : </strong>
          {seniorEmp.firstName}
        </p>
        <p>
          <strong>LastName : </strong>
          {seniorEmp.lastName}
        </p>
        <p>
          <strong>UserName : </strong>
          {seniorEmp.userName}
        </p>
        <p>
          <strong>Address : </strong>
          {seniorEmp.address}
        </p>
        <p>
          <strong>Contact : </strong>
          {seniorEmp.contact}
        </p>
      </div>
      <div className="back-btn">
        <Button
          variant="contained"
          onClick={() => navigate("/admin/seniorEmp")}
        >
          ⬅Back
        </Button>
      </div>
    </div>
  );
}
