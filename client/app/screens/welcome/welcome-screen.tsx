import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Screen, Text } from '../../components';
import { color } from '../../theme';
import {
    BUTTON,
    BUTTON_TEXT,
    CONTAINER,
    FOOTER,
    FOOTER_CONTENT,
    FULL,
    TITLE,
    TITLE_WRAPPER,
} from '../../styles/style';
import { AsyncStorage } from '../../utils/storage/async-storage';

const SIGNUP_BUTTON = { ...BUTTON, marginTop: 5 };

export function WelcomeScreen() {
    const navigation = useNavigation();
    const goToSignIn = () => navigation.navigate('signIn');
    const goToSignUp = () => navigation.navigate('signUp');

    useEffect(() => {
        const isSignIn = async () => {
            if (await AsyncStorage.getItem('token')) {
                navigation.navigate('homeNav');
            }
        };
        isSignIn();
    }, []);

    return (
        <View testID="WelcomeScreen" style={FULL}>
            <Screen
                style={CONTAINER}
                preset="scroll"
                backgroundColor={color.transparent}
            >
                <Text style={TITLE_WRAPPER}>
                    <Text style={TITLE} text="Welcome to LoveBox App!" />
                </Text>
            </Screen>
            <SafeAreaView style={FOOTER}>
                <View style={FOOTER_CONTENT}>
                    <Button
                        testID="signIn-button"
                        style={BUTTON}
                        textStyle={BUTTON_TEXT}
                        onPress={goToSignIn}
                        text="SignIn"
                    />
                    <Button
                        testID="signUp-button"
                        style={SIGNUP_BUTTON}
                        textStyle={BUTTON_TEXT}
                        onPress={goToSignUp}
                        text="SignUp"
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
