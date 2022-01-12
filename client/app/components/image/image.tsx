import React from 'react';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { ImagePresets } from './image.presets';
import { ImageProps } from './image.props';

export function Image(props: ImageProps) {
    const STYLE: ImageStyle = {
        width: props.width ?? 300,
        height: props.height ?? 200,
    };
    const imageStyles = [STYLE, props.style];
    return (
        <FastImage
            style={imageStyles}
            source={{
                uri: props.uri,
            }}
            resizeMode={props.resizeMode ?? ImagePresets.resizeMode.CONTAIN}
        />
    );
}
