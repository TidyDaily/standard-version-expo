"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeVersion = exports.readVersion = void 0;
const expo_1 = require("../parsers/expo");
const versions_1 = require("../versions");
/**
 * Read the manifest version from the `expo.android.versionCode` property.
 */
exports.readVersion = expo_1.androidVersionReader;
/**
 * Write the manifest version to the `expo.android.versionCode` property.
 * This uses the Android version code approach of Maxi Rosson.
 *
 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
 */
const writeVersion = (contents, version) => {
    const manifest = (0, expo_1.parse)(contents);
    manifest.expo.android = manifest.expo.android || {};
    manifest.expo.android.versionCode = (0, versions_1.getVersionCode)(manifest, version);
    return (0, expo_1.serialize)(manifest, contents);
};
exports.writeVersion = writeVersion;
