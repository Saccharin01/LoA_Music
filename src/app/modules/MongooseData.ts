import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const schema = new mongoose.Schema({
  _id : String,
  src : String,
})

const mongooseData = async ()=>{

  const dataModel = mongoose.model("MusicData", schema, "MusicData")
  try {
    await mongoose.connect(process.env.DATABASE_URL as string)
    const result = await dataModel.find({})
    console.log(`result Data : ${result}`)
    return result
  } catch (error) {

    console.log(`error occur : ${error}`)
  } 
}

export default mongooseData