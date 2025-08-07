const Module = require("../../models/moduleModel");
const Quiz = require("../../models/Quiz");

exports.getModuleQuizzes = async (req, res) => {
  const moduleId = req.params.id;

  try {
    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const quizzes = await Quiz.find({ _id: { $in: module.quizzes } });

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};
