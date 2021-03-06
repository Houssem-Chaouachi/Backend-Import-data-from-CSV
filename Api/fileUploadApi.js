var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require ('fs')
const multer  = require('multer');
const translate = require('@vitalets/google-translate-api');
const fuzz = require('fuzzball');
const path = require('path');
const fileSchema = require ('../models/fileSchema')
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ path.extname( file.originalname)  )
  }
})
const upload = multer({ storage: storage })


    // upload file 

router.post('/upload' ,upload.single('file'),  (req, res , next)=>{
  // console.log(req.file.filename);
  const file = new fileSchema ({
    
    file : req.file.filename
})
file.save();
res.json({message:'file uploaded',filename:req.file.filename})
})





      // matching

router.get('/add/:filename' , async (req, response , next)=>{
  var result = [];
  var arr=[]
  elements=[]
fs.createReadStream(path.resolve('./uploads', req.params.filename)).pipe(csv())
.on('headers',async (headers) => {
 await Promise.all(headers.map(async (element) => {
  const res = await translate(element, {to: 'en'}) 
    result.push(res.text)
   results = fuzz.extract(res.text,[
      "LastName",
      "FirstName",
      "Language",
      "PayId",
      "Mail",
      "ManagerPayId",
      "IsAdmin",
      "IsAccountant",
      "Tags",
      "LocalCountry",
      "LocalCurrency",
    ],{sortBySimilarity: true});
    await arr.push(results)
   await  elements.push(element)
    //  console.log(arr);
    
  }))

  // console.log(element);
    arr.push(elements)
  response.json(arr); 
  })
  });
  




module.exports = router;