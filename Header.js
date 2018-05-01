"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@react-pdf/core");
var styles = core_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 0,
        borderBottomWidth: 2,
        borderBottomColor: "#112131",
        borderBottomStyle: "solid",
        alignItems: "stretch"
    },
    detailColumn: {
        flexDirection: "column",
        flexGrow: 9
    },
    linkColumn: {
        flexDirection: "column",
        flexGrow: 2,
        alignSelf: "flex-end",
        justifySelf: "flex-end"
    },
    name: {
        fontSize: 24,
        textTransform: "uppercase"
    },
    subtitle: {
        fontSize: 10,
        justifySelf: "flex-end",
        textTransform: "uppercase"
    },
    link: {
        fontSize: 10,
        color: "black",
        textDecoration: "none",
        alignSelf: "flex-end",
        justifySelf: "flex-end"
    }
});
exports.default = (function () { return (react_1.default.createElement(core_1.View, { style: styles.container },
    react_1.default.createElement(core_1.View, { style: styles.detailColumn },
        react_1.default.createElement(core_1.Text, { style: styles.name }, "Luke Skywalker"),
        react_1.default.createElement(core_1.Text, { style: styles.subtitle }, "Jedi Master")),
    react_1.default.createElement(core_1.View, { style: styles.linkColumn },
        react_1.default.createElement(core_1.Link, { style: styles.link }, "luke@theforce.com")))); });
