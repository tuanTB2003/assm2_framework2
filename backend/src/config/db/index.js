import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connect = async function(){
    try {
        await mongoose.connect(process.env.URI_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('successfully');
    } catch (error) {
        console.log('Error');
    }
}

export default connect