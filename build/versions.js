"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersionCode = getVersionCode;
const config_1 = require("@expo/config");
const semver_1 = require("semver");
/**
 * Get the version code from a manifest and target version.
 * It's designed for Android using the approach from Maxi Rosson.
 *
 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
 */
function getVersionCode(manifest, version) {
    const sdk = (0, config_1.getExpoSDKVersion)(process.cwd(), manifest.expo);
    const expo = (0, semver_1.coerce)(sdk);
    const target = (0, semver_1.coerce)(version);
    if (!expo) {
        throw new Error('Could not parse the `expo.sdkVersion` from the manifest.');
    }
    if (!target) {
        throw new Error('Could not parse the new version from standard version.');
    }
    return expo.major * 10000000 + target.major * 10000 + target.minor * 100 + target.patch;
}
