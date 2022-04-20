// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { Student, Course } = require("../models");

// Aggregate function to get the number of users overall
const headCount = async () =>
  Student.aggregate()
    // Your code here
    .count("studentCount")
    .then((numberOfStudents) => numberOfStudents);

// Execute the aggregate method on the User model and calculate the overall grade by using the $avg operator
const grade = async (studentId) =>
  Student.aggregate([
    // Include only the user who can match the given ObjectId using the $match operator
    {
      $match: { _id: ObjectId(studentId) },
    },
    {
      $unwind: "$assignments",
    },
    // TODO: Group information for the user with the given ObjectId alongside an overall grade calculated using the $avg operator
    {
      $group: {
        _id: ObjectId(studentId),
        overallGrade: { $avg: "$assignments.score" },
      },
    },
  ]);

module.exports = {
  // Get all users
  getStudents(req, res) {
    Student.find()
      .then(async (students) => {
        const studentObj = {
          students,
          headCount: await headCount(),
        };
        return res.json(studentObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleStudent(req, res) {
    Student.findOne({ _id: req.params.studentId })
      .select("-__v")
      .lean()
      .then(async (student) =>
        !student
          ? res.status(404).json({ message: "No student with that ID" })
          : res.json({
              student,
              grade: await grade(req.params.studentId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createStudent(req, res) {
    Student.create(req.body)
      .then((student) => res.json(student))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteStudent(req, res) {
    Student.findOneAndRemove({ _id: req.params.studentId })
      .then((student) =>
        !student
          ? res.status(404).json({ message: "No such student exists" })
          : Course.findOneAndUpdate(
              { students: req.params.studentId },
              { $pull: { students: req.params.studentId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: "Student deleted, but no courses found",
            })
          : res.json({ message: "Student successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add friend to a user
  addAssignment(req, res) {
    console.log("You are adding an assignment");
    console.log(req.body);
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from a user
  removeAssignment(req, res) {
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
};
