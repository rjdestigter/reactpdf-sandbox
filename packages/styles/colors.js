export const SOFT_GREEN = '#4DA04D'
export const SOFT_GREEN_RGB = [77, 160, 77]
export const MEDIUM_GRAY = '#7D7D7D'
export const GREY88 = '#ADADAD'
export const SOFT_BLUE = 'rgb(25, 120, 208)'
export const SOFT_RED = [244, 67, 54]
export const VIVID_TANGERINE = [255, 127, 127]
export const PICTON_BLUE = [61, 143, 237]
export const EASTERN_BLUE = [20, 139, 184]

export const TEXT = [51, 51, 51]

export const WHITE = [255, 255, 255]
export const BLACK = [0, 0, 0]
export const CREAM = [252, 250, 228]
export const ORANGE = [235, 175, 2]
export const DARK_ORANGE = [210, 143, 2]
export const BROWN = [61, 41, 0]
export const SOIL = [206, 144, 42]
export const GREY = [45, 45, 45]
export const LIGHT_GREY = [117, 117, 117]
export const VERY_LIGHT_GREY = [222, 222, 222]

export const PRIMARY = ORANGE
export const SECONDARY = DARK_ORANGE
export const DARK = BROWN

export const LIGHT_BLUE = [33, 150, 243]
export const DARK_YELLOW = [255, 193, 7]
export const DARK_GREEN = [76, 175, 0]
export const DARK_PURPLE = [156, 39, 6]
export const FIRE_ORANGE = [255, 87, 4]
export const FUEL_YELLOW = [210, 143, 42]

export const MENUITEM_HOVER = '#FF9600'
export const NOTIFY_BACKGROUND_COLOR = '#f2dede'
export const NOTIFY_TEXT_COLOR = '#a94442'
export const NOTIFY_BORDER_COLOR = '#ebccd1'
export const MENU_BACKGROUND_COLOR = [47, 51, 60]
export const FOLDER_ITEM_BORDER_COLOR = [224, 224, 224]
export const FOLDER_DETAILS_COLOR = [117, 117, 117]
export const FOLDER_LIST_ITEM_COLOR = [234, 234, 234]
export const DISABLE_BUTTON_GRAY = '#dadada'

export const color = (rgb = [0, 0, 0], alpha = 1) => {
    if (alpha >= 1) {
        return `rgb(${rgb.join(',')})`
    }

    return `rgba(${rgb.join(',')}, ${alpha})`
}
export const colorize = rgb => (alpha = 1) => color(rgb, alpha)

export const primary = colorize(PRIMARY)
export const secondary = colorize(SECONDARY)
export const white = colorize(WHITE)
export const black = colorize(BLACK)
export const offwhite = colorize(CREAM)
export const dark = colorize(DARK)
export const soil = colorize(SOIL)
export const grey = colorize(GREY)
export const lightGrey = colorize(LIGHT_GREY)
export const lightGrey2 = colorize(VERY_LIGHT_GREY)
export const text = colorize(GREY)
export const text51 = colorize(TEXT)
export const error = colorize(SOFT_RED)
export const red = colorize(SOFT_RED)
export const errorBox = colorize(VIVID_TANGERINE)
export const fuelYellow = colorize(FUEL_YELLOW)
export const menuBackgroundColor = colorize(MENU_BACKGROUND_COLOR)
export const folderItemBorder = colorize(FOLDER_ITEM_BORDER_COLOR)
export const folderDetailsColor = colorize(FOLDER_DETAILS_COLOR)
export const folderListItemColor = colorize(FOLDER_LIST_ITEM_COLOR)

export const blue = colorize([25, 120, 228])
export const halfBlue = () => blue(0.5)
export const halfWhite = () => white(0.5)
export const yellow = colorize(DARK_YELLOW)
export const dimGray = () => white(0.09)
export const green = colorize(DARK_GREEN)
export const softGreen = colorize(SOFT_GREEN_RGB)
export const purple = colorize(DARK_PURPLE)
export const orange = colorize(FIRE_ORANGE)
export const disabledGray = colorize(DISABLE_BUTTON_GRAY)

