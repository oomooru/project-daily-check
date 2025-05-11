import React from 'react';
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
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          paddingBottom: 16,
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
              <SvgIcon
                name={tab.icon}
                width={32}
                height={32}
                color={colors.primary}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabBar;