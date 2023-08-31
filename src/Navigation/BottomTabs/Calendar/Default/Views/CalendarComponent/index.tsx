import React from 'react';
import * as UI from 'src/Components';
import {Content} from './Views/Content';
import {Header} from './Views/Header';

export const CalendarComponent = () => {
  return (
    <UI.View>
      <Header />
      <UI.HSpacer size={15} />
      <Content />
      <UI.HSpacer size={15} />
    </UI.View>
  );
};
