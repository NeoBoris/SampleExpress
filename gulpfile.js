var gulp = require('gulp');
var spawn = require('child_process').spawn;
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var protractor = require('gulp-protractor').protractor;
var server;

gulp.task('server',function(){
	if (server) {
	    //サーバーが起動していたら終了
        server.kill('SIGKILL');
        server = undefined;
    }
    //サーバーを起動。npm startと同じ。私の環境がwindowsなのでこうしてる。
    server = spawn('node',['./bin/www']);
　   //console.logとかをコンソールに表示
    server.stdout.setEncoding('utf8');
    server.stdout.on('data',function(data){
        console.log(data);
    });
    //エラーをコンソールに表示
    server.stderr.setEncoding('utf8');
    server.stderr.on('data',function(data){
        console.log(data);
    });
});

//livereloadサーバへ変更通知を行い、ブラウザのリロードを行う。
gulp.task('reload',function(){
	gulp.src(['public/*/*','views/*'])
	.pipe(livereload());  
});

gulp.task('watch',['server'],function(){
	livereload.listen();
	//サーバ再起動の対象にするファイル
	gulp.watch(['app.js','server/routes/*'],['server']);
	//ブラウザリロードの対象にするファイル
	gulp.watch(['public/*/*','server/views/*'],['reload']);
});

gulp.task('protractor', function() {
    return gulp
    .src(['./test/e2e/spec/*.js'])
    .pipe(protractor({
        configFile: 'test/e2e/config.js',
        args: ['--baseUrl', 'http://localhost:3000']
    }))
    .on('error', function(e) { throw e; });
});

gulp.task('test:e2e', function(callback) {
    runSequence(
        'protractor',
        callback
    );
});
