

const BUILD = 'dist/_build/';

const pkg = require('../../package.json');

module.exports = grunt => ({
    // Fix double define problem
    latlon: {
      src: [
        'node_modules/geodesy/latlon-ellipsoidal.js',
        'node_modules/geodesy/latlon-spherical.js',
      ],
      overwrite: true,
      replacements: [
        {
          from:
            "if (typeof module != 'undefined' && module.exports) " +
            'module.exports.Vector3d = Vector3d;',
          to: '',
        },
        {
          from:
            "if (typeof define == 'function' && define.amd) " +
            'define([], function() { return Vector3d; });',
          to: '',
        },
        {
          from:
            "if (typeof define == 'function' && define.amd) " +
            "define(['Dms'], function() { return LatLon; });",
          to: '',
        },
      ],
    },

    // ratchet's modal functionality is not compatable with spa routing
    ratchet: {
      src: ['node_modules/ratchet/dist/js/ratchet.js'],
      overwrite: true,
      replacements: [
        {
          from: 'getModal(event)',
          to: 'null',
        },
      ],
    },

    // need to remove Ratchet's default fonts to work with fontello ones
    ratchet_fonts: {
      src: ['node_modules/ratchet/dist/css/ratchet.css'],
      overwrite: true,
      replacements: [
        {
          from: /font-family: Ratchicons;/g,
          to: '',
        },
        {
          from: /src: url\(\"\.\.\/fonts.*;/g,
          to: '',
        },
      ],
    },

    // need to remove Ratchet's default fonts to work with fontello ones
    photoswipe: {
      src: ['node_modules/photoswipe/dist/default-skin/default-skin.css'],
      overwrite: true,
      replacements: [
        {
          from: 'url(default-skin.',
          to: 'url(images/default-skin.',
        },
      ],
    },

    // moving the stylesheet to root makes the path different
    fontello_fonts: {
      src: ['src/common/vendor/fontello/css/icons.css'],
      dest: `${BUILD}styles/icons.css`,
      replacements: [
        {
          from: /\.\.\/font\//g,
          to: './font/',
        },
      ],
    },

    // Cordova config changes
    cordova_config: {
      src: ['other/cordova/cordova.xml'],
      dest: 'dist/cordova/config.xml',
      replacements: [
        {
          from: /\{ID\}/g, // string replacement
          to: () => pkg.id,
        },
        {
          from: /\{APP_VER\}/g, // string replacement
          to: () => pkg.version,
        },
        {
          from: /\{APP_TITLE\}/g,
          to: () => pkg.title,
        },
        {
          from: /\{APP_DESCRIPTION\}/g,
          to: () => pkg.description,
        },
        {
          from: /\{BUNDLE_VER\}/g,
          to: () => pkg.build,
        },
        {
          from: /\{ANDROID_BUNDLE_VER\}/g,
          to() {
            /* For a version a.b.c and build d, create a number
            in the form aabbccdd. E.g 1.3.7 (11) becomes 01030711.
            This ensures the version number always increases with
            successive versions provided no version part exceeds 99. */
            let versionArray = pkg.version.split('.');
            versionArray.push(pkg.build);
            versionArray = versionArray.map(v => v.padStart(2, '0'));
            let version = '';
            versionArray.forEach(v => version += v);
            if (!grunt.option('oldversion')) {
              version += 8;
            }
            return version;
          },
        },
      ],
    },
    cordova_build: {
      src: ['other/cordova/build.json'],
      dest: 'dist/cordova/build.json',
      replacements: [
        {
          from: /\{DEV_TEAM_ID\}/g, // string replacement
          to: () => process.env.DEV_TEAM_ID,
        },
      ],
    },
  });
