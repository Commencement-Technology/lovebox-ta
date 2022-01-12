import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, Screen, Text, TextField } from '../../components';
import { color } from '../../theme';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../services/api/graphql-api';
import {
    BUTTON,
    BUTTON_TEXT,
    CONTAINER,
    ERROR_TEXT,
    ERROR_VIEW,
    FOOTER,
    FOOTER_CONTENT,
    FULL,
    INPUT,
    TEXTFIELD,
    TITLE,
    TITLE_WRAPPER,
    WAITING_TEXT,
} from '../../styles/style';
import { AsyncStorage } from '../../utils/storage/async-storage';

export function SignInScreen() {
    const navigation = useNavigation();
    const goToHome = () => navigation.navigate('homeNav');
    const goBack = () => navigation.goBack();
    const [signIn, { data, loading, error }] = useMutation(LOGIN);

    if (data && data.login) {
        AsyncStorage.setItem('token', data.login).then();
        goToHome();
    }
    return (
        <View testID="SignIn" style={FULL}>
            <Screen
                style={CONTAINER}
                preset="scroll"
                backgroundColor={color.transparent}
            >
                <Header leftIcon="back" onLeftPress={goBack} />
                <Text style={TITLE_WRAPPER}>
                    <Text style={TITLE} text="Please signIn!" />
                </Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values =>
                        signIn({
                            variables: {
                                email: values.email,
                                password: values.password,
                            },
                        })
                    }
                >
                    {({ handleChange, handleSubmit }) => (
                        <>
                            <View style={ERROR_VIEW}>
                                {error && (
                                    <Text
                                        text={error.message}
                                        style={ERROR_TEXT}
                                    />
                                )}
                                {loading && (
                                    <Text
                                        text="Waiting..."
                                        style={WAITING_TEXT}
                                    />
                                )}
                            </View>
                            <View style={INPUT}>
                                <TextField
                                    placeholder="email"
                                    inputStyle={TEXTFIELD}
                                    onChangeText={handleChange('email')}
                                />
                                <TextField
                                    placeholder="password"
                                    inputStyle={TEXTFIELD}
                                    onChangeText={handleChange('password')}
                                />
                            </View>
                            <SafeAreaView style={FOOTER}>
                                <View style={FOOTER_CONTENT}>
                                    <Button
                                        testID="signin-button"
                                        style={BUTTON}
                                        textStyle={BUTTON_TEXT}
                                        onPress={handleSubmit}
                                        text="SignIn"
                                    />
                                </View>
                            </SafeAreaView>
                        </>
                    )}
                </Formik>
            </Screen>
        </View>
    );
}
