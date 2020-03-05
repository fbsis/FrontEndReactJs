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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function HomeComponent() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  fetch = async () => {
    const resource = await ContatoServices.getAll();
    setRows(resource.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Canal</TableCell>
            <TableCell align="right">Valor</TableCell>
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
              <TableRow key={row.nome}>
                <TableCell component="th" scope="row">
                  {row.nome}
                </TableCell>
                <TableCell align="right">{row.canal}</TableCell>
                <TableCell align="right">{row.valor}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
