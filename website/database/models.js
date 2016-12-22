/**
 * Created by Frice on 2016/12/13.
 */
module.exports = {
    user:{
        uname:{
            type:String,required:true
        },
        password:{
            type:String,required:true
        },
        utype:{
            type:String,required:false
        }
    },
    product:{
        path: {
            type: String,
            required: true,
            trim: true
        },
        originalname: {
            type: String,
            required: true
        }
    }
};