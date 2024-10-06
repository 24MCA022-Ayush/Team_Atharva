const mongoose= require("mongoose");

const URI="mongodb://localhost:27017/Nasa";



const connect = async () => {
    try {
       await mongoose.connect(URI);
       console.log("Database Connection is Successful..."); 
    } catch (error) {
        console.error("database connection is failed "+error);
        process.exit(0);
    }
}

module.exports = connect;