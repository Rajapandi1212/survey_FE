import React, { useEffect, useState } from "react";
import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import {
  listQuestions,
  listQuestionnaires,
  getQuestionnaire,
  getQuestion,
} from "../../graphql/queries";
import AdminMenu from "./index";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    marginLeft: 120,
    marginTop: 20,
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 1000,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
const EditQuestion = (props) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [order, setOrder] = useState(1);
  const classes = useStyles();
  const [listItemOptions, setListItemOptions] = useState([]);

  const [listItem, setListItem] = useState("");
  const [nextQuestion, setNextQuestion] = useState("");
  const [nextQuestionForOther, setNextQuestionForOther] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const {
    data: { getQuestion },
  } = props.getQuestion;
  console.log("getQuestion", props.getQuestion);

  /*Changing new question value */
  const onTypeChange = (newValue) => {
    if (type === newValue) {
      setType(newValue);
      return;
    }
    setType(newValue);
  };
  /*Changing new question value */
  const onQuestionChange = (newValue) => {
    if (question === newValue) {
      setQuestion(newValue);
      return;
    }
    setQuestion(newValue);
  };
  const handleEdit = (event) => {
    event.preventDefault();
    let updateQuestionQuery = {
      qu: question,
      type: type,
      order: order,
      questionQuestionnaireId: getQuestionnaire?.id,
    };
    if (type === "LIST" && listItemOptions.length > 0) {
      updateQuestionQuery.listOptions = listItemOptions;
    } else {
      if (nextQuestionForOther)
        updateQuestionQuery.listOptions = {
          listValue: type,
          nextQuestion: nextQuestionForOther,
        };
    }
    props.onUpadateQuestion(
      updateQuestionQuery,
      getQuestionnaire?.getQuestion?.id
    );
    const {
      data: { loading, error, getQuestionnaire },
    } = props.getQuestionnaire;

    setType("");
    setOrder(1);
    setNextQuestionForOther("");
    setListItem("");
    setNextQuestion("");
    setListItemOptions([]);
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <div>
        {" "}
        <AdminMenu />
      </div>
      <div className={classes.root}>
        <FormControl fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="qu"
            label="Question"
            value={getQuestion?.qu}
            onChange={(event) => onQuestionChange(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
        </FormControl>

        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            margin="dense"
            value={getQuestion?.type}
            onChange={(event) => onTypeChange(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          >
            <MenuItem value={"TEXT"}>Text</MenuItem>
            <MenuItem value={"LIST"}>List</MenuItem>
            {/* <MenuItem value={"BOOL"}>Boolean</MenuItem> */}
            <MenuItem value={"CHECKBOX"}>Checkbox </MenuItem>
            <MenuItem value={"CHECKBOXWITHTEXT"}>Checkbox with text</MenuItem>
            <MenuItem value={"RADIOWITHTEXT"}>Radio with text</MenuItem>
          </Select>
          <TextField
            margin="dense"
            id="order"
            label="Order"
            type="number"
            value={getQuestion?.order}
            placeholder="Similar to question number"
            onChange={(event) => setOrder(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
          {type === "TEXT" && (
            <FormControl>
              <InputLabel>Next question</InputLabel>
              <Select
                margin="dense"
                value={nextQuestionForOther}
                onChange={(event) =>
                  setNextQuestionForOther(event.target.value)
                }
                variant="filled"
              >
                {getQuestionnaire?.question?.items.map((que, q) => (
                  <MenuItem value={que?.id} key={q}>
                    {que?.qu}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl fullWidth>
            <InputLabel>Next question</InputLabel>
            <Select
              margin="dense"
              fullWidth
              value={getQuestion?.listOptions?.nextQuestion}
              onChange={(event) => setNextQuestion(event.target.value)}
            >
              {getQuestionnaire?.question?.items.map((que, q) => (
                <MenuItem value={que?.id} key={q}>
                  {que?.qu}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormControl>
      </div>
    </div>
  );
};
const Question = compose(
  graphql(gql(getQuestion), {
    options: (props) => ({
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: { id: props.match.params.editQuestionID },
    }),
    props: (props) => {
      return {
        getQuestion: props ? props : [],
      };
    },
  }),
  graphql(gql(getQuestionnaire), {
    options: (props) => ({
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: { id: props.match.params.questionnaire },
    }),
    props: (props) => {
      return {
        getQuestionnaire: props ? props : [],
      };
    },
  }),

  graphql(gql(updateQuestion), {
    props: (props) => ({
      onUpadateQuestion: (response) => {
        props.mutate({
          variables: {
            input: response,
          },

          update: (store, { data: { updateQuestion } }) => {
            const query = gql(listQuestions);
            const data = store.readQuery({ query });
            if (data?.listQuestions?.items?.length > 0) {
              data.listQuestions.items = [
                ...data.listQuestions.items.filter(
                  (item) => item.id !== updateQuestion.id
                ),
                createQuestion,
              ];
            }
            store.writeQuery({
              query,
              data,
              variables: { filter: null, limit: null, nextToken: null },
            });
          },
        });
      },
    }),
  })
)(EditQuestion);

export default withApollo(Question);
