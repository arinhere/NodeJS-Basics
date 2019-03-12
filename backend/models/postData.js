var mongoogse=require('mongoose');

var postSchema=mongoogse.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
})

module.exports=mongoogse.model('PostData',postSchema);