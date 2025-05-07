const mongoose = require('mongoose');
const Quiz = require('../../models/Quiz');
const ObjectId = mongoose.Types.ObjectId;

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id;
    if (!ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );
    if (!quiz) return res.status(404).json({ error: "Not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};