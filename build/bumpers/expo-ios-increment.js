"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeVersion = exports.readVersion = void 0;
const expo_1 = require("../parsers/expo");
/**
 * Read the manifest version from the `expo.ios.buildNumber` property.
 */
exports.readVersion = expo_1.iosVersionReader;
/**
 * Write the manifest version to the `expo.ios.buildNumber` property.
 * This uses the an incremental approach, and ignores the provided version.
 */
const writeVersion = (contents, _version) => {
    const manifest = (0, expo_1.parse)(contents);
    manifest.expo.ios = manifest.expo.ios || {};
    const buildNumber = manifest.expo.ios.buildNumber !== undefined ? Number(manifest.expo.ios.buildNumber) : 0;
    if (Number.isNaN(buildNumber)) {
        throw new Error('Could not parse number from `expo.ios.buildNumber`.');
    }
    manifest.expo.ios.buildNumber = String(buildNumber + 1);
    return (0, expo_1.serialize)(manifest, contents);
};
exports.writeVersion = writeVersion;
