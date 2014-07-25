This is a dirty fork of grunt-wiredep to publish private src in index.html


In your HTML file : 


    <!-- src:js -->
    <script src="/app/bar.js"></script>
    <script src="/app/foo.js"></script>
    <!-- endsrc -->

    <!-- src:css -->
    <link rel="stylesheet" href="/app/bar.css" />
    <link rel="stylesheet" href="/app/foo.css" />
    <!-- endsrc -->


In your Grunt File : 


    /*
       wiresrc config
    */
    srcInstall: {
        app: {
            src: ['<%= config.app %>/index.html'],
            scope: {
                js: {
                    includes: [
                        'common/**/*.js',
                        'app/**/*.js'
                    ],
                    // excludes: [
                    //     'app/app.js'
                    // ]
                },
                css: {
                    includes: [
                        'common/**/*.css',
                        'app/**/*.css'
                    ],
                }
            }
        }
    },