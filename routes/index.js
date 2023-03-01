var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

// Connecting DB
mongoose.connect('mongodb://localhost:27017/StudentList', {
  useNewUrlParser: true, 
  useCreateIndex: true,
  useFindAndModify: false
})

const studentSchema = mongoose.Schema({
  studentCode: {
    type: String,
  },
  date: {
    type: String,
  },
  sex: {
    type: String,
  },
  address: {
    type: String,
  },
})

const Student = mongoose.model('Student', studentSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  Student.find({}, function (error, data) {
    console.log('Danh sach sinh vien', data)
    res.render('index', {students: data})
  })
});

// form-add
router.get('/form-add', function(req, res, next){
  res.render('form-add',{});
})

router.post('/add', function(req, res, next){
  Student.create(req.body);
  res.redirect('/');
})

router.get('/form-update/:id', function(req, res, next){
  Student.findById(req.params.id, (err, data) => {
    res.render('form-update', {student: data});
  })
})

router.post('/update', function(req, res, next){
  Student.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
    res.redirect('/');
  })
})

router.get('/form-delete/:id', function(req, res, next){
  Student.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect('/')
  })
})

module.exports = router;
