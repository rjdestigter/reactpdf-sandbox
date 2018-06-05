"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOFT_GREEN = '#4DA04D';
exports.SOFT_GREEN_RGB = [77, 160, 77];
exports.MEDIUM_GRAY = '#7D7D7D';
exports.GREY88 = '#ADADAD';
exports.SOFT_BLUE = 'rgb(25, 120, 208)';
exports.SOFT_RED = [244, 67, 54];
exports.VIVID_TANGERINE = [255, 127, 127];
exports.PICTON_BLUE = [61, 143, 237];
exports.EASTERN_BLUE = [20, 139, 184];
exports.TEXT = [51, 51, 51];
exports.WHITE = [255, 255, 255];
exports.BLACK = [0, 0, 0];
exports.CREAM = [252, 250, 228];
exports.ORANGE = [235, 175, 2];
exports.DARK_ORANGE = [210, 143, 2];
exports.BROWN = [61, 41, 0];
exports.SOIL = [206, 144, 42];
exports.GREY = [45, 45, 45];
exports.LIGHT_GREY = [117, 117, 117];
exports.VERY_LIGHT_GREY = [222, 222, 222];
exports.PRIMARY = exports.ORANGE;
exports.SECONDARY = exports.DARK_ORANGE;
exports.DARK = exports.BROWN;
exports.LIGHT_BLUE = [33, 150, 243];
exports.DARK_YELLOW = [255, 193, 7];
exports.DARK_GREEN = [76, 175, 0];
exports.DARK_PURPLE = [156, 39, 6];
exports.FIRE_ORANGE = [255, 87, 4];
exports.FUEL_YELLOW = [210, 143, 42];
exports.MENUITEM_HOVER = '#FF9600';
exports.NOTIFY_BACKGROUND_COLOR = '#f2dede';
exports.NOTIFY_TEXT_COLOR = '#a94442';
exports.NOTIFY_BORDER_COLOR = '#ebccd1';
exports.MENU_BACKGROUND_COLOR = [47, 51, 60];
exports.FOLDER_ITEM_BORDER_COLOR = [224, 224, 224];
exports.FOLDER_DETAILS_COLOR = [117, 117, 117];
exports.FOLDER_LIST_ITEM_COLOR = [234, 234, 234];
exports.DISABLE_BUTTON_GRAY = '#dadada';
exports.color = function (rgb, alpha) {
    if (rgb === void 0) { rgb = [0, 0, 0]; }
    if (alpha === void 0) { alpha = 1; }
    if (alpha >= 1) {
        return "rgb(" + rgb.join(',') + ")";
    }
    return "rgba(" + rgb.join(',') + ", " + alpha + ")";
};
exports.colorize = function (rgb) { return function (alpha) {
    if (alpha === void 0) { alpha = 1; }
    return exports.color(rgb, alpha);
}; };
exports.primary = exports.colorize(exports.PRIMARY);
exports.secondary = exports.colorize(exports.SECONDARY);
exports.white = exports.colorize(exports.WHITE);
exports.black = exports.colorize(exports.BLACK);
exports.offwhite = exports.colorize(exports.CREAM);
exports.dark = exports.colorize(exports.DARK);
exports.soil = exports.colorize(exports.SOIL);
exports.grey = exports.colorize(exports.GREY);
exports.lightGrey = exports.colorize(exports.LIGHT_GREY);
exports.lightGrey2 = exports.colorize(exports.VERY_LIGHT_GREY);
exports.text = exports.colorize(exports.GREY);
exports.text51 = exports.colorize(exports.TEXT);
exports.error = exports.colorize(exports.SOFT_RED);
exports.red = exports.colorize(exports.SOFT_RED);
exports.errorBox = exports.colorize(exports.VIVID_TANGERINE);
exports.fuelYellow = exports.colorize(exports.FUEL_YELLOW);
exports.menuBackgroundColor = exports.colorize(exports.MENU_BACKGROUND_COLOR);
exports.folderItemBorder = exports.colorize(exports.FOLDER_ITEM_BORDER_COLOR);
exports.folderDetailsColor = exports.colorize(exports.FOLDER_DETAILS_COLOR);
exports.folderListItemColor = exports.colorize(exports.FOLDER_LIST_ITEM_COLOR);
exports.blue = exports.colorize([25, 120, 228]);
exports.halfBlue = function () { return exports.blue(0.5); };
exports.halfWhite = function () { return exports.white(0.5); };
exports.yellow = exports.colorize(exports.DARK_YELLOW);
exports.dimGray = function () { return exports.white(0.09); };
exports.green = exports.colorize(exports.DARK_GREEN);
exports.softGreen = exports.colorize(exports.SOFT_GREEN_RGB);
exports.purple = exports.colorize(exports.DARK_PURPLE);
exports.orange = exports.colorize(exports.FIRE_ORANGE);
exports.disabledGray = exports.colorize(exports.DISABLE_BUTTON_GRAY);
exports.assets = exports.primary;
exports.field = exports.colorize(exports.LIGHT_BLUE);
exports.managementZone = exports.colorize([243, 136, 42]);
exports.zone = exports.colorize([144, 105, 214]);
exports.cropHealth = exports.colorize([244, 109, 67]);
exports.applied = exports.colorize([206, 131, 168]);
exports.harvest = exports.colorize([45, 187, 103]);
exports.profit = exports.colorize([0, 150, 136]);
// Harvest Layers
exports.moisture = exports.colorize([44, 127, 184]);
exports.yieldRaster = exports.colorize([125, 202, 0]);
exports.vehicle = exports.colorize([251, 180, 174]);
exports.productivity = exports.colorize([152, 0, 67]);
exports.elevation = exports.colorize([242, 81, 31]);
exports.date = exports.colorize([253, 218, 236]);
exports.percent = exports.colorize([253, 174, 97]);
exports.overlap = exports.colorize([255, 233, 168]);
exports.standard = exports.colorize([166, 217, 106]);
exports.rgbRaster = exports.colorize([165, 138, 103]);
exports.healthRaster = exports.colorize([161, 210, 70]);
exports.fieldVariability = exports.colorize([90, 180, 172]);
exports.toolbarOrange = function () { return exports.fuelYellow(0.09); };
exports.menuHover = function () { return exports.primary(0.7); };
exports.menuBackground = function () { return exports.menuBackgroundColor(0.82); };
exports.territory = exports.colorize([88, 204, 208]);
exports.farm = exports.colorize([185, 11, 30]);
exports.hub = exports.colorize([243, 200, 14]);
exports.salesOffice = exports.colorize([149, 117, 205]);
exports.regional = exports.colorize([0, 188, 212]);
exports.rapidEye = exports.colorize([10, 101, 113]);
exports.placemark = exports.colorize([95, 185, 114]);
exports.boundary = exports.colorize([72, 126, 253]);
exports.scouting = exports.colorize([132, 66, 4]);
exports.greenAero = exports.colorize([5, 206, 124]);
exports.pictonBlue = exports.colorize(exports.PICTON_BLUE);
exports.easternBlue = exports.colorize(exports.EASTERN_BLUE);
exports.textOn = function (_a) {
    var color = _a.color, _b = _a.light, light = _b === void 0 ? exports.white() : _b, _c = _a.dark, dark = _c === void 0 ? exports.grey() : _c;
    var _d = color.match(/[0-9]+/g), r = _d[0], g = _d[1], b = _d[2];
    var o = Math.round((parseInt(r, 10) * 299 + parseInt(g, 10) * 587 + parseInt(b, 10) * 114) / 1000);
    return o > 150 ? dark : light;
};
exports.pieChartColors = [
    exports.colorize([241, 88, 84]),
    exports.colorize([222, 207, 63]),
    exports.colorize([178, 118, 178]),
    exports.colorize([178, 145, 47]),
    exports.colorize([241, 124, 176]),
    exports.colorize([96, 189, 104]),
    exports.colorize([250, 164, 58]),
    exports.colorize([93, 165, 218]),
    exports.colorize([77, 77, 77]),
    exports.colorize([132, 112, 255]),
    exports.colorize([205, 50, 120]),
    exports.colorize([61, 89, 171]),
    exports.colorize([0, 104, 139]),
    exports.colorize([0, 139, 69]),
    exports.colorize([205, 173, 0]),
    exports.colorize([139, 69, 0]),
    exports.colorize([139, 26, 26]),
    exports.colorize([139, 134, 78]),
    exports.colorize([54, 100, 139]),
    exports.colorize([113, 198, 113]),
    exports.colorize([139, 62, 47]),
    exports.colorize([139, 71, 93]),
    exports.colorize([85, 26, 139]),
    exports.colorize([69, 139, 0]),
];
exports.default = {
    TEXT: exports.TEXT,
    SOFT_RED: exports.SOFT_RED,
    SOFT_GREEN: exports.SOFT_GREEN,
    SOFT_BLUE: exports.SOFT_BLUE,
    MEDIUM_GRAY: exports.MEDIUM_GRAY,
    GREY88: exports.GREY88,
    MENUITEM_HOVER: exports.MENUITEM_HOVER,
    NOTIFY_BACKGROUND_COLOR: exports.NOTIFY_BACKGROUND_COLOR,
    NOTIFY_TEXT_COLOR: exports.NOTIFY_TEXT_COLOR,
    NOTIFY_BORDER_COLOR: exports.NOTIFY_BORDER_COLOR,
    DISABLE_BUTTON_GRAY: exports.DISABLE_BUTTON_GRAY,
    halfWhite: exports.halfWhite,
    blue: exports.blue,
    halfBlue: exports.halfBlue,
    yellow: exports.yellow,
    dimGray: exports.dimGray,
    green: exports.green,
    softGreen: exports.softGreen,
    purple: exports.purple,
    orange: exports.orange,
    white: exports.white,
    black: exports.black,
    grey: exports.grey,
    primary: exports.primary,
    secondary: exports.secondary,
    offwhite: exports.offwhite,
    fuelYellow: exports.fuelYellow,
    dark: exports.dark,
    soil: exports.soil,
    lightGrey: exports.lightGrey,
    lightGrey2: exports.lightGrey2,
    text: exports.text,
    text51: exports.text51,
    error: exports.error,
    red: exports.red,
    textOn: exports.textOn,
    pictonBlue: exports.pictonBlue,
    easternBlue: exports.easternBlue,
    assets: exports.assets,
    field: exports.field,
    managementZone: exports.managementZone,
    zone: exports.zone,
    cropHealth: exports.cropHealth,
    applied: exports.applied,
    harvest: exports.harvest,
    profit: exports.profit,
    hub: exports.hub,
    salesOffice: exports.salesOffice,
    territory: exports.territory,
    farm: exports.farm,
    regional: exports.regional,
    placemark: exports.placemark,
    boundary: exports.boundary,
    scouting: exports.scouting,
    moisture: exports.moisture,
    yieldRaster: exports.yieldRaster,
    vehicle: exports.vehicle,
    productivity: exports.productivity,
    elevation: exports.elevation,
    date: exports.date,
    percent: exports.percent,
    overlap: exports.overlap,
    standard: exports.standard,
    rgbRaster: exports.rgbRaster,
    healthRaster: exports.healthRaster,
    fieldVariability: exports.fieldVariability,
    greenAero: exports.greenAero,
    toolbarOrange: exports.toolbarOrange,
    menuHover: exports.menuHover,
    menuBackground: exports.menuBackground,
    folderItemBorder: exports.folderItemBorder,
    folderDetailsColor: exports.folderDetailsColor,
    folderListItemColor: exports.folderListItemColor,
    pieChartColors: exports.pieChartColors,
};
