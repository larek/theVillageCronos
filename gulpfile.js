const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const gm = require('gm');
const dir = './web/images';

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
          });
        });
      }
    });
  });
});
