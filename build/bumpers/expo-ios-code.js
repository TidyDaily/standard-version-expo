"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeVersion = exports.readVersion = void 0;
const expo_1 = require("../parsers/expo");
const versions_1 = require("../versions");
/**
 * Read the manifest version from the `expo.ios.buildNumber` property.
 */
exports.readVersion = expo_1.iosVersionReader;
/**
 * Write the manifest version to the `expo.ios.buildNumber` property.
 * This uses the Android version code approach of Maxi Rosson.
 *
 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
 */
const writeVersion = (contents, version) => {
    const manifest = (0, expo_1.parse)(contents);
    manifest.expo.ios = manifest.expo.ios || {};
    manifest.expo.ios.buildNumber = String((0, versions_1.getVersionCode)(manifest, version));
    return (0, expo_1.serialize)(manifest, contents);
};
exports.writeVersion = writeVersion;
