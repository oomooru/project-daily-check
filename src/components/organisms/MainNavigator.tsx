import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from '../molecules/BottomTabBar';
import * as Icons from '../../../assets/images/index';

import { MainPage } from '../pages/MainPage';
import { CalendarPage } from '../pages/CalendarPage';
import { SummaryPage } from '../pages/SummaryPage';
import { ConfigPage } from '../pages/ConfigPage';

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
      component: SummaryPage,
      icon: "Summary" as keyof typeof Icons,
      label: '요약',
    },
    {
      name: 'Config',
      component: ConfigPage,
      icon: "Config" as keyof typeof Icons,
      label: '설정',
    },
  ];

  return (
    <NavigationContainer>
      <BottomTabBar tabs={tabs} />
    </NavigationContainer>
  );
};

export default MainNavigator;