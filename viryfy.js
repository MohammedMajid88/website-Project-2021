function verifyToken(req,res,next){
const bearerHeader=req.headers['authorization'];

if(typeof bearerHeader!=undefined ){

    bearere=bearerHeader.splie(' ');
    bearereToken=bearer[1];
    req.token=bearereToken
next();
}else{


}


}

