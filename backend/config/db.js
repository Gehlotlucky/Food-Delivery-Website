import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://luckygehlot:lucky2002K@cluster0.8pq9kfe.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}