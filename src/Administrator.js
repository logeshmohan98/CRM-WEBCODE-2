import { useNavigate } from "react-router-dom";

export function Administrator() {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="title">Hello all welcome to the administrator page</h3>
      <div className="btns">
        <button
          className="btn"
          onClick={() => navigate("/admin/manager")}
        >
          Manager Details
        </button>
        <button
          className="btn"
          onClick={() => navigate("/admin/seniorEmp")}
        >
          SeniorEmployees Details
        </button>
        <button
          className="btn"
          onClick={() => navigate("/admin/juniorEmp")}
        >
          JuniorEmployees Details
        </button>
      </div>
    </div>
  );
}
