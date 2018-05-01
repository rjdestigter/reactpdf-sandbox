"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("regenerator-runtime/runtime");
var react_1 = __importDefault(require("react"));
var core_1 = require("@react-pdf/core");
var node_1 = __importDefault(require("@react-pdf/node"));
var Header_1 = __importDefault(require("./Header"));
var styles = core_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        "@media max-width: 400": {
            flexDirection: "column"
        }
    },
    image: {
        marginBottom: 10,
        "@media max-width: 400": {
            width: 290
        }
    },
    leftColumn: {
        flexDirection: "column",
        width: 170,
        marginLeft: 30,
        marginRight: 15,
        marginTop: 20,
        "@media max-width: 400": {
            width: 290,
            marginRight: 30
        },
        "@media orientation: landscape": {
            width: 200,
            marginRight: 50
        }
    },
    rightColumn: {
        flexDirection: "column",
        flexGrow: 1,
        marginLeft: 15,
        marginRight: 30,
        marginTop: 20,
        "@media max-width: 400": {
            marginTop: 10,
            marginLeft: 30
        }
    },
    footer: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 25,
        marginHorizontal: 30,
        paddingVertical: 10,
        borderWidth: 3,
        borderColor: "gray",
        borderStyle: "dashed",
        "@media orientation: landscape": {
            marginTop: 10
        }
    }
});
var Resume = function (props) { return (react_1.default.createElement(core_1.Page, __assign({}, props),
    react_1.default.createElement(Header_1.default, null),
    react_1.default.createElement(core_1.View, { style: styles.container },
        react_1.default.createElement(core_1.View, { style: styles.leftColumn },
            react_1.default.createElement(core_1.Image, { src: "https://images.gr-assets.com/characters/1264613782p8/1783.jpg", style: styles.image }))),
    react_1.default.createElement(core_1.Text, { style: styles.footer }, "This IS the candidate you are looking for"))); };
var Output = function () { return (react_1.default.createElement(core_1.Document, { author: "Luke Skywalker", keywords: "awesome, resume, start wars", subject: "The resume of Luke Skywalker", title: "Resume" },
    react_1.default.createElement(Resume, { size: "A4" }),
    react_1.default.createElement(Resume, { orientation: "landscape", size: "A4" }),
    react_1.default.createElement(Resume, { size: [350, 1250] }))); };
node_1.default.render(react_1.default.createElement(Output, null), __dirname + "/output.pdf");
