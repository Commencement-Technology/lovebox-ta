import React, { useEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { Button, Screen, Text } from '../../components';
import { color } from '../../theme';
import { Image } from '../../components/image/image';
import {
    CONTAINER,
    ERROR_TEXT,
    ERROR_VIEW,
    FULL,
    LOGOUT_BUTTON,
    TITLE,
    TITLE_WRAPPER,
    WAITING_TEXT,
} from '../../styles/style';
import { AsyncStorage } from '../../utils/storage/async-storage';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../../services/api/graphql-api';

const IMAGE_VIEW: ViewStyle = {
    marginTop: 20,
};

export function MessagesScreen() {
    const [token, setToken] = useState('');
    const { loading, error, data, refetch } = useQuery(GET_MESSAGES, {
        pollInterval: 0,
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

    return (
        <View testID="MessagesScreen" style={FULL}>
            <Screen
                style={CONTAINER}
                preset="scroll"
                backgroundColor={color.transparent}
            >
                <Text style={TITLE_WRAPPER}>
                    <Text style={TITLE} text="Your Love❤️ Messages !" />
                </Text>
                <Button
                    style={LOGOUT_BUTTON}
                    testID="refresg-button"
                    onPress={() => refetch()}
                    text="Refresh"
                />
                <View style={ERROR_VIEW}>
                    {error && <Text text={error.message} style={ERROR_TEXT} />}
                    {loading && <Text text="Waiting..." style={WAITING_TEXT} />}
                </View>

                {data &&
                    data.messages.map(message => (
                        <View style={IMAGE_VIEW} key={message.id}>
                            <Image uri={message.photoUrl} />
                        </View>
                    ))}
            </Screen>
        </View>
    );
}
