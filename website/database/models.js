/**
 * Created by Frice on 2016/12/13.
 */
module.exports = {
    user:{
        _id: {
            type: Object,
            required: false
        },
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
        _id: {
            type: Object,
            required: false
        },
        path: {
            type: String,
            required: true,
            trim: true
        },
        originalname: {
            type: String,
            required: true
        },
        ptype:{
            type:String,
            required:true
        },
        pname:{
            type:String,
            required:true
        },
        initprice:{
            type:Number,
            required:true
        },
        currentprice:{
            type:Number,
            required:true
        },
        pid:{
            type:String,
            require:true
        }
    }
};