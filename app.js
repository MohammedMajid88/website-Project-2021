const express = require('express');
const app = express();
const token = require("./token");
// import EditorJS from '@editorjs/editorjs';
// import EditorJS from '';
// import EditorJs from '@editorjs/editorjs';
const multer = require('multer');
// const upload = require('./upload');
const router = express.Router();
const path = require('path');
app.set("view engine", "ejs");


//  const Render=require('./Final-project/admin/update');
const port = 3000;



///token
const jwt = require("jsonwebtoken");

const creatToken = (id, email) => {
  return jwt.sign(
    { id: id, email: email },
    "MarMohTah"
  )

}


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,"auth");
//   next();
// });
var cors = require('cors')
app.use(cors());

const mysql = require('mysql');
const { query } = require('express');
const { get } = require('http');

const config = {
  host: 'localhost',
  user: 'marwan2',
  password: '*Sql3141*',
  database: 'teamSite'
};


const pool = mysql.createPool(config);




app.post('/register', (request, response) => {
  let firstName = request.body.firstName;
  let lastName = request.body.lastName;
  let email = request.body.email;
  let password = request.body.password;

  // if (!firstName || !lastName || !email || !password) {
  //     response.status(400).send("fill your information");
  //     return;
  // }

  // if (!emailValidate.validate(email)) {
  //     response.status(400).send(emailValidate.validate(password, { list: ture }))
  // }

  let query = 'SELECT email FROM  `Users` WHERE email=?';

  pool.query(query, [email], (err, array) => {
    if (err) {
      response.status(500).send(err);
    }
    if (array.length > 0) {
      response.status(402).send("Email is already in use");
      return;
    }

    // if (!passValidate.validate(password)) {
    //     response.status(400).send(passValidate.validate(password, { list: true }));
    //     return;
    // }
    // bcrypt.hash(password, 10, (err, hash) => {
    //     if (err) {
    //         response.status(500).send(err);
    //         return;
    //     }



    //   pool.query('SELECT * FROM About', (error, result) => {
    //     if (error) throw error;

    //     res.send(result);

    // })


    pool.query('INSERT INTO Users (firstName,lastName,email,password) VALUES(?,?,?,?)', [firstName, lastName, email, password],
      (err, result) => {
        if (err) {
          response.status(500).send(err);
          return;
        }
        const token = creatToken(result.insertId, email);

        // localStorage.token = token;
        response.status(201).send({ token, email, firstName, lastName });
      });
  });
});
// });





// token = localStorage.getItem("token")
// post Option
// headers : "aut", "barier ${token}"


function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader != undefined) {

    bearer = bearerHeader.split(' ');
    bearereToken = bearer[1];
    req.token = bearereToken
    next();
  } else {


  }
}


app.post('/user', verifyToken, (req, res) => {
  jwt.verify(req.token, 'MarMohTah', (err, authData) => {

    if (err) {

      res.sendStatus(403);
    }
  //  else{res.send(authData)}

    pool.query(`SELECT firstName FROM Users where id="${authData.id}"`, (error, result) => {
      if (error) throw error;

      res.send(result);

    })
  })

})




  // app.get('/me', function (req, res) {
  //   var token = req.headers.authorization;
  //   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  //   token = token.split(" ")[1]
  //   console.log('token ', token)
  //   jwt.verify(token, "MarMohTah", function (err, decoded) {
  //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

  //     res.status(200).send(decoded);
  //   });
  // });








/////log in


app.post('/login',(req,res)=>{

  const {firstName,password}=req.body;
     
  pool.query(`SELECT id, firstName ,email FROM Users where firstName="${firstName}" and password="${password}"`, (error, result) => {
    if (error) throw error;


    if(result.length>0){
    const token = creatToken(result[0].id, result[0].email);

        // localStorage.token = token;
        res.status(201).send({ token, firstName:result[0].firstName, password:result[0].password});
    }

    if(result.length==0){res.status(201).send("wrong password or user name try agin");}
  })




})




