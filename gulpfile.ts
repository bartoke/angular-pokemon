// APP STRUCTURE:
// /src/
// --- /assets/
// --- /app/
// ------- angular app
// --- /scss/
// /build/
// /node_modules/
// package.json
// gulpfile.ts
// ..

const gulp = 		require("gulp")
const $ = 			require("gulp-load-plugins")()
const rimraf = 		require("rimraf")
const sequence = 	require("run-sequence")
const browserSync = require("browser-sync").create()

const tsProject = $.typescript.createProject("tsconfig.json")

const PORT = 3000

const PATHS = {
	app: [
		"src/app/**/*.ts"
	],

	libraries: [
		"core-js/client/shim.min.js",
		"reflect-metadata/Reflect.js",
		"systemjs/dist/system-polyfills.js",
		"systemjs/dist/system.src.js",
		"rxjs/**/*.js",
		"zone.js/dist/**",
		"@angular/**/bundles/**"
	],

	assets: [
		"src/*",
		"src/!{scss/app}/**/*"
	],

	sass: [
		"src/scss/**/*.scss"
	]
}

// TASKS

/////////////////////////////////////////////////////////////////////////////
// Clean: [ Delete "/build" folder ]
/////////////////////////////////////////////////////////////////////////////
gulp.task("clean", done => rimraf("build", done))

// Lint:
//   Log problems in .ts files
gulp.task("lint", () => {
	return gulp.src(PATHS.app)
		.pipe($.tslint({
			formatter: 'prose'
		}))
		.pipe($.tslint.report())
});

/////////////////////////////////////////////////////////////////////////////
// Javascript: [ Compilation ]
/////////////////////////////////////////////////////////////////////////////
gulp.task("javascript", () => {
	let tsResult = gulp.src(PATHS.app)
		.pipe($.sourcemaps.init())
		.pipe($.typescript(tsProject))

	return tsResult.js
		.pipe($.sourcemaps.write({ sourceRoot: "/src" }))
		.pipe(gulp.dest("build/app"))
});

/////////////////////////////////////////////////////////////////////////////
// Libraries: [ Copy ]
/////////////////////////////////////////////////////////////////////////////
gulp.task("libraries", () => {
	return gulp.src(PATHS.libraries, {
			cwd: "node_modules/**"
		})
		.pipe(gulp.dest("build/lib"));
});

/////////////////////////////////////////////////////////////////////////////
// Sass: [ Compilation ]
/////////////////////////////////////////////////////////////////////////////
gulp.task("sass", () => {
	var sass = $.sass({
			includePaths: [
				"node_modules/foundation-sites/scss"
			]
		})
		.on('error', $.notify.onError((error) => ({
			title: "Error compiling Sass",
			message: `Error: ${error.message}`
		})));

	// Missing:
	// - autoprefixer
	// - minify
	// - sourcemaps

	return gulp.src("src/scss/style.scss")
		.pipe(sass)
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.stream())
		.pipe($.notify({
			title: "Sass",
			message: "All Sass files were compiled"
		}));
});

/////////////////////////////////////////////////////////////////////////////
// Assets: [ Copy assets to "/build" ]
/////////////////////////////////////////////////////////////////////////////
gulp.task("assets", () => {
	return gulp.src(PATHS.assets)
		.pipe(gulp.dest("build/"))
		.pipe(browserSync.stream());
});

//
// BUILD
//
gulp.task("build", (done) => {
	console.log("Building the project..");
	sequence("clean", [ "libraries", "sass", "javascript", "assets" ], done);
});

//
// WATCH
//
gulp.task("watch", () => {
	console.log("Watching the project..");

	gulp.watch(PATHS.sass, [ "sass" ]).on("change", (e) => {
		console.log(`Sass file ${e.path} changed. Updating.`);
	});

	gulp.watch(PATHS.assets, [ "assets" ]).on("change", (e) => {
		console.log(`Asset ${e.path} changed. Updating.`);
	});

	gulp.watch(PATHS.app, [ "javascript" ]).on("change", (e) => {
		console.log(`Javascript file ${e.path} changed. Updating.`);
	});

	gulp.watch("build/*.html").on("change", browserSync.reload);
});

//
// SERVER
//
gulp.task("server", () => {
	browserSync.init({
		port: PORT,
		server: {
			baseDir: "build/"
		},
	});
});

//
// DEFAULT
//
gulp.task("default", () => sequence("build", [ "server", "watch" ]))

