//使用express构建web服务器
const fs=require("fs");
const express = require('express');
const multer=require("multer");
//创建mysql连接池
const mysql = require('mysql');
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'wxjnr',
  connectionLimit: 10
});
var server = express();
server.listen(3000);
//托管静态资源到public目录下
server.use(express.static('public'));

//创建upload对象
var upload=multer({dest:"upload/"});

//1.添加图片接收客户端post请求
server.post("/uploadFile",upload.single("mypic"),(req,res)=>{
  //获取原文件名
  var size=req.file.size/1000/1000;
  //判断文件大小不能超过2MB
  if(size>2){
    res.send({code:-1,msg:"上传文件过大,请重新选择"});
    return;
  }
  //判断文件必须是图片
  var type=req.file.mimetype;
  var idx=type.indexOf("image");
  if(idx==1){
    res.send({code:1,msg:"上传文件类型不正确"});
    return;
  }
  var src=req.file.originalname;
  //获取原文件
  //var des=时间戳+随机数+.jpg
  var ft=new Date().getTime();
  var tn=Math.floor(Math.random()*9999);
  var i3=src.lastIndexOf(".");
  var suff=src.substring(i3);
  var des=__dirname+"/upload/"+ft+tn+suff;
  //将临时文件移动到upload目录下
  fs.renameSync(req.file.path,des);
  res.send({code:1,msg:"上传成功"});
})
//2.查询内容日期表
server.get("/getList",(req,res)=>{
  var sql="SELECT id,div_1,div_2 FROM jnr_nr"
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})
//3.查询内容详情
server.get("/getDetail",(req,res)=>{
  var pid=req.query.pid;
  var sql="SELECT * FROM jnr_nr WHERE id=?";
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
//4.更新内容
server.get("/update",(req,res)=>{
  var val=req.query.value;
  var rq=req.query.rq;
  var pid=req.query.pid;
  var sql="UPDATE jnr_nr SET div_1=?,div_2=? WHERE id=?"
  pool.query(sql,[val,rq,pid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,data:result});
    }else{
      res.send({code:-1,msg:"更改失败"});
    }
  })
})
//5.删除内容
server.get("/delete",(req,res)=>{
  var pid=req.query.pid;
  var sql="DELETE FROM jnr_nr WHERE id=?"
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,msg:"删除成功"});
  })
})
//6.保存内容
server.get("/add",(req,res)=>{
  var val=req.query.val;
  var rq=req.query.rq;
  var sql=`INSERT INTO jnr_nr VALUES(NULL,"${val}","${rq}")`
  pool.query(sql,[val,rq],(err,result)=>{
    if(err) throw err;
    if(result.length>1){
      res.send({code:1,msg:"添加成功"});
    }else{
      res.send({code:-1,msg:"添加失败"});
    }
  })
})