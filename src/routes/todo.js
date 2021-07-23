const { Router } = require("express");
const {
  getTodos,
  getTodoById,
  addTodo,
  deleteTodoById,
  updateTodoById,
} = require("../controllers/todo");

const router = Router();

router.get("/todos", getTodos);

router.get("/todo/:id", getTodoById);

router.post("/todo", addTodo);

router.delete("/todo/:id", deleteTodoById);

router.patch("/todo/:id", updateTodoById);

module.exports = router;
