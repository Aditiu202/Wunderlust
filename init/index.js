const MongooseURL = "mongodb://127.0.0.1:27017/wanderlust";
async function main(){
   await mongoose.connect(MongooseURL);
}

main().then(()=>{
    console.log("connected to db");
}) 
.catch((err)=>{
    console.log(err);
})

const initDB  = async()=>{
await Listing.deleteMany({});
await Listing.insertMany(initdata.data);
console.log("data was initalised");
}

initDB();
 
