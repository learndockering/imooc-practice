var http = require('http');
var querystring = require('querystring');
var postData = querystring.stringify({
	'content': '老师下次更新什么时候啊?',
	'cid': 348,
});

var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docoment',
	method: 'POST',
	headers: {
		//headers中的数据请从自己的浏览器中获取，
		//获取方法见视频http://www.imooc.com/video/8837
	}
};

var req = http.request(options, function(res) {
	console.log('Status: ' + res.statusCode);
	console.log('headers: ' + JSON.stringify(res.headers));
    //为data事件注册回调函数来接受数据
	res.on('data', function(chunk) {
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});
	//当数据接受完毕，网络连接关闭，触发end事件
	res.on('end', function() {
		console.log('评论完毕!');
	});
});

//当有错误发生时候
req.on('error', function(e) {
		console.log("error! " + e.message);
});
//把要提交的数据写入请求体
req.write(postData);
//完成请求
req.end();

