var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash");

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

var oppSchema = new mongoose.Schema({
  title: String, 
  description: String,
  requirements: [String],
  details: String
});

var Opportunity = mongoose.model("Opportunity", oppSchema);

var resourceSchema = new mongoose.Schema({
  title: String,
  link: String
});

var Resource = mongoose.model("Resource", resourceSchema);

// Resource.create({
//   title: "Spring 2020 CS Research Fair Projects",
//   link: "https://docs.google.com/spreadsheets/d/15TzPxMVDG45OIjRI6AmtawLhqbTtRWzEfSeFgYS5E34/edit?usp=sharing"
// });

// Resource.create({
//   title: "Fall 2019 WiCS Research Panel FAQ",
//   link: "https://docs.google.com/document/d/171RJW_rZxroFs8QeZ22ltlS3CSzDECJXc7Be7rg6clM/edit"
// });

// Opportunity.create({
//   title: "FlyBrainLab Research Project [Spring 2020]",
//   description: "You will be working on FlyBrainLab, a one-stop interactive computing platform for studying the function of executable circuits constructed from fly brain data of the Fruit Fly Brain Observatory FFBO. Recently, large amounts of fruit fly brain data have become available, (i) the connectivity of its neurons, (ii) genetic tools for targeting a wide range of individual cells, and electrophysiology data. To accelerate the functional understanding of the logic of fruit fly brain circuits, the Bionet group is actively developing an interactive computing platform called FlyBrainLab. You will be contributing to the design and development of NeuroMynerva, a brand new front-end based on JupyterLab. You will be responsible for creating a range of widgets/extensions and helping the development of APIs for communicating data and commands between the widgets and the backend. You will also have the option to work on the FFBO backend including an integrated database for the fruit fly and a GPU-based emulation engine for circuit execution. You will work closely with members of the Bionet group to develop effective demos and to ensure a positive outcome of your project. All projects are offered as a course of 3.0+ credits (such as E6001 - Advanced Projects, or E4998 - Intermediate Projects). For further details, see here.",
//   requirements: ["Qualified student must be well versed in Python and JavaScript.","Knowledge of TypeScript is a plus. Full-stack development experience is a big plus.", "Exposure to neuroscience/biology not required but is a plus." ],
//   details: "Please send your CV/Resume to bionet.columbia@gmail.com. Please also include any code samples, Github repositories of related previous work if possible. If you have any questions, please send inquiries to the same email address."
// });

// Opportunity.create({
//   title: "Waymo & Lyft Driverless Car Data Analysis and Driving Modeling [Spring 2020]",
//   description: "Autonomous driving is developing rapidly. A lot of breakthroughs of autonomous driving have emerged in both academy and industry. However, many traffic accidents related to autonomous driving also occur and cause people’s concern on the safety issue of AV. To ensure safety and reliability, rigorous test and simulation is required before AV can really drive on road. For AV test and simulation, realistic data is an essential component. Comprehensive, multi-regime and sufficient self-driving data would definitely help the AV development. This project is to analyze Waymo and Lyft data, two newly opened datasets comprising of Level-5 self-driving cars. Diverse sources of data are covered, including camera, lidar and radar. Our task is to learn the vehicle driving policy from such multi-modal data, that interacts with surroundings cars and environments. The first step is to explore the existing label in the dataset, which would already provide enough information for our traffic research. The second step is to apply the state-of-art machine learning algorithm to learn car driving models. In the second step, computer vision techniques, deep learning, reinforcement learning and statistics inference would be used. The goal is to predict an AV’s whole behavioral trajectory from limited observations of initial part of the trajectory. Both undergraduate students and M.S. are welcome to register my research credits during the semester and summer. The student involved in this project will develop codes and algorithms for data analysis and modeling. Students with good computer and coding skills are preferred. Anticipated workload and duration of this project: ~20 hr/week. Desired outcome: codes and algorithms for data analysis",
//   requirements: ["Familiar with linux operating system; Reading and writing data.","Mastering Python programing is required.","Using Python to process and transform image and Lidar data, and generate figures, graphs, tables, or statistical models.", "Experience in processing image and Lidar data is preferred."],
//   details: "Interested students please send the following information to Rongye Shi(rs4062@columbia.edu): CV, Your potential working hours for this research course, Your graduation year/month",
// });

//Root Route
app.get("/", function(req, res){
  res.redirect("/opportunities");
});

//Index
app.get("/opportunities", function(req, res) {
  Opportunity.find({}, function(err, opportunities){
    if(err) {
      console.log(err);
    }

    else {
      
      Resource.find({}, function(err, resources){
        if (err) {
          console.log(err);
        }

        else {
          res.render("index", {opportunities, resources});
        }
      });

    }
  });
});

//Show 

app.get("/opportunities/:id", function(req, res){
  Opportunity.findById(req.params.id, function(err,foundOpp){
    if(err){
      res.redirect("/");
    }

    else{
      res.render("show", {opportunity: foundOpp});
    }
  });
});

app.listen((process.env.PORT || 3000), function(req,res){
  console.log("Wics Site has started");
});



   