export const assets = primary
export const field = colorize(LIGHT_BLUE)
export const managementZone = colorize([243, 136, 42])
export const zone = colorize([144, 105, 214])
export const cropHealth = colorize([244, 109, 67])
export const applied = colorize([206, 131, 168])
export const harvest = colorize([45, 187, 103])
export const profit = colorize([0, 150, 136])

// Harvest Layers
export const moisture = colorize([44, 127, 184])
export const yieldRaster = colorize([125, 202, 0])
export const vehicle = colorize([251, 180, 174])
export const productivity = colorize([152, 0, 67])
export const elevation = colorize([242, 81, 31])
export const date = colorize([253, 218, 236])
export const percent = colorize([253, 174, 97])
export const overlap = colorize([255, 233, 168])
export const standard = colorize([166, 217, 106])
export const rgbRaster = colorize([165, 138, 103])
export const healthRaster = colorize([161, 210, 70])
export const fieldVariability = colorize([90, 180, 172])

export const toolbarOrange = () => fuelYellow(0.09)
export const menuHover = () => primary(0.7)
export const menuBackground = () => menuBackgroundColor(0.82)
export const territory = colorize([88, 204, 208])
export const farm = colorize([185, 11, 30])
export const hub = colorize([243, 200, 14])
export const salesOffice = colorize([149, 117, 205])
export const regional = colorize([0, 188, 212])
export const rapidEye = colorize([10, 101, 113])
export const placemark = colorize([95, 185, 114])
export const boundary = colorize([72, 126, 253])
export const scouting = colorize([132, 66, 4])

export const greenAero = colorize([5, 206, 124])
export const pictonBlue = colorize(PICTON_BLUE)
export const easternBlue = colorize(EASTERN_BLUE)
export const textOn = ({ color, light = white(), dark = grey() }) => {
    const [r, g, b] = color.match(/[0-9]+/g)
    const o = Math.round((parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000)

    return o > 150 ? dark : light
}

export const pieChartColors = [
    colorize([241, 88, 84]),
    colorize([222, 207, 63]),
    colorize([178, 118, 178]),
    colorize([178, 145, 47]),
    colorize([241, 124, 176]),
    colorize([96, 189, 104]),
    colorize([250, 164, 58]),
    colorize([93, 165, 218]),
    colorize([77, 77, 77]),
    colorize([132, 112, 255]),
    colorize([205, 50, 120]),
    colorize([61, 89, 171]),
    colorize([0, 104, 139]),
    colorize([0, 139, 69]),
    colorize([205, 173, 0]),
    colorize([139, 69, 0]),
    colorize([139, 26, 26]),
    colorize([139, 134, 78]),
    colorize([54, 100, 139]),
    colorize([113, 198, 113]),
    colorize([139, 62, 47]),
    colorize([139, 71, 93]),
    colorize([85, 26, 139]),
    colorize([69, 139, 0]),
]
export default {
    TEXT,
    SOFT_RED,
    SOFT_GREEN,
    SOFT_BLUE,
    MEDIUM_GRAY,
    GREY88,
    MENUITEM_HOVER,
    NOTIFY_BACKGROUND_COLOR,
    NOTIFY_TEXT_COLOR,
    NOTIFY_BORDER_COLOR,
    DISABLE_BUTTON_GRAY,

    halfWhite,
    blue,
    halfBlue,
    yellow,
    dimGray,
    green,
    softGreen,
    purple,
    orange,
    white,
    black,
    grey,

    primary,
    secondary,
    offwhite,
    fuelYellow,
    dark,
    soil,
    lightGrey,
    lightGrey2,
    text,
    text51,
    error,
    red,
    textOn,

    pictonBlue,
    easternBlue,

    assets,
    field,
    managementZone,
    zone,
    cropHealth,
    applied,
    harvest,
    profit,
    hub,
    salesOffice,
    territory,
    farm,
    regional,
    placemark,
    boundary,
    scouting,

    moisture,
    yieldRaster,
    vehicle,
    productivity,
    elevation,
    date,
    percent,
    overlap,
    standard,
    rgbRaster,
    healthRaster,
    fieldVariability,

    greenAero,

    toolbarOrange,
    menuHover,
    menuBackground,
    folderItemBorder,
    folderDetailsColor,
    folderListItemColor,
    pieChartColors,
}