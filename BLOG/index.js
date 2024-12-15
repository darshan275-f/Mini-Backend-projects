const express=require("express");
const app=express();
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
const path=require("path");
app.use(methodOverride('_method'));
var figlet = require("figlet");


const port=3000;
app.use(express.static("public")); // Serving static files
app.set("view engine", "ejs"); // Setting up view engine
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));



let blogs=[
    {
        id:uuidv4(),
        user:"darshan",
        content :"i am writing java woking sjfkj kjbnjfsdjf",
    },
    {
        id:uuidv4(),
        user:"raju",
        content :"i am writing java woking sjfkj kjbnflsfk;sfksdfknsf.nsdfnsdnfksddnfnkldsnfkldsfksfkldsfkldsndjfsdjf",

    }
]

app.listen(port,()=>{
    console.log("App is Listing");
    figlet("kyu nahi hora comeback?", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
      });
})
app.get("/blog",(req,res)=>{
    res.render("index.ejs",{blogs});
})
app.get("/blog/new",(req,res)=>{
    res.render("create.ejs");
})
app.post("/blog",(req,res)=>{
    let {user,content}=req.body;
    console.log(user);
    let id =uuidv4();
    blogs.push({id,user,content});
    res.redirect("/blog");
})
app.get("/blog/:id/edit",(req,res)=>{
    let {id}=req.params;
    let blog=blogs.find((p) =>{
        return p.id===id;
    })
   
    res.render("edit.ejs",{blog});
})
app.patch("/blog/:id",(req,res)=>{
    let {id}=req.params;
    let blog=blogs.find((p) =>{
        return p.id===id;
    })
    blog.content=req.body.content;
    res.redirect("/blog");
})
app.delete("/blog/:id",(req,res)=>{
    let {id}=req.params;
    blogs=blogs.filter((p) =>{
        return p.id!=id;
    })
    res.redirect("/blog");
})