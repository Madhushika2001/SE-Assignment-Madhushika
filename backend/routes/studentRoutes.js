const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');

router.post('/', auth, studentController.upload.single('image'), studentController.createStudent);
router.get('/', auth, studentController.getAllStudents);
router.put('/:id', auth, studentController.updateStudent);
router.delete('/:id', auth, studentController.deleteStudent);
router.patch('/:id/status', auth, studentController.updateStatus);
router.get('/:id', auth, studentController.getStudentById);

module.exports = router;