import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { API } from "./global";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const checkAuth = (res) => {
  if (res.status === 401) {
    throw Error("unauthorized");
  } else {
    return res.json();
  }
};

const logout = () => {
  sessionStorage.clear();
  window.location.href = "/admin";
};

export function AdminSeniorEmp() {
  const [seniorEmp, setSeniorEmp] = useState(null);

  const getSeniorEmp = () => {
    fetch(`${API}/admin/seniorEmp`, {
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    })
      .then((res) => checkAuth(res))
      .then((result) => setSeniorEmp(result))
      .catch((err) => logout());
  };

  useEffect(() => getSeniorEmp(), []);

  return seniorEmp ? (
    <Senior seniorEmp={seniorEmp} getSeniorEmp={getSeniorEmp} />
  ) : (
    <h2>Loading table...</h2>
  );
}

function Senior({ seniorEmp, getSeniorEmp }) {
  const navigate = useNavigate();
  const deleteSeniorEmp = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user"
    );
    if (confirmDelete === true) {
      await fetch(`${API}/admin/delete/seniorEmp/${id}`, {
        method: "DELETE",
      });
    }
    getSeniorEmp();
  };

  return (
    <div>
      <h3 className="title">
        Hello Admin welcome to the senior employee details
      </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seniorEmp.map((data) => (
              <StyledTableRow key={data._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {data._id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {data.firstName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {data.lastName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {data.userName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/admin/seniorEmp/${data._id}`)}
                  >
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() =>
                      navigate(`/admin/edit/seniorEmp/${data._id}`)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteSeniorEmp(data._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="add-btn">
        <Button
          variant="contained"
          onClick={() => navigate("/admin/create/seniorEmp")}
        >
          Add Senior Employee
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin")}>
          ⬅Back
        </Button>
      </div>
    </div>
  );
}
