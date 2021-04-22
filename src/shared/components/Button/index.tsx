import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import fonts from '../../styles/fonts'
import colors from '../../styles/colors'

type Props = {
  title: string;
} & TouchableOpacityProps;

export function Button({
  title,
  ...rest }: Props
) {

  return (
    <TouchableOpacity
      style={styles.container}
      {...rest}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
    textAlign: 'center'
  }
})