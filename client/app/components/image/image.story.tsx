import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Image } from './image';

import { Story, StoryScreen, UseCase } from '../../../storybook/views';
import { ImagePresets } from './image.presets';

const uri = 'https://images.unsplash.com/photo-1516967124798-10656f7dca28';

storiesOf('Image', module)
    .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
    .add('Behavior', () => (
        <Story>
            <UseCase noPad text="default" usage="basic usage">
                <Image uri={uri} />
            </UseCase>
            <UseCase noPad text="Center" usage="Centered image">
                <Image uri={uri} resizeMode={ImagePresets.resizeMode.CENTER} />
            </UseCase>
            <UseCase noPad text="Stretch" usage="stretched image">
                <Image uri={uri} resizeMode={ImagePresets.resizeMode.STRETCH} />
            </UseCase>
            <UseCase noPad text="Cover" usage="Covered image">
                <Image uri={uri} resizeMode={ImagePresets.resizeMode.COVER} />
            </UseCase>
            <UseCase noPad text="Contain" usage="Contained image">
                <Image uri={uri} resizeMode={ImagePresets.resizeMode.CONTAIN} />
            </UseCase>
            <UseCase noPad text="Size" usage="Custom width and height 500x400">
                <Image uri={uri} width={500} height={400} />
            </UseCase>
        </Story>
    ));
