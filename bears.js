let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

app.use('/api', bodyParser.json(), router);   
app.use('/api', bodyParser.urlencoded({ extended: false }), router);


let student = [{'id':'5935512010','name':'Pimwipa','surname':'Sakulkham','Major':'CoE','GPA':'5.00' }
];

router.route('/bears')
   
   .get( (req, res) =>  res.json(student) ) 

   
   .post( (req, res)=> {
       var students = {};
       students.id =  req.body.id
       students.name = req.body.name
       students.surname = req.body.surname
       students.Major = req.body.Major
       students.GPA = req.body.GPA
       student.push(students);
       res.json( {message: 'Student created!'} )
   })

   router.route('/bears/:id')
   .get ( (req,res) => res.json(student[req.params.id]))  

   .put ( (req,res) => {                   
       var id = req.params.id
       student[id].id = req.body.id;   
       student[id].name = req.body.name;   
       student[id].surname = req.body.surname;   
       student[id].Major = req.body.Major;   
       student[id].GPA = req.body.GPA;   
       res.json({ message: 'Student updated!' + req.params.id});
   })

   .delete ( (req,res) => {                  
       delete     student[req.params.id-1]
       res.json({ message: 'Student deleted: ' + req.params.id});
   })


router.route('/bears').get((req, res) =>  res.json(student) );

app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(80,  () => console.log("Server is running") );