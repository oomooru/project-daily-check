import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Icons from '../../../assets/images/index';
import SvgIcon from '../atoms/SvgIcon';
import { colors } from '../../constants/Colors';

const Tab = createBottomTabNavigator();

interface TabBarProps {
  tabs: Array<{
    name: string;
    component: React.ComponentType<any>;
    icon: keyof typeof Icons;
    label: string;
  }>;
}

const BottomTabBar: React.FC<TabBarProps> = ({ tabs }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 3,
          borderColor: colors.primary,
          elevation: 0,
          height: 83,
          paddingVertical: 16
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ marginTop: 16 }}>
                <SvgIcon
                  name={tab.icon}
                  width={32}
                  height={32}
                  color={focused ? colors.primary : colors.secondary}
                  strokeWidth={focused ? 3 : 2}
                />
              </View>
          ),
            tabBarLabel: () => null,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabBar;