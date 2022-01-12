import React, { useEffect, useState } from 'react';
import { View, ViewStyle, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Screen, Text } from '../../components';
import { color, spacing } from '../../theme';
import {
    launchImageLibrary,
    ImagePickerResponse,
    ImageLibraryOptions,
} from 'react-native-image-picker';
import { Image } from '../../components/image/image';
import {
    BUTTON,
    BUTTON_TEXT,
    CONTAINER,
    ERROR_TEXT,
    ERROR_VIEW,
    FOOTER,
    FOOTER_CONTENT,
    FULL,
    LOGOUT_BUTTON,
    TITLE,
    TITLE_WRAPPER,
    WAITING_TEXT,
} from '../../styles/style';
import { AsyncStorage } from '../../utils/storage/async-storage';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../services/api/graphql-api';
import { ReactNativeFile } from 'apollo-upload-client';

const MESSAGE_CONTENT: ViewStyle = {
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[1],
};

const IMAGE_VIEW: ViewStyle = {
    marginTop: 20,
};

export function AddMessageScreen() {
    const navigation = useNavigation();
    const [photo, setPhoto] = useState<ImagePickerResponse>();
    const [imageError, setImageError] = useState('');
    const [token, setToken] = useState('');
    const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE, {
        context: {
            headers: {
                authorization: 'Bearer ' + token,
            },
        },
    });

    useEffect(() => {
        (async function () {
            setToken(await AsyncStorage.getItem('token'));
        })();
    }, []);

    function generateFile() {
        return photo
            ? new ReactNativeFile({
                  uri: photo.assets[0].uri,
                  type: photo.assets[0].type,
                  name: photo.assets[0].fileName,
              })
            : null;
    }

    const send = () => {
        if (!photo) {
            setImageError('Please choose an image');
            return;
        }
        const file = generateFile();
        sendMessage({ variables: { image: file } });
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('welcome');
    };

    const chooseImage = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
        };
        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                setImageError('Please choose an image');
            } else if (response.errorCode) {
                setImageError(response.errorMessage);
            } else {
                setPhoto(response);
            }
        });
    };

    return (
        <View testID="AddMessageScreen" style={FULL}>
            <Screen
                style={CONTAINER}
                preset="scroll"
                backgroundColor={color.transparent}
            >
                <Text style={TITLE_WRAPPER}>
                    <Text style={TITLE} text="Spread Love❤️  !" />
                </Text>
                <Button
                    style={LOGOUT_BUTTON}
                    testID="logout-button"
                    onPress={logout}
                    text="Logout"
                />
                <View style={ERROR_VIEW}>
                    {error && <Text text={error.message} style={ERROR_TEXT} />}
                    {imageError !== '' && (
                        <Text text={imageError} style={ERROR_TEXT} />
                    )}
                    {loading && <Text text="Waiting..." style={WAITING_TEXT} />}
                    {data && (
                        <Text
                            text={
                                data.message
                                    ? 'Upload not success, please try again'
                                    : 'Uplaod success'
                            }
                            style={WAITING_TEXT}
                        />
                    )}
                </View>

                <View style={MESSAGE_CONTENT}>
                    <Button
                        testID="take-photo-button"
                        style={BUTTON}
                        textStyle={BUTTON_TEXT}
                        onPress={chooseImage}
                        text="Choose an image"
                    />
                </View>
                {photo && (
                    <View style={IMAGE_VIEW}>
                        <Image uri={photo.assets[0].uri} />
                    </View>
                )}
            </Screen>
            <SafeAreaView style={FOOTER}>
                <View style={FOOTER_CONTENT}>
                    <Button
                        testID="send-button"
                        style={BUTTON}
                        textStyle={BUTTON_TEXT}
                        onPress={send}
                        text="Send"
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
