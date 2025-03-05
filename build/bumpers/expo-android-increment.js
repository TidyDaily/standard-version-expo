"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeVersion = exports.readVersion = void 0;
const expo_1 = require("../parsers/expo");
/**
 * Read the manifest version from the `expo.android.versionCode` property.
 */
exports.readVersion = expo_1.androidVersionReader;
/**
 * Write the manifest version to the `expo.android.versionCode` property.
 * This uses the an incremental approach, and ignores the provided version.
 */
const writeVersion = (contents, _version) => {
    const manifest = (0, expo_1.parse)(contents);
    manifest.expo.android = manifest.expo.android || {};
    manifest.expo.android.versionCode = (manifest.expo.android.versionCode || 0) + 1;
    return (0, expo_1.serialize)(manifest, contents);
};
exports.writeVersion = writeVersion;
