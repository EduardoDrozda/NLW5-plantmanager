import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  ActivityIndicator
 } from 'react-native';
import { CustomAreaView } from '../../shared/components/CustomAreaView';
import { EnviromentButton } from '../../shared/components/EnviromentButton';
import Header from '../../shared/components/Header';

import colors from '../../shared/styles/colors';
import fonts from '../../shared/styles/fonts';

import { IPlant, IPlantEnviroment } from '../../shared/models';
import { PlantCardPrimary } from '../../shared/components/PlantCardPrimary';

import PlantEnviromentsService from '../../shared/services/plant-enviroments-service';
import PlantService from '../../shared/services/plant-service';
import { Load } from '../../shared/components/Load';
import { useNavigation } from '@react-navigation/core';

export function PlantSelect() {

  const [enviroments, setEnviroments] = useState<IPlantEnviroment[]>([]);
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [filteredPlants, setfilteredPlants] = useState<IPlant[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingFetchMore, setLoadingFetchMore] = useState(false);

  const navigation = useNavigation();

  function handleEnviromentSelected(environment: string) {
    setEnviromentSelected(environment);

    if (environment === 'all') {
      return setfilteredPlants(plants);
    }

    const filteredPlants = plants.filter(plant => 
      plant.environments.includes(environment)
    );

    setfilteredPlants(filteredPlants);
  }

  async function fetchPlants() {
    const { data } = await PlantService.getAll([
      '_sort=name',
      '_order=asc',
      `_page=${page}`,
      '_limit=8'
    ]);
    
    if (!data) {
      return setLoading(true);
    }

    setPlantsByPage(data);
    setLoading(false);
    setLoadingFetchMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingFetchMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function setPlantsByPage(data: IPlant[]): void {
    if(page > 1) {

      setPlants(oldValue => [...oldValue, ...data]);
      setfilteredPlants(oldValue => [...oldValue, ...data]);

      return;
    }

    setPlants(data);
    setfilteredPlants(data);

    return;
  }

  function handlePlantSelect(plant: IPlant) {
    navigation.navigate('PlantSave', { plant });
  }
  
  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await PlantEnviromentsService.getAll();
      
      setEnviroments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }

    fetchEnviroment();
  }, [])

  useEffect(() => {
    fetchPlants();
  }, [])

  if (loading) {
    return (<Load />)
  }

  return (
    <CustomAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList 
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton 
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary 
              data={{ 
                name: item.name, 
                photo: item.photo
              }}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingFetchMore 
            ? <ActivityIndicator color={colors.green} />
            : <></> 
          }
        />
      </View>
    </CustomAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
  contentContainerStyle: {
    
  }
})