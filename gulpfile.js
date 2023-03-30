const { src, dest, series, watch } = require(`gulp`),
    babel = require(`gulp-babel`),
    browserSync = require(`browser-sync`),
    CSSLinter = require(`gulp-stylelint`),
    jsLinter = require(`gulp-eslint`),
    htmlCompressor = require(`gulp-htmlmin`),
    reload = browserSync.reload,
    sass = require(`gulp-sass`)(require(`sass`)),
    uglify = require(`gulp-uglify`);

let browserChoice = `default`;

let compileCSSForProd = () => {
    return src(`styles/*.css`)
        .pipe(sass.sync({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`prod/styles`));
};

let lintCSS = () => {
    return src(`styles/css/**/*.css`)
        .pipe(CSSLinter({
            reporters: [
                { formatter: `string`, console: true }
            ]
        }));
};

let lintJS = () => {
    return src([`scripts/*.js`])
        .pipe(jsLinter())
        .pipe(jsLinter.failAfterError());
};

let transpileJSForDev = () => {
    return src(`scripts/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let compileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest(`prod/js`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest(`prod/js`));
};


let compileCSSForDev = () => {
    return src(`styles/*.scss`)
        .pipe(sass.sync({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`temp/styles`));
};

let compressHTML = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest(`prod`));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `*.*`,
        `**`,
        `!img/`,
        `!**/*.js`,
        `!styles/**`
    ], {dot: true})
        .pipe(dest(`temp`));
};

let serve = () => {
    browserSync.init({
        server: {
            baseDir: `temp`
        },
        browser: browserChoice,
        notify: false
    });

    watch(`styles/scss/**/*.scss`, series(compileCSSForProd, lintCSS, reload));
    watch(`js/*.js`, series(compileJSForProd, lintJS, reload));
    watch(`*.html`, series(compressHTML, reload));
};

exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.compileCSSForDev = compileCSSForDev;
exports.compressHTML = compressHTML;
exports.compileCSSForProd = compileCSSForProd;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;

exports.default = series(lintCSS, lintJS, transpileJSForDev, serve);
exports.build = series(compressHTML, compileCSSForProd, compileJSForProd, copyUnprocessedAssetsForProd);
