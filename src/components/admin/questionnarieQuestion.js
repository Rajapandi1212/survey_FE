import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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

import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import {
  listQuestions,
  listQuestionnaires,
  getQuestionnaire,
} from "../../graphql/queries";
import { createQuestion, deleteQuestion } from "../../graphql/mutations";

import AdminMenu from "./index";
import { useState } from "react";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  image: {
    width: 64,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const QuestionnarieQuestionPart = (props) => {
  const classes = useStyles();
  const {
    data: { loading, error, getQuestionnaire },
  } = props.getQuestionnaire;
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [order, setOrder] = useState(1);
  const [currentMode, setCurrentMode] = useState("normal");
  const [type, setType] = useState("");
  const [openAddListItem, setOpenAddListItem] = useState(false);
  const [listItemOptions, setListItemOptions] = useState([]);
  const [listItem, setListItem] = useState("");
  const [nextQuestion, setNextQuestion] = useState("");
  const [nextQuestionForOther, setNextQuestionForOther] = useState("");
  const [dependentQuestion, setDependentQuestion] = useState("");
  const [dependentQuestionOptions, setDependentQuestionOptions] = useState([]);

  /*Deleting question by ID*/
  const handleDelete = (id) => {
    props.onDeleteQuestion({
      id: id,
    });
  };

  /*Opening Creating new question Dialobox*/
  const handleOpenDialog = () => {
    setOpen(true);
  };

  /*Changing new question value */
  const onQuestionChange = (newValue) => {
    if (question === newValue) {
      setQuestion(newValue);
      return;
    }
    setQuestion(newValue);
  };

  /*Changing question mode */
  const onModeChange = (event, newValue) => {
    setCurrentMode(newValue);
  };

  /*Changing new question value */
  const onTypeChange = (newValue) => {
    if (type === newValue) {
      setType(newValue);
      return;
    }
    setType(newValue);
  };

  /*Creating new Question */
  const handleCreate = (event) => {
    event.preventDefault();
    let createQuestionQuery = {
      qu: question,
      type: type,
      order: order,
      questionQuestionnaireId: getQuestionnaire?.id,
    };
    if (currentMode === "dependent") {
      const dependentQuestionQuery = {
        id: dependentQuestion,
        options: dependentQuestionOptions,
      };
      createQuestionQuery.isDependent = true;
      createQuestionQuery.dependent = dependentQuestionQuery;
    }
    if (currentMode === "self") createQuestionQuery.isSelf = true;
    if (type && type === "TEXT") {
      if (currentMode === "self" && nextQuestionForOther) {
        createQuestionQuery.listOptions = {
          listValue: type,
          nextQuestion: nextQuestionForOther,
        };
      }
    }
    if (type && type !== "TEXT") {
      if (listItemOptions.length > 0)
        createQuestionQuery.listOptions = listItemOptions;
    }
    // console.log("createQuestionQuery", createQuestionQuery);
    props.onCreateQuestion(createQuestionQuery, getQuestionnaire?.id);
    setQuestion("");
    setOrder(1);
    setCurrentMode("normal");
    setType("");
    setNextQuestionForOther("");
    setListItem("");
    setNextQuestion("");
    setListItemOptions([]);
    setDependentQuestion("");
    setDependentQuestionOptions([]);
    setOpen(false);
  };

  /* Get quetion by questionID */
  const onGettingQuestionById = (id) => {
    const que = getQuestionnaire?.question?.items?.find((q) => q?.id === id);
    return que?.qu ?? id;
  };

  /* Adding List Item Options */
  const handleAddingListItemOptions = () => {
    let listQuery = {
      listValue: listItem,
    };
    if (currentMode === "self") listQuery.nextQuestion = nextQuestion;
    setListItemOptions((prevState) => [...prevState, listQuery]);
    setListItem("");
    setNextQuestion("");
  };

  /* Adding List Item Options */
  const handleSettingDependentNextQuestion = (que, optionValue) => {
    const isAlreadyExisting = dependentQuestionOptions?.find(
      (option) => option?.dependentValue === optionValue
    );
    if (isAlreadyExisting) {
      setDependentQuestionOptions(
        dependentQuestionOptions?.filter(
          (option) => option?.dependentValue !== optionValue
        )
      );
    }
    setDependentQuestionOptions((prevSate) => [
      ...prevSate,
      { dependentValue: optionValue, nextQuestion: que },
    ]);
  };

  /*Closing Add List Item Options dialog */
  const handleAddListItemClose = () => {
    setOpenAddListItem(false);
  };

  /*Closing create question dialog */
  const handleClose = () => {
    setQuestion("");
    setOrder(1);
    setCurrentMode("normal");
    setType("");
    setNextQuestionForOther("");
    setListItem("");
    setNextQuestion("");
    setListItemOptions([]);
    setDependentQuestion("");
    setDependentQuestionOptions([]);
    setOpen(false);
  };

  /* Side effect to open List dialog */
  useEffect(() => {
    if (type && type !== "TEXT") {
      if (type === "CHECKBOX") setCurrentMode("normal");
      setOpenAddListItem(true);
    }
  }, [type]);
  if (loading) {
    return (
      <div>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
  if (error) {
    console.log(error);
    return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Error
          </Typography>
          <Typography component="p">
            An error occured while fetching data.
          </Typography>
          <Typography component="p">{error}</Typography>
        </Paper>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <AdminMenu />
      <div>
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <FormControl>
            <DialogTitle id="form-dialog-title">
              Create Question - {getQuestionnaire?.name}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="qu"
                label="Question"
                value={question}
                onChange={(event) => onQuestionChange(event.target.value)}
                fullWidth
              />
              <TextField
                margin="dense"
                id="order"
                label="Order"
                type="number"
                value={order}
                placeholder="Similar to question number"
                onChange={(event) => setOrder(event.target.value)}
                fullWidth
              />
              <FormControl fullWidth>
                <FormLabel
                  style={{ margin: "10px 0", color: "black" }}
                  id="demo-radio-buttons-group-label"
                >
                  Mode
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={currentMode}
                  onChange={onModeChange}
                  row
                >
                  <FormControlLabel
                    value="normal"
                    control={<Radio />}
                    label="Normal"
                  />
                  <FormControlLabel
                    value="self"
                    control={<Radio />}
                    label="Self"
                  />
                  <FormControlLabel
                    value="dependent"
                    control={<Radio />}
                    label="Dependent"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  margin="dense"
                  fullWidth
                  value={type}
                  onChange={(event) => onTypeChange(event.target.value)}
                >
                  <MenuItem value={"TEXT"}>Text</MenuItem>
                  <MenuItem value={"RADIO"}>Radio</MenuItem>
                  <MenuItem value={"CHECKBOX"}>Checkbox</MenuItem>
                  {/* <MenuItem value={"LISTTEXT"}>List Text</MenuItem> */}
                  {/* <MenuItem value={"CHECKBOXTEXT"}>Checkbox Text</MenuItem> */}
                </Select>
              </FormControl>

              {type === "TEXT" && currentMode === "self" && (
                <FormControl fullWidth>
                  <InputLabel>Next question</InputLabel>
                  <Select
                    margin="dense"
                    fullWidth
                    value={nextQuestionForOther}
                    onChange={(event) =>
                      setNextQuestionForOther(event.target.value)
                    }
                  >
                    {getQuestionnaire?.question?.items.map((que, q) => (
                      <MenuItem value={que?.id} key={q}>
                        {que?.order + "  " + que?.qu}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {currentMode === "dependent" && (
                <>
                  <FormControl fullWidth style={{ margin: "10px 0" }}>
                    <InputLabel>Dependent question</InputLabel>
                    <Select
                      margin="dense"
                      fullWidth
                      value={dependentQuestion}
                      onChange={(event) =>
                        setDependentQuestion(event.target.value)
                      }
                    >
                      {getQuestionnaire?.question?.items.map((que, q) => (
                        <MenuItem value={que?.id} key={q}>
                          {que?.order + "  " + que?.qu}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {dependentQuestion &&
                    getQuestionnaire?.question?.items
                      .find((q) => q.id === dependentQuestion)
                      ?.listOptions?.map((options, i) => (
                        <FormControl
                          fullWidth
                          style={{ margin: "3px 0" }}
                          key={i}
                        >
                          <InputLabel>{options?.listValue}</InputLabel>
                          <Select
                            margin="dense"
                            fullWidth
                            value={
                              dependentQuestionOptions.find(
                                (o) => o?.dependentValue === options?.listValue
                              )?.nextQuestion
                            }
                            onChange={(event) =>
                              handleSettingDependentNextQuestion(
                                event.target.value,
                                options?.listValue
                              )
                            }
                          >
                            {getQuestionnaire?.question?.items.map((que, q) => (
                              <MenuItem value={que?.id} key={q}>
                                {que?.order + "  " + que?.qu}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ))}
                </>
              )}

              <br />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default">
                Cancel
              </Button>
              <Button onClick={handleCreate} type="submit" color="primary">
                Create
              </Button>
            </DialogActions>
          </FormControl>
        </Dialog>
        <Dialog
          open={openAddListItem}
          onClose={handleAddListItemClose}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <FormControl>
            <DialogTitle id="form-dialog-title">Add listitems</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="qu"
                label="Listitem"
                value={listItem}
                onChange={(event) => setListItem(event.target.value)}
                fullWidth
              />
              {currentMode === "self" && (
                <FormControl fullWidth>
                  <InputLabel>Next question</InputLabel>
                  <Select
                    margin="dense"
                    fullWidth
                    value={nextQuestion}
                    onChange={(event) => setNextQuestion(event.target.value)}
                  >
                    {getQuestionnaire?.question?.items.map((que, q) => (
                      <MenuItem value={que?.id} key={q}>
                        {que?.order + "  " + que?.qu}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {listItemOptions?.length > 0 && (
                <div style={{ margin: "15px 0" }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Option</TableCell>
                        {currentMode === "self" && (
                          <TableCell>Question</TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listItemOptions.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item?.listValue}</TableCell>
                          {currentMode === "self" && (
                            <TableCell>
                              {onGettingQuestionById(item?.nextQuestion)}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddListItemClose} color="default">
                Close
              </Button>
              <Button
                onClick={handleAddingListItemOptions}
                type="button"
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </FormControl>
        </Dialog>
      </div>
      <main className={classes.content}>
        <Typography variant="h4">{getQuestionnaire?.name} </Typography>
        <p />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Question No</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>List Options</TableCell>
                <TableCell>Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getQuestionnaire?.question?.items.map((question, i) => (
                <TableRow key={i}>
                  <TableCell>{question?.order}</TableCell>
                  <TableCell>{question.qu}</TableCell>
                  <TableCell>{question.type}</TableCell>
                  <TableCell>
                    {question.listOptions
                      ? question.listOptions.map((option, l) => (
                          <li key={l}>{option?.listValue}</li>
                        ))
                      : "(Empty)"}
                  </TableCell>
                  <TableCell>
                    {/* <Button
                    size="small"
                    color="primary"
                    onClick={handleSnackBarClick}
                  >
                    <EditIcon />
                  </Button> */}
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        handleDelete(question.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleOpenDialog}
        >
          <AddCircleIcon className={classes.rightIcon} /> Add Question
        </Button>
      </main>
    </div>
  );
};

const Question = compose(
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
  graphql(gql(deleteQuestion), {
    props: (props) => ({
      onDeleteQuestion: (response) => {
        props.mutate({
          variables: {
            input: response,
          },
        });
      },
    }),
  }),
  graphql(gql(createQuestion), {
    props: (props) => ({
      onCreateQuestion: (response) => {
        props.mutate({
          variables: {
            input: response,
          },

          update: (store, { data: { createQuestion } }) => {
            const query = gql(listQuestions);
            const data = store.readQuery({ query });
            if (data?.listQuestions?.items?.length > 0) {
              data.listQuestions.items = [
                ...data.listQuestions.items.filter(
                  (item) => item.id !== createQuestion.id
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
)(QuestionnarieQuestionPart);

export default withApollo(Question);
