const joi=require("joi");
// const listings= require("./models/listing");
module.exports = joi.object({
    listing: joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.string().allow("",null),
    }).required()
});

module.exports=joi.object({
    
})