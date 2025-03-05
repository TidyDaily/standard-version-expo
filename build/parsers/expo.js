"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iosVersionReader = exports.androidVersionReader = void 0;
exports.parse = parse;
exports.serialize = serialize;
const json_file_1 = __importDefault(require("@expo/json-file"));
const detect_indent_1 = __importDefault(require("detect-indent"));
const detect_newline_1 = __importDefault(require("detect-newline"));
const DEFAULT_INDENT = '  ';
const DEFAULT_NEWLINE = '\n';
/**
 * Parse and validate the manifest file, and return it as typed object.
 */
function parse(contents) {
    let manifest;
    try {
        manifest = json_file_1.default.parseJsonString(contents, { json5: true });
    }
    catch (_a) {
        manifest = null;
    }
    if (manifest === null || typeof manifest !== 'object') {
        throw new Error('Manifest must include a JSON object.');
    }
    if (manifest.expo === null || typeof manifest.expo !== 'object') {
        throw new Error("Property 'expo' in manifest is not an object.");
    }
    return manifest;
}
/**
 * Serialize the manifest content back to string.
 * This also accepts the raw content to detect the indentation and/or newline.
 */
function serialize(manifest, raw = '') {
    const indent = (0, detect_indent_1.default)(raw).indent || DEFAULT_INDENT;
    const newline = (0, detect_newline_1.default)(raw) || DEFAULT_NEWLINE;
    const json = JSON.stringify(manifest, null, indent);
    return json.replace(/\n/g, newline) + newline;
}
/**
 * The default android version reader.
 * It reads the value from `expo.android.versionCode` and returns it as string.
 */
const androidVersionReader = (contents) => { var _a; return String(((_a = parse(contents).expo.android) === null || _a === void 0 ? void 0 : _a.versionCode) || ''); };
exports.androidVersionReader = androidVersionReader;
/**
 * The default ios version reader.
 * It reads the value from `expo.ios.buildNumber` and returns it as string.
 */
const iosVersionReader = (contents) => { var _a; return ((_a = parse(contents).expo.ios) === null || _a === void 0 ? void 0 : _a.buildNumber) || ''; };
exports.iosVersionReader = iosVersionReader;
