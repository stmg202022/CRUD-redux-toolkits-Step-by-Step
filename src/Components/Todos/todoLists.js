import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
//chekBox
import Checkbox from "@mui/material/Checkbox";

import { useSelector } from "react-redux";
import { selectTodoById } from "../../ReduxSlice/Todos/todosSlice";

export default function TodoLists({ todoId }) {
  console.log(todoId);

  const todo = useSelector((state) => selectTodoById(state, todoId));
  console.log("todo", todo);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handlechecked = (e) => {
    // console.log(todo.id);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <ListItemButton
        sx={{
          bgcolor: todo.completed ? "lightgreen" : "red",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: todo.completed ? "lightgreen" : "red",
          },
        }}
      >
        {todo.completed ? (
          <Checkbox
            {...label}
            defaultChecked
            color="success"
            onClick={handlechecked}
          />
        ) : (
          <Checkbox {...label} defaultChecked onClick={handlechecked} />
        )}

        <ListItemText primary={`${todo.title}`} />
        <Button variant="contained" sx={{ margin: "2px" }}>
          Delete
        </Button>
        <Button variant="contained" sx={{ margin: "2px" }}>
          Edit
        </Button>
      </ListItemButton>
    </List>
  );
}
