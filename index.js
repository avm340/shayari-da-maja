import express from "express";
import bodyparser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended: true}));

const shayaris =[];

app.get("/" , (req,res) => {
   res.render("index",{ title: "Home", wallah: "Arham" });
});

app.get("/about",(req,res)=>{
   res.render("about",{title: "about us"});
});

app.get("/form",(req,res)=>{
   res.render("form",{title: "form"});
});

app.get("/shayaris",(req,res)=>{
   res.render("shayaris",{title: "all shayaris", shayaris: shayaris});
});


app.post("/shayaris",(req,res)=>{
   const name = req.body.author;
   const text = req.body.content;

   shayaris.push({
      name : name,
      text : text,
   });

   res.redirect("/shayaris");
});


app.post("/shayaris/:id/delete",(req,res) => {
   const id = Number(req.params.id);

   if (!isNaN(id)&& id >= 0 && id < shayaris.length){
   shayaris.splice(id,1);
   }
   res.redirect("/shayaris");
})


app.get("/shayaris/:id/edit" , (req,res) =>{
   const id = Number(req.params.id);

   if (isNaN(id) || id < 0 || id >= shayaris.length){
   return res.redirect("/shayaris");
   }

   const shayari = shayaris[id];

   res.render("edit",{title:"edit",shayari ,index :id });
});


app.post("/shayaris/:id/edit",(req,res) => {
   const id = Number(req.params.id);

   if (isNaN(id) || id < 0 || id >= shayaris.length){
      return res.redirect("/shayaris");
  }

  const name = req.body.author;
  const text = req.body.content;

  shayaris[id] = {
   name : name ,
   text : text ,
  };
  res.redirect("/shayaris");
});

app.listen(port ,()=>{
 console.log(`port is running on ${port}`);
});