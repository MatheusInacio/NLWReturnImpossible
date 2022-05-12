import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import successImg from '../../assets/success.png';

import { styles } from './styles';

interface Props {
    onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
    return (
        <View style={styles.container}>
            <Image
                source={successImg}
                style={styles.image}>
            </Image>
            <Text
                style={styles.title}>
                Agradecemos o Feedback
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={onSendAnotherFeedback}>
                <Text
                    style={styles.buttonTitle}>
                    Quero envider outro
                </Text>
            </TouchableOpacity>
        </View>
    );
}