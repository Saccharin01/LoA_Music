const mongoose  = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const schema = new mongoose.Schema({
  _id : String,
  src : String,
})

const mongooseData = async ()=>{

  const dataModel = mongoose.model("MusicData", schema, "MusicData")
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    const result = await dataModel.find({})
    console.log(`result Data`,result)
    return result
  } catch (error) {

    console.log(`error occur`,error)
  } finally{
    await mongoose.disconnect()
  }
}

export default mongooseData