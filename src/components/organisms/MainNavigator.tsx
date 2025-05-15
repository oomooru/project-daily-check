import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from '../molecules/BottomTabBar';
import * as Icons from '../../../assets/images/index';

import { MainPage } from '../pages/MainPage';

const MainNavigator = () => {
  const tabs = [
    {
      name: 'Main',
      component: MainPage,
      icon: "CheckSquare" as keyof typeof Icons,
      label: '홈',
    },
    {
      name: 'Edit',
      component: MainPage,
      icon: "Edit" as keyof typeof Icons,
      label: '수정',
    },
    {
      name: 'Calendar',
      component: MainPage,
      icon: "Calendar" as keyof typeof Icons,
      label: '달력',
    },
  ];

  return (
    <NavigationContainer>
      <BottomTabBar tabs={tabs} />
    </NavigationContainer>
  );
};

export default MainNavigator;