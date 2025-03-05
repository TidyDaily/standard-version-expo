"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeVersion = exports.readVersion = void 0;
const expo_1 = require("../parsers/expo");
/**
 * Read the manifest version from the `expo.version` property.
 */
const readVersion = (contents) => (0, expo_1.parse)(contents).expo.version || '';
exports.readVersion = readVersion;
/**
 * Write the manifest version to the `expo.version` property.
 */
const writeVersion = (contents, version) => {
    const manifest = (0, expo_1.parse)(contents);
    manifest.expo.version = version;
    return (0, expo_1.serialize)(manifest, contents);
};
exports.writeVersion = writeVersion;
