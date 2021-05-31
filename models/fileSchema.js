var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var fileSchema = new Schema({
 file: {type :String},

  
});

module.exports=mongoose.model("file",fileSchema)