const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const https=require('https')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})


app.post("/",(req,res)=>{
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;

  
   var data={
       members:[
           {
               email_address:email,
               status:"subscribed",
               merge_fields:{
                  FNAME:firstName,
                  LNAME:lastName 
               }
           }
       ]
   }
 const jsonData=JSON.stringify(data);
 const url="https://us20.api.mailchimp.com/3.0/lists/38cd758841"

 const options={
     method:"POST",
     auth:"xyz:dc8ac7d4e8882538538bdb74cf4112d5-us20"
 }
 const request=https.request(url,options,(response)=>{
   
    if(response.statusCode==200)
    {
        res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failure.html")
    }
    
    response.on("data",(data)=>{
        console.log(JSON.parse(data))
    })
 })

 request.write(jsonData);
 request.end();
   
})


app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log("Server started on http://localhost:3000")
})


// 38cd758841 audience id
// dc8ac7d4e8882538538bdb74cf4112d5-us20 api key