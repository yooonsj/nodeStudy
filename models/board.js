var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var Board = mongoose.Schema({
  title: {type:String, required:true}, //글제목
  body: {type:String, required:true},  //글 내용
  author: {type: String, ref:'User', required:true}, // 글 작성자
  views: {type:Number, default: 0}, // 조회수
  numId: {type:Number, required:true}, // 글 번호
  comments: [{
    body: {type:String, required:true}, // 댓글 내용
    author: {type: String, ref:'User', required:true}, // 댓글 작성자
    createdAt: {type:Date, default:Date.now} // 작성일
  }],
  createdAt: {type:Date, default:Date.now}, // 작성일
  updatedAt: Date // 수정일
});

Board.plugin(autoIncrement.plugin, {
    model: 'Board',
    field: 'numId',
    startAt: 0,
    incrementBy: 1
});

module.exports = mongoose.model('Board', Board, 'board');
