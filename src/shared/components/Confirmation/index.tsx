import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { Button } from '../Button';
import { CustomAreaView } from '../CustomAreaView';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

type Props = {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug',
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😁'
}

export function Confirmation(props: Props) {

  const navigation = useNavigation();

  function handleMoveOn() {
    navigation.navigate(props.nextScreen);
  }

  return (
    <CustomAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[props.icon]}
        </Text>

        <Text style={styles.title}>
          {props.title}
        </Text>

        <Text style={styles.subtitle}>
          {props.subtitle}
        </Text>

        <View style={styles.footer}>
          <Button
            title={props.buttonTitle}
            onPress={handleMoveOn}
          />
        </View>
      </View>
    </CustomAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    padding: 15,
    color: colors.heading
  },
  emoji: {
    fontSize: 78
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
})