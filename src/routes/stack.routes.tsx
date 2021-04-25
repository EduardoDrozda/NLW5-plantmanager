import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';

import colors from '../shared/styles/colors';
import PlantSave from '../pages/PlantSave';
import { UserConfirmation } from '../pages/UserConfirmation';
import { PlantConfirmation } from '../pages/PlantConfirmation';
import MyPlants from '../pages/MyPlants';
import AuthRoutes from './tab.routes';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    initialRouteName="Welcome"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
  >

    <stackRoutes.Screen
      name="Welcome"
      component={Welcome}
    />

    <stackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />

    <stackRoutes.Screen
      name="UserConfirmation"
      component={UserConfirmation}
    />

    <stackRoutes.Screen
      name="PlantSelect"
      component={AuthRoutes}
    />

    <stackRoutes.Screen
      name="PlantSave"
      component={PlantSave}
    />

    <stackRoutes.Screen
      name="PlantConfirmation"
      component={PlantConfirmation}
    />

    <stackRoutes.Screen
      name="MyPlants"
      component={AuthRoutes}
    />

  </stackRoutes.Navigator>
);

export default AppRoutes;