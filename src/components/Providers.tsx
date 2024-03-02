import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {ReactNode} from 'react';
import {ThemeProvider} from 'react-native-magnus';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Colors from '../constants/Colors';

const queryClient = new QueryClient();
export default function Providers({children}: {children: ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider
          theme={{
            colors: {
              primary: Colors.primary.main,
              primary100: Colors.primary[100],
              light: Colors.light.main,
              light100: Colors.light[100],
              light200: Colors.light[200],
            },
          }}>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
