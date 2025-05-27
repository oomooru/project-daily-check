import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from '../molecules/BottomTabBar';
import * as Icons from '../../../assets/images/index';

import { MainPage } from '../pages/MainPage';
import { CalendarPage } from '../pages/CalendarPage';

const MainNavigator = () => {
  const tabs = [
    {
      name: 'Main',
      component: MainPage,
      icon: "CheckSquare" as keyof typeof Icons,
      label: '홈',
    },
    {
      name: 'Calendar',
      component: CalendarPage,
      icon: "Calendar" as keyof typeof Icons,
      label: '달력',
    },
    {
      name: 'Summary',
      component: MainPage,
      icon: "Edit" as keyof typeof Icons,
      label: '요약',
    },
  ];

  return (
    <NavigationContainer>
      <BottomTabBar tabs={tabs} />
    </NavigationContainer>
  );
};

export default MainNavigator;