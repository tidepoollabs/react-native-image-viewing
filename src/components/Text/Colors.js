import { Appearance } from 'react-native';

export default {
    gray: '#474C6A',
    gray1: '#333333',
    gray2: '#E3E3E3',
    blue: '#DADDF7',
    darkBlue: '#11142C',
    mainBlue: '#0B99DE',
    primary: '#EA2139',
    white: 'white',
    lightBlue: '#EBF3FD',
    quizColor: '#009E22',
    lessonColor: '#027CC0',
    whiteOpacity: 'rgba(255,255,255,0.1)',
    whiteOpacity1: 'rgba(255,255,255,0.05)',
    whiteOpacity2: 'rgba(255, 255, 255, 0.4);',
    courseDescription: '#C7CAD6',
    yellow: '#F4A55E',

    textPrimary: '#000000',
    textDarkPrimary: '#ffffff',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    textDarkSecondary: 'rgba(255, 255, 255, 0.6)',
    textTertiary: 'rgba(0, 0, 0, 0.4)',
    textDarkTertiary: 'rgba(255, 255, 255, 0.4)',
    secondaryBg: 'rgba(219, 220, 223, 0.6)',

    lineSeperator: 'rgba(0, 0, 0, 0.2)',

    lightGreen: '#E5F5E9',
    lightRed: '#FDE9EB',
    black: '#000000',
};

export const isDark = Appearance.getColorScheme() === 'dark';
