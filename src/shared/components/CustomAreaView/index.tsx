import React from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { PlatformEnum } from '../../enums';

type Props = {
  style?: any
}

export const CustomAreaView: React.FC<Props> = (props: any) => {

  return (
    <SafeAreaView style={{
      ...styles.container,
      ...props.style
    }}>
      { props.children }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  }
})