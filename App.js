import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {AuthProvider} from './src/contexts/Auth';
import Router from './src/routes/Router';
// import {default as mapping} from '../mapping.json';

export const baseUrl = 'http://192.168.0.107:3000';

export const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ApplicationProvider>
  </>
);
