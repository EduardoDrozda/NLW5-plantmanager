import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Alert
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
import { Load } from '../../shared/components/Load';

export default function MyPlants() {

  const [myPlants, setMyPlants] = useState<IPlant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: IPlant) {
    Alert.alert(
      'Remover', 
      `Deseja remover a ${plant.name} com o horário para às ${plant.hour}?`, 
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim 😢',
          onPress: async () => {
            try {
              const plants = await PlantService.getStoragePlants();
              delete plants[plant.identification];
              await PlantService.setStoragePlants(plants);
              setMyPlants((oldData) => oldData.filter((item) => item.identification !== plant.identification));
            } catch (error) {
              Alert.alert('Não foi possível remover! 😢')
            }
          } 
        }
      ]
    );
  }

  useEffect(() => {
    async function loadStorageDate() {
      const plantsStoraged = await PlantService.loadPlant();
      let nextWateredMessage = 'Não há plantas para serem regadas. 😊';

      if(plantsStoraged.length) {
        const nextTime = DateUtils.getDistanceBeetweenDates(
          new Date(plantsStoraged[0].dateTimeNotification),
          new Date()
        );
        nextWateredMessage = `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`;
      }

      setNextWatered(nextWateredMessage);

      setMyPlants(plantsStoraged)
      setLoading(false)
    }

    loadStorageDate();
  }, [])

  if (loading) {
    return (<Load />)
  }

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
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (
            <PlantCardSecondary 
              data={item}
              handleRemove={() => handleRemove(item)}
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