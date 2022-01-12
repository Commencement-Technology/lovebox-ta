import { ViewStyle, TextStyle } from 'react-native';
import { color, spacing, typography } from '../theme';

const FULL: ViewStyle = { flex: 1 };
const CONTAINER: ViewStyle = {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4],
};
const TEXT: TextStyle = {
    color: color.palette.black,
    fontFamily: typography.primary,
};
const BOLD: TextStyle = { fontWeight: 'bold' };

const TITLE_WRAPPER: TextStyle = {
    ...TEXT,
    textAlign: 'center',
    marginTop: spacing[4],
};
const TITLE: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 28,
    lineHeight: 38,
    textAlign: 'center',
};

const BUTTON: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: color.palette.black,
};

const BUTTON_TEXT: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 13,
    letterSpacing: 2,
    color: color.palette.white,
};
const FOOTER: ViewStyle = { marginBottom: 64 };
const FOOTER_CONTENT: ViewStyle = {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[1],
};

const INPUT: ViewStyle = {
    paddingVertical: spacing[7],
};

const TEXTFIELD: TextStyle = {
    color: color.palette.black,
};

const ERROR_TEXT: TextStyle = {
    color: color.palette.angry,
};

const WAITING_TEXT: TextStyle = {
    color: 'green',
    fontSize: 20,
};

const ERROR_VIEW: ViewStyle = {
    alignItems: 'center',
};

const LOGOUT_BUTTON: ViewStyle = {
    width: 100,
    height: 40,
};

export {
    FULL,
    CONTAINER,
    TEXT,
    BOLD,
    TITLE_WRAPPER,
    BUTTON,
    BUTTON_TEXT,
    INPUT,
    FOOTER,
    FOOTER_CONTENT,
    TEXTFIELD,
    TITLE,
    ERROR_TEXT,
    WAITING_TEXT,
    ERROR_VIEW,
    LOGOUT_BUTTON,
};
