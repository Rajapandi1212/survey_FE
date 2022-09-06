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
import { Link } from "react-router-dom";

import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import {
  listQuestions,
  listQuestionnaires,
  getQuestionnaire,
} from "../../graphql/queries";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../graphql/mutations";

import AdminMenu from "./index";
import { useState } from "react";
import { validate } from "graphql";

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

  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [order, setOrder] = useState(1);
  const [openAddListItem, setOpenAddListItem] = useState(false);

  const [listItemOptions, setListItemOptions] = useState([]);
  const [openAddCheckItem, setOpenAddCheckItem] = useState(false);
  const [checkItemOptions, setCheckItemOptions] = useState([]);
  const [listItem, setListItem] = useState("");
  const [checkItem, setCheckItem] = useState("");
  const [nextQuestion, setNextQuestion] = useState("");
  const [nextQuestionForOther, setNextQuestionForOther] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  // const [currentQuestion, setCurrentQuestion] = useState(null);

  //checkbox with text//

  const [openCheckboxWithText, setOpenCheckboxWithText] = useState(false);
  const [CbWithTextItemOptions, setCbWithTextItemOptions] = useState([]);
  const [cbWithTextItem, setCbTextItem] = useState("");
  //Redio with text//

  const [openRadioWithText, setOpenRadioWithText] = useState(false);
  const [radioWithTextItemOptions, setRadioWithTextItemOptions] = useState([]);
  const [radioWithTextItem, setRadioTextItem] = useState("");

  /*Closing Add checkbox Item with text Options dialog */
  const handleAddCbWithTextItemClose = () => {
    setOpenCheckboxWithText(false);
  };

  /* Addingcheck checkbox with text Options */

  const handleAddingCbWithTextOptions = () => {
    setListItemOptions((prevState) => [
      ...prevState,
      { listValue: cbWithTextItem, nextQuestion: nextQuestion },
    ]);
    setCbTextItem("");
    setNextQuestion("");
  };
  /*Closing Add radio Item with text Options dialog */
  const handleAddRadioWithTextItemClose = () => {
    setOpenRadioWithText(false);
  };

  /* Adding radio with text Options */

  const handleAddingRadioWithTextOptions = () => {
    setListItemOptions((prevState) => [
      ...prevState,
      { listValue: radioWithTextItem, nextQuestion: nextQuestion },
    ]);
    setRadioTextItem("");
    setNextQuestion("");
  };

  const {
    data: { loading, error, getQuestionnaire },
  } = props.getQuestionnaire;

  /* open edit question dial box*/
  const handleOpenEditDialog = () => {
    setOpenEdit(true);
  };

  /*Opening Creating new question Dialobox*/
  const handleOpenDialog = () => {
    setOpen(true);
  };

  /*Deleting question by ID*/
  const handleDelete = (id) => {
    props.onDeleteQuestion({
      id: id,
    });
  };

  /*Changing new question value */
  const onQuestionChange = (newValue) => {
    if (question === newValue) {
      setQuestion(newValue);
      return;
    }
    setQuestion(newValue);
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

    if (type === "LIST" && listItemOptions.length > 0) {
      createQuestionQuery.listOptions = listItemOptions;
    }

    if (type === "CHECKBOX" && listItemOptions.length > 0) {
      createQuestionQuery.listOptions = listItemOptions;
    }
    if (type === "CHECKBOXWITHTEXT" && listItemOptions.length > 0) {
      createQuestionQuery.listOptions = listItemOptions;
    }
    if (type === "RADIOWITHTEXT" && listItemOptions.length > 0) {
      createQuestionQuery.listOptions = listItemOptions;
    } else {
      if (nextQuestionForOther)
        createQuestionQuery.listOptions = {
          listValue: type,
          nextQuestion: nextQuestionForOther,
        };
    }
    console.log("createQuestionQuery", createQuestionQuery);

    props.onCreateQuestion(createQuestionQuery, getQuestionnaire?.id);
    setQuestion("");
    setType("");
    setOrder(1);
    setNextQuestionForOther("");
    setListItem("");
    setCheckItem("");
    setCbTextItem("");

    setRadioTextItem("");

    setNextQuestion("");
    setListItemOptions([]);

    setOpen(false);
  };

  /*edit question*/
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

    setType("");
    setOrder(1);
    setNextQuestionForOther("");
    setListItem("");
    setNextQuestion("");
    setListItemOptions([]);
    setOpen(false);
  };

  /* Get quetion by questionID */
  const onGettingQuestionById = (id) => {
    const que = getQuestionnaire?.question?.items?.find((q) => q?.id === id);

    return que?.qu ?? id;
  };

  /* Adding List Item Options */
  const handleAddingListItemOptions = () => {
    setListItemOptions((prevState) => [
      ...prevState,
      { listValue: listItem, nextQuestion: nextQuestion },
    ]);
    setListItem("");
    setNextQuestion("");
  };
  /* Addingcheck Item Options */
  const handleAddingCheckItemOptions = () => {
    setListItemOptions((prevState) => [
      ...prevState,
      { listValue: checkItem, nextQuestion: nextQuestion },
    ]);
    setCheckItem("");
    setNextQuestion("");
  };

  /*Closing Add List Item Options dialog */
  const handleAddListItemClose = () => {
    setOpenAddListItem(false);
  };
  /*Closing Add checkbox Item with text Options dialog */
  const handleAddCheckItemClose = () => {
    setOpenAddCheckItem(false);
  };

  /*Closing create question dialog */
  const handleClose = () => {
    setOpen(false);
  };

  /*Closing edit question dialog */
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  /* Side effect to open List dialog */
  useEffect(() => {
    if (type === "LIST") {
      setOpenAddListItem(true);
    }
  }, [type]);

  useEffect(() => {
    if (type === "CHECKBOX") {
      setOpenAddCheckItem(true);
    }
  }, [type]);
  useEffect(() => {
    if (type === "CHECKBOXWITHTEXT") {
      setOpenCheckboxWithText(true);
    }
  }, [type]);

  useEffect(() => {
    if (type === "RADIOWITHTEXT") {
      setOpenRadioWithText(true);
    }
  }, [type]);

  console.log(
    "checkItemOptions",
    checkItemOptions,
    type,
    checkItemOptions?.length
  );

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
        {/* //edit// start*/}
        <Dialog
          fullWidth
          open={openEdit}
          onClose={handleEditClose}
          aria-labelledby="form-dialog-title"
        >
          <FormControl>
            <DialogTitle id="form-dialog-title">
              Create Question - {getQuestionnaire?.name}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                To create a new Question, please complete the following details.
              </DialogContentText>
              {/* <DialogContentText>
         Questionnaire :  <span style={{textDecoration:"underline",fontSize:"18px"}}> {getQuestionnaire?.name}</span>
            </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="qu"
                label="Question"
                value={question}
                onChange={(event) => onQuestionChange(event.target.value)}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  margin="dense"
                  fullWidth
                  value={type}
                  onChange={(event) => onTypeChange(event.target.value)}
                >
                  <MenuItem value={"TEXT"}>Text</MenuItem>
                  <MenuItem value={"LIST"}>List</MenuItem>
                  <MenuItem value={"CHECKBOX"}>Checkbox</MenuItem>
                  <MenuItem value={"CHECKBOXWITHTEXT"}>
                    Checkbox with text
                  </MenuItem>
                  <MenuItem value={"RADIOWITHTEXT"}>Radio with text</MenuItem>
                  {/* <MenuItem value={"BOOL"}>Boolean</MenuItem> */}
                </Select>
              </FormControl>
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
              {type === "TEXT" &&
                type === "CHECKBOX" &&
                type === "CHECKBOXWITHTEXT" && (
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
                          {que?.qu}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              {/* {type === "CHECKBOX" && (
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
                        {que?.qu}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )} */}

              <br />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="default">
                Cancel
              </Button>
              <Button onClick={handleEdit} type="button" color="primary">
                Create
              </Button>
            </DialogActions>
          </FormControl>
        </Dialog>

        {/* //edit//  end*/}

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
              <DialogContentText>
                To create a new Question, please complete the following details.
              </DialogContentText>
              {/* <DialogContentText>
         Questionnaire :  <span style={{textDecoration:"underline",fontSize:"18px"}}> {getQuestionnaire?.name}</span>
            </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="qu"
                label="Question"
                value={question}
                onChange={(event) => onQuestionChange(event.target.value)}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  margin="dense"
                  fullWidth
                  value={type}
                  onChange={(event) => onTypeChange(event.target.value)}
                >
                  <MenuItem value={"TEXT"}>Text</MenuItem>
                  <MenuItem value={"LIST"}>List</MenuItem>
                  {/* <MenuItem value={"BOOL"}>Boolean</MenuItem> */}
                  <MenuItem value={"CHECKBOX"}>Checkbox </MenuItem>
                  <MenuItem value={"CHECKBOXWITHTEXT"}>
                    Checkbox with text
                  </MenuItem>
                  <MenuItem value={"RADIOWITHTEXT"}>Radio with text</MenuItem>
                </Select>
              </FormControl>
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
              {type === "TEXT" && (
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
                        {que?.qu}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <br />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default">
                Cancel
              </Button>
              <Button onClick={handleCreate} type="button" color="primary">
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
                      {que?.qu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {listItemOptions?.length > 0 && (
                <div style={{ margin: "15px 0" }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Option</TableCell>
                        <TableCell>Question</TableCell>
                        {/* <TableCell>Manage</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listItemOptions.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item?.listValue}</TableCell>
                          <TableCell>
                            {" "}
                            {onGettingQuestionById(item?.nextQuestion)}
                          </TableCell>
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

        {/* checkbox  */}

        <Dialog
          open={openAddCheckItem}
          onClose={handleAddCheckItemClose}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <FormControl>
            <DialogTitle id="form-dialog-title">Add Check Items</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="qu"
                label="checkbox list item"
                value={checkItem}
                onChange={(event) => setCheckItem(event.target.value)}
                fullWidth
              />
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
                      {que?.qu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {listItemOptions?.length > 0 && (
                <div style={{ margin: "15px 0" }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Option</TableCell>
                        <TableCell>Question</TableCell>
                        {/* <TableCell>Manage</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listItemOptions.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item?.listValue}</TableCell>
                          <TableCell>
                            {" "}
                            {onGettingQuestionById(item?.nextQuestion)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddCheckItemClose} color="default">
                Close
              </Button>
              <Button
                onClick={handleAddingCheckItemOptions}
                type="button"
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </FormControl>
        </Dialog>

        {/* checkbox with text */}
        <Dialog
          open={openCheckboxWithText}
          onClose={handleAddCbWithTextItemClose}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <FormControl>
            <DialogTitle id="form-dialog-title">
              Add Checkbox with text item
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="qu"
                label="checkbox list item"
                value={cbWithTextItem}
                onChange={(event) => setCbTextItem(event.target.value)}
                fullWidth
              />
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
                      {que?.qu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {listItemOptions?.length > 0 && (
                <div style={{ margin: "15px 0" }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Option</TableCell>
                        <TableCell>Question</TableCell>
                        {/* <TableCell>Manage</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listItemOptions.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item?.listValue}</TableCell>
                          <TableCell>
                            {" "}
                            {onGettingQuestionById(item?.nextQuestion)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddCbWithTextItemClose} color="default">
                Close
              </Button>
              <Button
                onClick={handleAddingCbWithTextOptions}
                type="button"
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </FormControl>
        </Dialog>

        {/* Radio with text */}
        <Dialog
          open={openRadioWithText}
          onClose={handleAddRadioWithTextItemClose}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <FormControl>
            <DialogTitle id="form-dialog-title">
              Add Radio with text item
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="qu"
                label="Radio list item"
                value={radioWithTextItem}
                onChange={(event) => setRadioTextItem(event.target.value)}
                fullWidth
              />
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
                      {que?.qu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {listItemOptions?.length > 0 && (
                <div style={{ margin: "15px 0" }}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Option</TableCell>
                        <TableCell>Question</TableCell>
                        {/* <TableCell>Manage</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listItemOptions.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item?.listValue}</TableCell>
                          <TableCell>
                            {" "}
                            {onGettingQuestionById(item?.nextQuestion)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddRadioWithTextItemClose} color="default">
                Close
              </Button>
              <Button
                onClick={handleAddingRadioWithTextOptions}
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
                <TableCell>Order</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>List Options</TableCell>
                <TableCell>Manage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getQuestionnaire?.question?.items
                .sort((a, b) => a?.order - b?.order)
                .map((question, i) => (
                  <TableRow key={i}>
                    <TableCell>{question.order}</TableCell>
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
                      <Button
                        size="small"
                        color="primary"
                        component={Link}
                        to={`/admin/editQuestion/${question.id}`}
                      >
                        <EditIcon />
                      </Button>
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
)(QuestionnarieQuestionPart);

export default withApollo(Question);
