import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/GraphVisualizer')
        .then(()=>{
            console.log("Database connected !!!");
        })
        .catch((err)=>{
            console.log(err.message);
        })

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export  const usermodel=mongoose.model('user',userSchema);