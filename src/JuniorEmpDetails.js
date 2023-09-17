import { useEffect, useState } from "react";
import { API } from "./global";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export function JuniorEmpDetails() {
  const [juniorEmp, setJuniorEmp] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${API}/admin/juniorEmp/${id}`)
      .then((res) => res.json())
      .then((result) => setJuniorEmp(result));
  }, [id]);
  return juniorEmp ? (
    <JuniorEmpDet juniorEmp={juniorEmp} />
  ) : (
    <h2>Loading...</h2>
  );
}

function JuniorEmpDet({ juniorEmp }) {
  const navigate = useNavigate();

  return (
    <div className="main-card">
      <h3 className="title">
        Hello all welcome to the {juniorEmp.firstName} details page
      </h3>
      <div className="card">
        <p>
          <strong>FirstName : </strong>
          {juniorEmp.firstName}
        </p>
        <p>
          <strong>LastName : </strong>
          {juniorEmp.lastName}
        </p>
        <p>
          <strong>UserName : </strong>
          {juniorEmp.userName}
        </p>
        <p>
          <strong>Address : </strong>
          {juniorEmp.address}
        </p>
        <p>
          <strong>Contact : </strong>
          {juniorEmp.contact}
        </p>
      </div>
      <div className="back-btn">
        <Button
          variant="contained"
          onClick={() => navigate("/admin/juniorEmp")}
        >
          ⬅Back
        </Button>
      </div>
    </div>
  );
}