/////log in








  app.get('/About', (req, res) => {

    pool.query('SELECT * FROM About', (error, result) => {
      if (error) throw error;

      res.send(result);

    })
  });












  app.get('/post', (req, res) => {

    pool.query('SELECT * FROM Posts', (error, result) => {
      if (error) throw error;

      res.send(result);

    })
  });




  app.get('/OurWork', (req, res) => {

    pool.query('SELECT * FROM OurWork', (error, result) => {
      if (error) throw error;

      res.send(result);

    })
  });







  //////////editoe
  // var EditorJS = require('@editorjs/editorjs');


  // const editor = new EditorJS({



  // });







  ////////post for admin text and img title
  app.post("/posts", (req, res) => {
    let title = req.body.title;
    let img = req.body.img;
    let text = req.body.text;
    pool.query(`INSERT INTO  Posts (postTitle,postText,postImage) VALUES ("${title}","${text}","${img}")`, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.status(201).send(result);
    });

  })











//////////////////////////////////////////////////upload //////////////////////////////////////

//endf of mysql stuff
// const PORT = process.env.PORT || 3001;
// app.use(express.static(path.join(__dirname, "public")));////my comment

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },  
});

const limits = {
    fileSize : 4000000
}

//fileFilter function controls which files should be uploaded. req = request being made. file = contains file info. cb = callback function to tell multer when we are done filtering the file. send back an error message to the client with cb.
const fileFilter =(req, file, cb) => {
  //if the file is not a jpg, jpeg, or png file, do not upload it multer; reject it.
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File must be of type JPG, JPEG, or PNG and nore more than 2MB in size'))
  }
  //undefined = nothing went wrong; true = that is true, nothing went wrong, accept the upload.
  cb(undefined, true)
}

//set up the multer middleware
const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
    // filename: filename
  })

// ROUTES
app.get('/up',function(req,res){
     res.send(__dirname);
  });

  //app.use('/image', express.static('./upload')); // shared uploaded folder with users so users can access the profile images though image folder path


//upload image post route: localhost:port/upload
  app.post("/upload",upload.single('upload'), (req, res) => {
 

    // res.send();
    //mysql stuff
    // var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";
    let sql = "INSERT INTO  Posts (PostImage,PostText,postTitle) VALUES (?,?,?)";

    // pool.query(sql, ["./images"+req.file.filename,"req.body.PostText","req.body.postTitle"], function(err, result) {
    //   if (err) throw err;

    //     console.log(result);
    //    //  console.log("query ", sql2);
    // res.send('./yes');

    //  });
    message = "Successfully! uploaded";
    //res.render('index',{message: message, status:'success'});
    //end of mysql stuff
     
   
}), (error, req, res, next) => {
    res.status(400).res.send("You have successfully uploaded the file!");
    // res.redirect('/');
}



/////////////////////////////////////////////////////upload///////////////////////////////////









//////////////////////get list of users



app.get('/allUsers',(req,res)=>{

pool.query('Select firstName,lastName,email from Users ',(err,result)=>{
  if (err) throw err;

  res.send(result)


})

})

//////////////////////get list of users 




////////////////delet post by admin

app.delete('/delet/:id',(req,res)=>{
let id=+req.params.id;
console.log("id")

pool.query(`DELETE FROM Posts WHERE id="${id}"`, (error, result) => {
  if (error) throw error;

  res.status(201).send(result);
});
})

////////////////delet post by admin




// console.log(app.use(express.static(path.join(__dirname, "public"))));




////////////////////////// edit post admin ///////////////////////////////////////

app.put('/editPost/:id',(req,res)=>{
  let id=req.params.id
const {PostText,PostImage,postTitle}=req.body;
pool.query(`UPDATE Posts SET PostText = '${PostText}', PostImage = '${PostImage}',postTitle='${postTitle}' where id='${id}'`,(err,result)=>{
  if (err) throw err;


})


})

/////////////////////////////////// edit post admin /////////////////////////////////
 app.engine('html', require('ejs').renderFile);

 app.use(express.static(path.join(__dirname, "/public")));

app.get('/editPost/post/:id',(req,res)=>{
  let id=req.params.id;
  res.render('updatePost');
})

app.use('/', router);

//////////////////////////edit post pages///////////////////////////////



//////////////////////////edit post pages///////////////////////////////








/////////////// just test 
app.get('/test/:id',(req,res)=>{
  let id=req.params.id;
  res.sendFile(__dirname + '/Final-project/index.html');
})







///////////////test module router
// import {router} from './routres/test.js'
const routerBlog=require('./routres/routBlog');
app.use('/',routerBlog);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(__filename)
  })






