// functionality for reading excel files and converting to JSON taken from
// https://code.ciphertrick.com/2016/06/05/read-excel-files-convert-json-node-js/
// almost all code in this class taken from there
var express = require('express'); 
var app = express(); 

var bodyParser = require('body-parser');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

var ObjectId = require('mongodb').ObjectID;
var mc = require('mongodb').MongoClient;
var db, logsCollection;

app.use(bodyParser.json());

var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage }).single('file');

/*var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});

var upload = multer({ //multer settings
              storage: storage,
              fileFilter : function(req, file, callback) { //file filter
                  if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                      return callback(new Error('Wrong extension type'));
                  }
                  callback(null, true);
              }
          }).single('file');
*/

// from comp 2406 carleton
var connectCallback = function(err, returnedDB) {
    if (err) {
        throw err;
    }

    db = returnedDB;
    
    logsCollection = db.collection('player');
    console.log("Database Connected");
}

mc.connect('mongodb://localhost/NhlStats', connectCallback);
// from comp 2406 carleton




/** API path that will upload the files */
app.post('/upload', function(req, res) {
  var exceltojson; //Initialization
  upload(req,res,function(err){
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
      /** Multer gives us file info in req.file object */
      if(!req.file){
          res.json({error_code:1,err_desc:"No file passed"});
          return;
      }
      //start convert process
      /** Check the extension of the incoming file and 
       *  use the appropriate module
       */
      if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
          exceltojson = xlsxtojson;
      } else {
          exceltojson = xlstojson;
      }


      // from comp 2406 carleton
      function returnResult(err, result) {
          console.log(result);     
      }
      // from comp 2406 carleton 


      try {
          exceltojson({
              input: req.file.path, //the same path where we uploaded our file
              output: null, //since we don't need output.json
              lowerCaseHeaders:true
          }, function(err,result){
              if(err) {
                  return res.json({error_code:1,err_desc:err, data: null});
              } 



              // from comp 2406 carleton
              logsCollection.insert(result, returnResult);
              // from comp 2406 carleton  



              res.json({error_code:0,err_desc:null, data: result});
          });
      } catch (e){
          res.json({error_code:1,err_desc:"Corupted excel file"});
      }
  });
});

app.get('/',function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.listen('3000', function(){
  console.log('running on 3000...');
});
