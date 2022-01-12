import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, Screen, Text, TextField } from '../../components';
import { color } from '../../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../services/api/graphql-api';
import _ from 'lodash';
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

const validationSchema: yup.AnyObjectSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    username: yup
        .string()
        .min(2, ({ min }) => `Username must contain at least ${min} characters`)
        .required('Username is required'),
});

export function SignUpScreen() {
    const navigation = useNavigation();
    const goBack = () => navigation.goBack();
    const [signup, { data, loading, error }] = useMutation(REGISTER);

    if (data && data.register) {
        navigation.navigate('signIn');
    }

    return (
        <View testID="SignUp" style={FULL}>
            <Screen
                style={CONTAINER}
                preset="scroll"
                backgroundColor={color.transparent}
            >
                <Header leftIcon="back" onLeftPress={goBack} />
                <Text style={TITLE_WRAPPER}>
                    <Text style={TITLE} text="New Account!" />
                </Text>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{ email: '', password: '', username: '' }}
                    onSubmit={values =>
                        signup({
                            variables: {
                                email: values.email,
                                username: values.username,
                                password: values.password,
                            },
                        })
                    }
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>
                            <View style={ERROR_VIEW}>
                                {!_.isEmpty(errors) &&
                                    Object.entries(errors).map(err => (
                                        <Text
                                            text={err[1].toString()}
                                            style={ERROR_TEXT}
                                            key={err[0]}
                                        />
                                    ))}
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
                                    placeholder="Username"
                                    onChangeText={handleChange('username')}
                                    inputStyle={TEXTFIELD}
                                />
                                <TextField
                                    placeholder="Email"
                                    onChangeText={handleChange('email')}
                                    inputStyle={TEXTFIELD}
                                />
                                <TextField
                                    placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    inputStyle={TEXTFIELD}
                                />
                            </View>
                            <SafeAreaView style={FOOTER}>
                                <View style={FOOTER_CONTENT}>
                                    <Button
                                        testID="signup-button"
                                        style={BUTTON}
                                        textStyle={BUTTON_TEXT}
                                        onPress={handleSubmit}
                                        text="SignUp"
                                        disabled={loading}
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
