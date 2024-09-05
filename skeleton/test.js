const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()
  
  mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
      const userSchema = new mongoose.Schema({
          _id : String,
          src: String
      });
  
      // User 모델 생성
      const musicData = mongoose.model('staticLink', userSchema,'staticLink');
  
      // 사용자 데이터 불러오기
      musicData.find({})
          .then(users => {
              console.log('모든 사용자 데이터:', users);
              return users
          })
          .catch(error => {
              console.error('데이터 조회 오류:', error);
          });
  })
  .catch((error) => {
      console.error('MongoDB 연결 오류:', error);
  });

