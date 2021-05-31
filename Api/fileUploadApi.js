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
  console.log(req.file.filename);
  const file = new fileSchema ({
    
    file : req.file.filename
})
file.save();
res.json({message:'file uploaded'})
})


router.post('/add/:filename' ,  (req, response , next)=>{

  // convert to json 
  var result = [];
  var arr=[]
  elements=[]
fs.createReadStream(path.resolve('./uploads', req.params.filename)).pipe(csv())
.on('headers', (headers) => {
  headers.forEach(async (element) => {
    
  translate(element, {to: 'en'}).then(res => {
    result.push(res.text)
    results = fuzz.extract(res.text,[
      "LastName",
      "FirsName",
      "Language",
      "PayId",
      "PayId2",
      "PayId3",
      "PayId4",
      "PayId5",
      "PayId6",
      "Mail",
      "ManagerMail",
      "ManagerPayId",
      "IsAdmin",
      "IsAccountant",
      "Tags",
      "LocalCountry",
      "LocalCurrency",
      "ReviewerMail",
      "ReviewerPayId",
      "DefaultProjectExternalId",
      "IsActive",
      "MailAlias",
      "MileageRate",
      "IKReference",
    ],{returnObjects: true});
     arr.push(results)
     elements.push(element)
    })
  })
  // console.log(element);
  
  setTimeout(() => {
    arr.push(elements)
  response.json(arr);
  
  }, 3000);
  
  })
  });
  




module.exports = router;