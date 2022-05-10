import { ArrowLeft } from 'phosphor-react-native';
import { TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
import { theme } from '../../theme';
import { styles } from '../Form/styles';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';

interface Props {
    feedbackType: FeedbackType
}

export function Form({ feedbackType }: Props) {

    const feedbacktTypeInfo = feedbackTypes[feedbackType];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <ArrowLeft
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary} />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image
                        source={feedbacktTypeInfo.image}
                        style={styles.image} />
                    <Text style={styles.titleText}>
                        {feedbacktTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                multiline
                style={styles.input}
                placeholder="Algo não está funcionando bem? Conte com detalhes o que está acontecendo."
                placeholderTextColor={theme.colors.text_secondary}
            />

            <View style={styles.footer}>
                <ScreenshotButton onTakeShot={() => { }} onRemoveShot={() => { }} screenshot="" />
            </View>

        </View>
    );
}