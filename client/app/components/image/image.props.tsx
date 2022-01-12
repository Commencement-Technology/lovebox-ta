import { StyleProp } from 'react-native';
import { ImageStyle, ResizeMode } from 'react-native-fast-image';

export interface ImageProps {
    width?: number;
    height?: number;
    uri: string;
    resizeMode?: ResizeMode;
    style?: StyleProp<ImageStyle>;
}
