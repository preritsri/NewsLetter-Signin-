const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");  //const for https module

const app=express();

app.use(express.static("public"))  //for server to setup and serve static files/local files
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
     const firstname=req.body.fname;
     const lastname=req.body.lname;
     const email=req.body.email;
     
     var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

     
    const url='https://us21.api.mailchimp.com/3.0/lists/1613dcd50f'
    const options = {
        method: "POST",
        auth: 'prerit:271864659290a073bb3e2f1fd9ac2383-us21'
    }

     
     const request= https.request(url,options,function(response){
        if(response.statusCode==200) {
                    res.sendFile(__dirname+"/success.html");
                }
                else{
                    res.sendFile(__dirname+"/failure.html");
                }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
     })
     request.write(jsonData);
     request.end();
});              

   


app.post("/failure",function(){
    res.redirect("/")
})    

app.listen(3000,function(){
    console.log("Server is running at port 3000.");
});

//APIKey: 271864659290a073bb3e2f1fd9ac2383-us21
//list id: 1613dcd50f
////harsh gupta//