module.exports = function (config) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
        process.exit(1);
    }

    // Check out https://saucelabs.com/platforms for all browser/platform combos
    var customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox'
        }
    };

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'stackframe.js',
            'spec/*-spec.js'
        ],
        exclude: [],
        preprocessors: {},
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browserDisconnectTimeout : 10000,
        browserDisconnectTolerance : 1,
        browserNoActivityTimeout : 240000,
        captureTimeout : 240000,
        sauceLabs: {
            testName: 'stackframe unit tests',
            recordScreenshots: false,
            connectOptions: {
                port: 5757,
                logfile: 'sauce_connect.log'
            }
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['progress', 'saucelabs'],
        singleRun: true
    });
};
