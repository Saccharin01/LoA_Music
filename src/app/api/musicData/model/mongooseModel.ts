import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  _id: String,
  src: String,
});

const MusicData = mongoose.models.MusicData || mongoose.model('MusicData', schema, 'MusicData');

export default MusicData;
