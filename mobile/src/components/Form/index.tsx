import * as FileSystem from 'expo-file-system';

import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { ArrowLeft } from 'phosphor-react-native';
import { Button } from '../../components/Button';
import { FeedbackType } from '../../components/Widget';
import { ScreenshotButton } from '../../components/ScreenshotButton';
import { api } from '../../libs/api';
import { captureScreen } from 'react-native-view-shot';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { theme } from '../../theme';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props){
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState('')

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then(uri => setScreenshot(uri))
    .catch(err => console.log(err))
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if(isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {
      encoding: 'base64'
    });

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      });
      onFeedbackSent();
    } catch (err) {
      console.log(err)
      setIsSendingFeedback(false);
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onFeedbackCanceled}
        >
          <ArrowLeft 
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image 
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text  style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder='Algo não está funcionado bem? Queremos corrigir, Conte com detalhes o que está acontendo...'
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton 
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}