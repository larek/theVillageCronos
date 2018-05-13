const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');
const gm = require('gm');
const dir = './web/images';

gulp.task('css',() => {
  return gulp.src('./src/index.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./web/css'));
});


gulp.task('thumbs', () => {
  fs.readdir(dir, (err, list) =>{
    list.forEach(item => {
      let stats = fs.statSync(path.join(dir + '/' + item));
      if(stats.isDirectory()){
        fs.readdir(dir + '/' + item, (e, l) => {
          l.forEach(i => {
            // crop and resize faces
            if(i == '3.jpg' || i == '4.jpg'){
              let basename = path.basename(dir + '/' + item + '/' + i, '.jpg');
              gm(dir + '/' + item + '/' + i)
                .resize(100)
                .crop(100, 100, 0, 10)
                .write(dir + '/' + item + '/' + basename +'-100.jpg', err => {
                  err ? console.log(err) : false; // eslint-disable-line no-console
                });
            }
            // crop and resize faces
            if(i == '1.jpg' || i == '2.jpg'){
              let basename = path.basename(dir + '/' + item + '/' + i, '.jpg');
              gm(dir + '/' + item + '/' + i)
                .resize(300)
                .crop(300, 180, 0, 50)
                .gravity('Center')
                .write(dir + '/' + item + '/' + basename +'-thumb.jpg', err => {
                  err ? console.log(err) : false; // eslint-disable-line no-console
                });
            }
          });
        });
      }
    });
  });
});


gulp.task('png2jpg', () => {
  fs.readdir(dir, (err, list) =>{
    list.forEach(item => {
      let stats = fs.statSync(path.join(dir + '/' + item));
      if(stats.isDirectory()){
        fs.readdir(dir + '/' + item, (e, l) => {
          l.forEach(i => {
            // crop and resize faces
            if(i == '3.png' || i == '4.png'){
              let basename = path.basename(dir + '/' + item + '/' + i, '.png');
              gm(dir + '/' + item + '/' + i)
                .resize(400)
                .write(dir + '/' + item + '/' + basename +'.jpg', err => {
                  err ? console.log(err) : false; // eslint-disable-line no-console
                });
            }
          });
        });
      }
    });
  });
});


gulp.task('png', () => {
  fs.readdir(dir, (err, list) =>{
    list.forEach(item => {
      let stats = fs.statSync(path.join(dir + '/' + item));
      if(stats.isDirectory()){
        fs.readdir(dir + '/' + item, (e, l) => {
          l.forEach(i => {
            // crop and resize faces
            if(i == '5.png'){
              gm(dir + '/' + item + '/' + i)
                .resize(300)
                .write(dir + '/' + item + '/5.png', err => {
                  err ? console.log(err) : false; // eslint-disable-line no-console
                });
            }
          });
        });
      }
    });
  });
});
