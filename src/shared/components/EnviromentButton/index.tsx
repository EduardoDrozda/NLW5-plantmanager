import React from 'react';

import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

type Props = { 
  title: string;
  active?: boolean;
} & RectButtonProps;

export function EnviromentButton ({
  title,
  active = false,
  ...rest
}: Props) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text 
        style={[
          styles.text,
          active && styles.textActive
        ]}>
        { title }
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
});