var mongoose=require('mongoose');

var productSchema=mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String},
    price: {type: String, require: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "PostData", require: true}
})

module.exports=mongoose.model("Product",productSchema)