const express = require('express');
const token = require("../token");
const jwt = require("jsonwebtoken");


const router=express.Router();


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

router.get("/posts", (req, res) => {
    ////////console
    
        pool.query('SELECT * FROM Posts', (error, result) => {
          if (error) throw error;
    
          res.send(result);
    
        })
      })
    
    
    
    
      ////////post for admin text and img title
    
    
    
    
    
    
    
    //////////////////////////////////////add like for user //////////////////////////////////
    router.post('/like',verifyToken,(req,res)=>{
      jwt.verify(req.token, 'MarMohTah', (err, authData) => {
        if (err) {
    
          res.sendStatus(403);
        }
    
    const {postId}=req.body;
    // const id=req.query.id;
    pool.query(`SELECT Likes.like
    
    FROM Posts left JOIN Likes
    ON Posts.id = Likes.postId 
    where Posts.id="${postId}" and userId="${authData.id}";
    
    
    ;`, (error, res1) => {
      if (error) throw error;
    console.log(res1)
       if(res1.length==0){
    
        pool.query(`INSERT INTO  Likes (userId,postId) VALUES ('${authData.id}','${postId}')`, (error, result)=>{
    
            if (error) {
              res.status(500).send(error);
              return;
            }
            res.send(result);
    
          })
       }else{
        pool.query(`DELETE FROM Likes WHERE postId='${postId}' and userId='${authData.id}';
        `, (error, result)=>{
    
          if (error) {
            res.status(500).send(error);
            return;
          }
          res.send(result);
    
        })
    
       }
    
    })
    
      })
    });
    
    
    
    
    
    
    //////////////////////////////////////add like for user //////////////////////////////////
    
    
    
    
    
    
    //////////////////////comments //////////////////////////////////////////
    router.post('/comment',verifyToken,(req,res)=>{
      jwt.verify(req.token, 'MarMohTah', (err, authData) => {
        if (err) {
    
          res.sendStatus(403);
        }
    
     const {postId,comment}=req.body;
    
    
     pool.query(`Insert into Comments (comment,userId,postId) VALUES ('${comment}','${authData.id}','${postId}')`,(err,result)=>{
      if (err) {
        res.status(500).send(err);
        return;
      }
    
    pool.query(`select firstName from Users where id='${authData.id}'`,(err2,result2)=>{
      if (err2) {
        res.status(500).send(err);
        return;
      }
    
      res.send(result2);
    
    })
     })
    
     
    
    
    
    
    
      })
    });
    
    
    
    //////////////////////comments ///////////////////////////////
    
    
    //////////////////////get comment ////////////////////////
    
    
    router.get("/comments/:id", (req, res) => {
      ////////console
      let id=req.params.id;
          pool.query(`SELECT comment,postId,firstName,Comments.id
          FROM Comments 
          INNER JOIN Users 
          ON Comments.userId = Users.id
          where postId='${id}' 
          `, (error, result) => {
            if (error) throw error;
      
            res.send(result);
            console.log(result)
      
          })
        })
      
    //////////////////////get comment ////////////////////////
    
    
    
    
    
    
    //////////////////post for all likes in blog
    
    router.post('/likes', verifyToken,(req, res) => {
      jwt.verify(req.token, 'MarMohTah', (err, authData) => {
        if (err) {
    
          res.sendStatus(403);
        }
    console.log(authData)
      pool.query(`SELECT postId
      FROM Posts
      LEFT JOIN Likes
      ON Posts.id = Likes.postId
      where Likes.like='like' and  Likes.userId='${authData.id}'`, (error, result) => {
        if (error) throw error;
    
        res.send(result);
    
      })
    });
    });
    //////////////////post for all likes in blog
    
    
    

module.exports=router




