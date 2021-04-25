import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import StorageService from '../../services/storage-service';

import userImg from '../../../assets/user.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { StorageKeyEnum } from '../../enums';

export default function Header() {

  const [userName, setUsername] = useState<string>();

  useLayoutEffect(() => {
    async function loadStorageUsername() {
      const user = await StorageService.getItem(StorageKeyEnum.USER);
      setUsername(user || '');
    } 

    loadStorageUsername();
  }, [userName]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image source={userImg} style={styles.image}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  }
});