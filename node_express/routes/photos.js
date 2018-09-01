var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

var photos = [];

photos.push({
    name: 'Beauty',
    path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535651716281&di=a6c682ac624bb50c888c601ad039a0fd&imgtype=0&src=http%3A%2F%2Fpic.xiudodo.com%2Ffigure%2F00%2F00%2F01%2F23%2F35%2F5955a7fbd99f78c.jpg'
});

exports.list = function (req, res, next) {
    // res.render('photos', {
    //     title:'Photos',
    //     photos: photos
    // });
    Photo.find({}, function (err, photos) {
        res.render('photos', {
            title: 'Photos',
            photos: photos
        })
    });
}

exports.form = function (req, res, next) {
    res.render('photos/upload', {
        title: 'UploadPhoto'
    });
};

exports.submit = function (dir) {
    console.log("submit");
    return function (req, res, next) {
        const { file } = req;
        var img = file;
        console.log("sumbit:", req.body.uploadname);
        console.log('submit:', img.originalname);
        var name = req.body.uploadname || img.originalname;
        var path = join(dir, name);
        fs.rename(img.path, path, function (err) {
            if (err) return next(err);
            Photo.create({
                name: name,
                path: name
            }, function (err) {
                if (err) return next(err);
                console.log("submit:", "redirect");
                res.redirect('/');
            });
        });
    }
}

exports.download = function (dir) {
    console.log("download");
    return function (req, res, next) {
        var id = req.params.id;
        console.log("download:", id);
        Photo.findById(id, function (err, photo) {
            if (err) return next(err);
            var path = join(dir, photo.name);
            //显示图片是相对路径，下载图片是绝对路径？？？
            // path = '/photos/cocurrent_map.png';
            console.log("download:", path);
            res.download(path);
        });
    };
}