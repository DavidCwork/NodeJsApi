const mongoose = require('mongoose');
require('dotenv').config();

const uri =  `mongodb+srv://${process.env.USERBD}:${process.env.PASSWORDBD}@adso2669736.5x7gsx9.mongodb.net/${process.env.BD}`
mongoose.connect(uri);

module.exports = mongoose;