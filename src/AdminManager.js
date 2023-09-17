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

export function AdminManager() {
  const [managerData, setManagerData] = useState(null);

  const getManager = () => {
    fetch(`${API}/admin/manager`, {
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    })
      .then((res) => checkAuth(res))
      .then((result) => setManagerData(result))
      .catch((err) => logout());
  };

  useEffect(() => getManager(), []);

  return managerData ? (
    <Manager managerData={managerData} getManager={getManager} />
  ) : (
    <h2>Loading Table...</h2>
  );
}

function Manager({ managerData, getManager }) {
  const navigate = useNavigate();
  const deleteManager = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user"
    );
    if (confirmDelete === true) {
      await fetch(`${API}/admin/delete/manager/${id}`, {
        method: "DELETE",
      });
    }
    getManager();
  };

  return (
    <div>
      <h3 className="title">Hello Admin welcome to the manager details</h3>
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
            {managerData.map((managerData) => (
              <StyledTableRow key={managerData._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {managerData._id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {managerData.firstName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {managerData.lastName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {managerData.userName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/admin/manager/${managerData._id}`)
                    }
                  >
                    <InfoIcon />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() =>
                      navigate(`/admin/edit/manager/${managerData._id}`)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteManager(managerData._id)}
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
          onClick={() => navigate("/admin/create/manager")}
        >
          Add Manager
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin")}>
          ⬅Back
        </Button>
      </div>
    </div>
  );
}
