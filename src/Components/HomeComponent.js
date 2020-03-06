import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ContatoServices from "../Services/ContatoServices";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import ModalComponent from "../Components/ModalComponent";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  addBottom: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    position: "fixed",
    "&:hover": {
      background: "#40A797"
    }
  },
  content: {
    height: "calc(100vh - 112px)",
    overflow: "auto"
  }
});

export default function HomeComponent() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  let [modal, setmodal] = useState({ open: false, data: [] });

  const fetch = async () => {
    setRows([]);

    const resource = await ContatoServices.getAll();
    setRows(resource.data);
  };
  const clickOpenModal = data => {
    setmodal({ open: true, data });
  };

  const closeModal = () => {
    setmodal({ open: false, data: [] });
    fetch();
  };

  const deleteHandle = async (row) =>{
    const resource = await ContatoServices.Delete(row._id);
    fetch();

  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <ModalComponent modal={modal} onClose={() => closeModal()} />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Canal</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row">
                  Nenhum contato cadastrado
                </TableCell>
              </TableRow>
            )}

            {rows.length > 0 &&
              rows.map(row => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.nome}
                  </TableCell>
                  <TableCell align="right">{row.canal}</TableCell>
                  <TableCell align="right">{row.valor}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => clickOpenModal(row)}
                    >
                      Editar
                    </Button>
                    <Button
                      color="Secondary"
                      onClick={async () => deleteHandle(row)}
                    >
                      Apagar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.addBottom}
          onClick={() => clickOpenModal([])}
          id="ProposalAdd"
        >
          <AddIcon />
        </Fab>
      </TableContainer>
    </>
  );
}
