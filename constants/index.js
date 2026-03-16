import {
    appColors,
    container,
    easing,
    fontFamily,
    fontSize,
    fontWeight,
    iconSizes,
    radius,
    spacing,
    tracking,
    transition,
} from './theme'

export const theme = {
    colors: appColors,
    container,
    motion: {
        easing,
        transition,
    },
    typography: {
        fontFamily,
        fontSize,
        fontWeight,
        tracking,
    },
    spacing,
    radius,
    iconSizes,
}

export {
    appColors as APP_COLORS,
    container as CONTAINER,
    easing as EASING, fontFamily as FONT_FAMILY,
    fontSize as FONT_SIZE,
    fontWeight as FONT_WEIGHT, iconSizes as ICON_SIZES, radius as RADIUS, spacing as SPACING, tracking as TRACKING, transition as TRANSITION
}

