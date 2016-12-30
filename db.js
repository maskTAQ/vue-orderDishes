var express = require('express');
var app = express();

var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded


var orderDishInfo, userInfo, dishInfo;

function getData() {
	orderDishInfo = JSON.parse(fs.readFileSync('data.json'));
	userInfo = orderDishInfo.userInfo;
	dishInfo = orderDishInfo.dishInfo;
	//console.log(orderDishInfo.userInfo)
} //每次接受请求都查询读取数据 

var dishRoutes = express.Router();
app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}); //允许接受跨域请求
dishRoutes.get('/userinfo', function(req, res) {
	getData();
	res.json({
		data: userInfo
	})
}); //请求用户信息
dishRoutes.get('/dishinfo', function(req, res) {
	getData()
	res.json({
		data: dishInfo
	})
}); //请求菜单信息
dishRoutes.post('/choosedishinfo', function(req, res) {
	var data = fs.readFileSync('data.json');
	data = JSON.parse(data.toString());
	data.userInfo.forEach(function(item, i) {
		if (item.username === req.body.username) {
			item.isChoose = true; //修改用户选择菜肴的状态
			item.chooseDishInfo = req.body.data //保存用户选择的菜单信息
		}
	})
	fs.writeFile('data.json', JSON.stringify(data), function(err) { //写入文件
		if (err) {
			return console.error(err);
		}
		res.json({
			status: 0 //success
		});
	});
}); //提交选中的菜单信息
dishRoutes.get('/isallchoosedish', function(req, res) {
	var data = fs.readFileSync('data.json');
	data = JSON.parse(data.toString());
	var isAllChoose = true; //初始化是否所有用户都选择了菜单

	data.userInfo.forEach(function(item) { //判断是否所有用户都选择了菜单
		if (!item.isChoose) {
			isAllChoose = false; //还有用户没有选择菜肴
		}
	});
	if (isAllChoose) {
		res.json({
			status: 0 //success
		});
	} else {
		res.json({
			status: 1, //success
			message: '请等待其他用户选择菜肴哦！稍后过来查看吧'
		});
	}

}); //判断是否所有用户都选择了菜肴

dishRoutes.get('/votedish', function(req, res) {
	var data = fs.readFileSync('data.json');
	data = JSON.parse(data.toString());
	data.voteDishInfo = [];
	data.userInfo.forEach(function(item) { //遍历不同的用户
		item.chooseDishInfo.forEach(function(list) { //遍历选择的菜肴
			if (data.voteDishInfo.length !== 0) {
				var isHaveToVote = true;
				data.voteDishInfo.forEach(function(l) {
					if (l.name === list.name) {
						isHaveToVote = false;

					}
				});
				if (isHaveToVote) {
					data.voteDishInfo.push(list);
				}
			} else {
				data.voteDishInfo.push(list);
			}

		})
	});
	fs.writeFile('data.json', JSON.stringify(data), function(err) { //写入文件
		if (err) {
			return console.error(err);
		}
		console.log(data.voteDishInfo)
		res.json({
			status: 0, //success
			data: data.voteDishInfo
		});
	});

}); //待投票的菜单

dishRoutes.post('/votodishinfo', function(req, res) {
	var data = fs.readFileSync('data.json');
	data = JSON.parse(data.toString());
	data.userInfo.forEach(function(item, i) {
		if (item.username === req.body.username) {
			item.isVote = true; //修改用户选择菜肴的状态
			item.voteDishInfo = req.body.data //保存用户选择的菜单信息
		}
	})
	fs.writeFile('data.json', JSON.stringify(data), function(err) { //写入文件
		if (err) {
			return console.error(err);
		}
		res.json({
			status: 0 //success
		});
	});
}); //提交投票的菜单信息


dishRoutes.get('/isallvotedish', function(req, res) {
	var data = fs.readFileSync('data.json');
	data = JSON.parse(data.toString());
	var isAllVote = true; //初始化是否所有用户都投票了

	data.userInfo.forEach(function(item) { //判断是否所有用户都投票了
		if (!item.isVote) {
			isAllVote = false; //还有用户没有投票
		}
	});
	if (isAllVote) {
		res.json({
			status: 0 //success
		});
	} else {
		res.json({
			status: 1, //err
			message: '请等待其他用户投票哦！稍后过来查看吧'
		});
	}

}); //判断是否所有用户都选择了菜肴


dishRoutes.get('/votedishresult', function(req, res) {
	var data = fs.readFileSync('data.json');
	data = JSON.parse(data.toString());
	data.voteDishResult = [];
	data.userInfo.forEach(function(item) { //遍历不同的用户

		item.voteDishInfo.forEach(function(list) { //遍历选择的菜肴
			var voteDishResultItem = Object.assign({
				times: 1
			}, list);
			if (data.voteDishResult.length !== 0) {
				var isHaveToRepetResult = false;
				for (var i = 0, l = data.voteDishResult.length; i < l; i++) {

					if (data.voteDishResult[i].name === list.name) {
						data.voteDishResult[i].times = data.voteDishResult[i].times + 1;
						isHaveToRepetResult = {
							i: i,
							item: data.voteDishResult[i]
						}
						return
					}
				}
				if (isHaveToRepetResult) {
					data.voteDishResult.splice(isHaveToRepetResult.i, i)
					data.voteDishResult.push(isHaveToRepetResult.item);
				} else {
					data.voteDishResult.push(voteDishResultItem);
				}

			} else {
				data.voteDishResult.push(voteDishResultItem);
			}


		});
	});
	fs.writeFile('data.json', JSON.stringify(data), function(err) { //写入文件
		if (err) {
			return console.error(err);
		}
		res.json({
			status: 0, //success
			data: data.voteDishResult
		});
	});

}); //最后选出的结果

app.use('/api', dishRoutes);

var server = app.listen(3333, function() {

	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})