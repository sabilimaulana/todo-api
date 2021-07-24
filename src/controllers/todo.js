const db = require("../../models");

exports.getTodos = async (req, res) => {
  try {
    console.log("Mengakses /todos");
    const result = await db.Todo.findAll({ order: [["createdAt", "ASC"]] });

    res.status(200).json({
      status: "Success",
      message: "Get all todos success",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Get all todos failed", error });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await db.Todo.findOne({
      where: {
        id,
      },
    });

    if (todo) {
      res.status(200).json({
        status: "Success",
        message: `Get todo by id: ${id} success`,
        data: todo,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: `Get todo by id: ${id} failed, because todo with that id doesn't exist`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Get todo by id failed", error });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { title, status } = req.body;

    const todo = await db.Todo.create({
      title,
      status,
    });

    const todosAfterUpdated = await db.Todo.findAll({
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({
      status: "Success",
      message: "Add todo success",
      data: {
        recentlyAddedData: todo,
        todosAfterUpdated,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Add todo failed", error });
  }
};

exports.deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await db.Todo.findOne({
      where: {
        id,
      },
    });

    if (deletedTodo) {
      await db.Todo.destroy({
        where: {
          id,
        },
      });

      const todosAfterUpdated = await db.Todo.findAll({
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json({
        status: "Success",
        message: `Delete todo by id: ${id} success`,
        data: {
          deletedTodo,
          todosAfterUpdated,
        },
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: `Delete todo by id: ${id} failed, because todo with that id doesn't exist`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Delete todo by id failed", error });
  }
};

exports.updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    // Mengecek apakah ada todo dengan id seperti yang dimasukan client
    const patchedTodo = await db.Todo.findOne({
      where: {
        id,
      },
    });

    // Jika ada
    if (patchedTodo) {
      // Mengupdate data
      await db.Todo.update(
        { title: req.body.title, status: req.body.status },
        {
          where: {
            id,
          },
        }
      );

      // Mengambil todo yang baru diupdate
      const todoAfterUpdated = await db.Todo.findOne({
        where: {
          id,
        },
      });

      // Mengambil semua data todo setelah dilakukan peng-update-an
      const todosAfterUpdated = await db.Todo.findAll({
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json({
        status: "Success",
        message: `Patched todo by id: ${id} success`,
        data: {
          todoBeforeUpdated: patchedTodo,
          todoAfterUpdated,
          todosAfterUpdated,
        },
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: `Patched todo by id: ${id} failed, because todo with that id doesn't exist`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Patched todo by id failed", error });
  }
};
