import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";

import ContatoServices from "./../Services/ContatoServices";
const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function ModalComponent(props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [content, setContent] = useState({
    _id: null,
    nome: "",
    canal: "",
    valor: "",
    obs: ""
  });

  useEffect(() => {
    let { open, data } = props.modal;
    if (open === true) {
      setOpen(true);
      setContent(data);
    }
  }, [props.modal]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const changeContent = (field, value) => {
    setContent({
      ...content,
      [field]: value
    });
  };

  const save = async () => {
    setIsloading(true);
    console.log(content._id);
    if (content._id === undefined) {
      await ContatoServices.Post(content._id, content);
    } else {
      await ContatoServices.Put(content._id, content);
    }
    setIsloading(false);
    handleClose();
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"Contato"}</DialogTitle>
        <DialogContent>
          {isLoading && <CircularProgress />}

          {!isLoading && (
            <form autoComplete="off">
              <div>
                <TextField
                  label="Nome"
                  fullWidth
                  margin="normal"
                  shrink
                  value={content.nome}
                  onChange={e => changeContent("nome", e.target.value)}
                />
                <TextField
                  label="Canal"
                  fullWidth
                  margin="normal"
                  shrink
                  value={content.canal}
                  onChange={e => changeContent("canal", e.target.value)}
                />
                <TextField
                  label="valor"
                  fullWidth
                  margin="normal"
                  shrink
                  value={content.valor}
                  onChange={e => changeContent("valor", e.target.value)}
                />
                <TextField
                  label="obs"
                  multiline
                  fullWidth
                  margin="normal"
                  shrink
                  rowsMin={3}
                  value={content.obs}
                  onChange={e => changeContent("obs", e.target.value)}
                />
              </div>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          <Button onClick={async () => save()} color="primary" autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
