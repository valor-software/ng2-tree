'use strict';

module.exports = config => {
  config.set({
    autoWatch: true,
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'test.bundle.js', watched: false }
    ],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    phantomJsLauncher: {
      exitOnResourceError: true
    },
    port: 9876,
    preprocessors: {
      'test.bundle.js': ['webpack', 'sourcemap']
    },
    reporters: process.env.COVERAGE === 'enabled' ? ['spec', 'karma-remap-istanbul'] : ['spec'],
    remapIstanbulReporter: {
      reports: {
        html: 'coverage'
      }
    },
    coverageReporter: {
      includeAllSources: true
    },
    singleRun: true,
    webpack: require('./webpack.test.js'),
    webpackServer: {
      noInfo: true
    },

    // to avoid [PhantomJS 2.1.1 (Windows 8 0.0.0)]: Disconnected (1 times), because no message in 10000 ms error.
    browserDisconnectTimeout : 10000, // default 2000
    browserDisconnectTolerance : 1,   // default 0
    browserNoActivityTimeout : 60000  //default 10000
  });
};
