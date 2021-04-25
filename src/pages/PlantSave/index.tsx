import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';

import { SvgFromUri } from 'react-native-svg';

import waterdrop from '../../assets/waterdrop.png';
import { Button } from '../../shared/components/Button';
import colors from '../../shared/styles/colors';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import fonts from '../../shared/styles/fonts';
import { useNavigation, useRoute } from '@react-navigation/core';
import DataTimePicker, { Event } from  '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { IPlant } from '../../shared/models';
import { PlatformEnum } from '../../shared/enums';
import PlantService from '../../shared/services/plant-service';

type Params = {
  plant: IPlant
}

export default function PlantSave() {

  const [selectedDateTime, setSelectedDatetime] = useState(new Date());
  const [showDatePicker, setShowDatePickeer] = useState(Platform.OS === PlatformEnum.IOS);

  const route = useRoute();
  const { plant } = route.params as Params;
  const navigation = useNavigation();

  function handleChangeTIme(_: Event, datetime: Date | undefined) {
    if(Platform.OS === PlatformEnum.ANDROID) {
      setShowDatePickeer(oldState => !oldState);
    }

    if(datetime) {
      setSelectedDatetime(datetime);
    }
  }

  function handleOpenDatetimePickerForAndroid() {
    setShowDatePickeer(oldState => !oldState);
  }

  async function handleSave() {
    try {
      await PlantService.savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('PlantConfirmation');
    } catch {
      Alert.alert('Não foi possível salvar. 😭')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri 
          uri={plant.photo}
          height={150}
          width={150}
        />

        <Text style={styles.plantName}>
          { plant.name }
        </Text>
        <Text style={styles.plantAbout}>
          { plant.about }
        </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image 
            source={waterdrop}
            style={styles.tipImage}
          />
          <Text style={styles.tipText}>
            { plant.water_tips }
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DataTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTIme}
          />
        )}

        {
          Platform.OS === PlatformEnum.ANDROID && (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={handleOpenDatetimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )
        }

        <Button
          title="Cadastrar planta"
          onPress={handleSave}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    borderRadius: 10,
    padding: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }
});