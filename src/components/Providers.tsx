import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {ReactNode} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const queryClient = new QueryClient();
export default function Providers({children}: {children: ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
