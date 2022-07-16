const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/DailyBlog");

const homeStartingContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus hendrerit tristique malesuada. Donec nec velit non lorem fringilla hendrerit quis ut risus. Nam eget quam nisl. Quisque euismod, justo eget facilisis molestie, metus ipsum luctus nunc, sit amet blandit libero sem vel justo. Nullam ultricies facilisis sem, in accumsan magna sodales vel. Donec faucibus accumsan neque at pellentesque. Aenean eu pulvinar nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed suscipit id diam vel condimentum. Mauris elit justo, eleifend quis dictum convallis, viverra sed sapien. Donec et molestie libero, tincidunt egestas purus. Aliquam interdum tortor dolor, sit amet ultrices nisi faucibus non. Duis consectetur dui ac ex blandit luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum dictum eget dui id tincidunt."
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const composeSchema={
  title:{
    type:String,
    required:true
  },
  post:{
    type:String,
    required:true
  }
};

const Compose=mongoose.model('Compose',composeSchema);

app.get('/',(req,res)=>{
  Compose.find({},(err,data)=>{
    if(!err){
      if(data.length===0){
        res.render("home",{homeparadata:homeStartingContent,items:[]});
      }
      else{
        res.render("home",{homeparadata:homeStartingContent,items:data});
      }
    }
  })
  
})

app.get('/about',(req,res)=>{
  res.render("about",{aboutparadata:aboutContent})
})
app.get('/contact',(req,res)=>{
  res.render("contact",{contactparadata:contactContent});
}
)
app.get('/compose',(req,res)=>{
  res.render("compose");
}
)
app.post('/compose',(req,res)=>{
  const titles=req.body.title;
  const itttem=req.body.post;
  const item=new Compose({
    title:titles,
    post:itttem
  });
  console.log(itttem);
  item.save();
  Compose.insertMany([item]);
  res.redirect('/');
})


app.get('/posts/:id',(req,res)=>{
  var requested_id=req.params.id;
  Compose.findOne({_id:requested_id},(err,data)=>{
    res.render("post",{Blogtitle:data.title,blogpost:data.post})
  });
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
