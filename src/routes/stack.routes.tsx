import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';

import colors from '../shared/styles/colors';
import { PlantSelect } from '../pages/PlantSelect';

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
      name="Confirmation"
      component={Confirmation}
    />

    <stackRoutes.Screen
      name="PlantSelect"
      component={PlantSelect}
    />

  </stackRoutes.Navigator>
);

export default AppRoutes;