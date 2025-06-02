import React, { useEffect, useState } from 'react';
import { TodoList } from '../organisms/TodoList';
import { TodoComposer } from '../organisms/TodoComposer';
import SvgIcon from '../atoms/SvgIcon';
import { TodoData } from '../../interface/TodoInterface';
import TodoManager from '../../manager/TodoManager';
import { ConfigTemplate } from '../templates/ConfigTemplate';

export const ConfigPage = () => {

  return (
    <ConfigTemplate
      header={
        <SvgIcon name="Logo" width={184} height={33} />
      }
      content={
        <>
          
        </>
      }
    />
  );
};
