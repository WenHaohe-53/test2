let gulp = require('gulp');

gulp.task('copy-html', function(done) {
    return gulp.src('./index.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
    done();
});

gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());

});
let scss = require('gulp-scss');


gulp.task('scss', function() {

    return gulp.src('scss/**/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('data', function() {
    return gulp.src('data/*.json')
        .pipe(gulp.dest('dist/data'))
        .pipe(connect.reload());
});

gulp.task('build', gulp.series('copy-html', 'images', 'scss', 'scripts', 'data'), function(done) {
    console.log("编译成功")
    done();

});
// gulp 监听
gulp.task('watch', function(done) {
    gulp.watch('index.html', gulp.series('copy-html'));
    gulp.watch('images/**/*', gulp.series('images'));
    gulp.watch('scss/**/*.scss', gulp.series('scss'));
    gulp.watch('js/*.js', gulp.series('scripts'));
    gulp.watch('data/*.json', gulp.series('data'));
    done();
});
// 服务器
let connect = require('gulp-connect');

gulp.task('server', function(done) {
    connect.server({
        root: './dist',
        port: 8090,
        livereload: true //实时刷新
    });
    done();
});

// 默认任务

gulp.task('default', gulp.series('server', 'watch'));