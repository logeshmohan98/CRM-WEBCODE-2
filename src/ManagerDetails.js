import { useEffect, useState } from "react";
import { API } from "./global";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export function ManagerDetails() {
  const [manager, setManager] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${API}/admin/manager/${id}`)
      .then((res) => res.json())
      .then((result) => setManager(result));
  }, [id]);

  return manager ? <ManagerDet manager={manager} /> : <h2>Loading...</h2>;
}

function ManagerDet({ manager }) {
  const navigate = useNavigate();

  return (
    <div className="main-card">
      <h3 className="title">
        Hello all welcome to the {manager.firstName} details page
      </h3>
      <div className="card">
        <p>
          <strong>FirstName : </strong>
          {manager.firstName}
        </p>
        <p>
          <strong>LastName : </strong>
          {manager.lastName}
        </p>
        <p>
          <strong>UserName : </strong>
          {manager.userName}
        </p>
        <p>
          <strong>Address : </strong>
          {manager.address}
        </p>
        <p>
          <strong>Contact : </strong>
          {manager.contact}
        </p>
      </div>
      <div className="back-btn">
        <Button variant="contained" onClick={() => navigate("/admin/manager")}>
          ⬅Back
        </Button>
      </div>
    </div>
  );
}
