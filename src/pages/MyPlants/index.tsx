import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
 } from "react-native";
import { CustomAreaView } from '../../shared/components/CustomAreaView';

import Header from '../../shared/components/Header';
import colors from '../../shared/styles/colors';

import waterdrop from '../../assets/waterdrop.png';
import { IPlant } from '../../shared/models';

import PlantService from '../../shared/services/plant-service';
import { DateUtils } from '../../shared/utils';
import fonts from '../../shared/styles/fonts';
import { PlantCardSecondary } from '../../shared/components/PlantCardSecondary';

export default function MyPlants() {

  const [myPlants, setMyPlants] = useState<IPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageDate() {
      const plantsStoraged = await PlantService.loadPlant();

      const nextTime = DateUtils.getDistanceBeetweenDates(
        new Date(plantsStoraged[0].dateTimeNotification!),
        new Date()
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
      );

      setMyPlants(plantsStoraged)
      setLoading(false)
    }

    loadStorageDate();
  }, [])

  return (
    <CustomAreaView style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image 
          source={waterdrop} 
          style={styles.spotlightImage}
        />

        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>
        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item: { name, photo, hour } }) => (
            <PlantCardSecondary 
              data={{
                name,
                photo,
                hour: String(hour)
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </CustomAreaView>
  )   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
});