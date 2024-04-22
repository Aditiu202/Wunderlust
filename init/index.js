const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");


const dbURL = "mongodb+srv://aditiu202:ygig7kIQWgIrz5UD@cluster0.8il75zh.mongodb.net/?retryWrites=true&w=majority";
async function main(){
   await mongoose.connect(dbURL);
}

main().then(()=>{
    console.log("connected to db");
}) 
.catch((err)=>{
    console.log(err);
})

const initDB  = async()=>{
await Listing.deleteMany({});
initdata.data = initdata.data.map((obj)=>({...obj, owner:"65c840f2abfd8b0f30c1fbc7"}));

await Listing.insertMany(initdata.data);
console.log("data was initalised");
}

initDB();
 