import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {ReactNode} from 'react';

const queryClient = new QueryClient();
export default function Providers({children}: {children: ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </QueryClientProvider>
  );
}
