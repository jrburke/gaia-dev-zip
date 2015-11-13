/*jshint node: true */

var fs = require('fs'),
    path = require('path'),
    exists = fs.existsSync || path.existsSync,
    colors = require('colors'),
    q = require('q'),
    sh = require('shelljs'),
    cwd = process.cwd();

colors.mode = 'console';

function generateHelp() {
  return 'Usage:\n'.bold + 'gaia-dev-zip path/to/application.zip devname\n' +
  'where:\n' +
  '* path/to/application.zip is the path to the zip in profile/webapps\n' +
  '* devname is the dev-related name to use for the copy of the app. Suggested names are bug12394 or name of branch.\n' +
  'See README at http://github.com/jrburke/gaia-dev-zip for more info';
}

function main(args) {
  var d, tempDirName,
      appPath = args[0],
      devName = args[1];

  // Validate args
  if (!appPath || !devName) {
    d = q.defer();
    d.resolve(generateHelp());
    return d.promise;
  }

  function rmTemp() {
    if (tempDirName && exists(tempDirName)) {
      sh.rm('-rf', tempDirName);
    }
  }

  return q.fcall(function () {
    var zipFileName, manifestPath, manifest, locales,
        fullAppPath = path.join(cwd, appPath);

    tempDirName = path.join(cwd, devName);
    zipFileName = tempDirName + '.zip';
    manifestPath = path.join(tempDirName, 'manifest.webapp');

    try {
      if (!exists(fullAppPath)) {
        throw new Error(path.join(cwd, appPath) + ' does not exist.');
      }

      if (fs.statSync(fullAppPath).isDirectory()) {
        // Copy app to new place.
        sh.mkdir('-p', tempDirName);
        sh.cp('-R', path.join(appPath, '*'), tempDirName);
      } else if (path.extname(fullAppPath) === '.zip') {
        sh.exec('unzip ' + fullAppPath + ' -d ' + tempDirName);
      } else {
        throw new Error(path.join(cwd, appPath) + ' is not a valid input.');
      }

      // modify manifest to use new name
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

      // Update the name
      manifest.name = devName;
      manifest.description = devName;

      // Delete stuff injected by manifest that messes things up.
      delete manifest.origin;
      delete manifest.version;

      // And names in locale-specific info
      locales = manifest.locales;
      if (locales) {
        Object.keys(locales).forEach(function (key) {
          locales[key].name = devName;
          locales[key].description = devName;
        });
      }

      fs.writeFileSync(manifestPath,
                       JSON.stringify(manifest, null, '  ', 'utf8'));

      // zip up the contents.
      sh.pushd(devName);
      sh.exec('zip -r ' +
              path.join('..', devName + '.zip') + ' ' + path.join('.', '*'));
      sh.popd();

      return 'Created ' +
             zipFileName.bold +
             '. Upload it to a server for UX review.';
    } finally {
      rmTemp();
    }
  });
}

module.exports = main;
