const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('simple', () =>
    gulp.src('src/backend/simple/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/backend/simple'))
);

gulp.task('typesresolvers', () =>
    gulp.src('src/backend/typesresolvers/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/backend/typesresolvers'))
);

gulp.task('withmongo', () =>
    gulp.src('src/backend/withmongo/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/backend/withmongo'))
);