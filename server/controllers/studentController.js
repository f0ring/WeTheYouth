import Student from '../models/Student.js';

export const getStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const newStudnet = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};