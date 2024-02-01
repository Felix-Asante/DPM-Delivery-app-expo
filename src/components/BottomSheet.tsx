import GorhomBottomSheet, {
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {ReactNode, useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';

import {mergeClassNames} from '../utils/helpers';

interface BottomSheetProps {
  snapPoints: string[];
  open: boolean;
  children: ReactNode;
  footerComponent?: React.FC<BottomSheetFooterProps>;
  onClose: () => void;
}
export default function BottomSheet(props: BottomSheetProps) {
  const {snapPoints, open, onClose, footerComponent, children} = props;
  const bottomSheetModalRef = useRef<GorhomBottomSheet>(null);

  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.snapToIndex(1);
  }, []);
  const closeSheet = useCallback(() => {
    onClose();
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    if (open) {
      openSheet();
    } else {
      closeSheet();
    }
    // openSheet();
  }, [open]);

  return (
    <GorhomBottomSheet
      ref={bottomSheetModalRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      // onDismiss={closeSheet}
      footerComponent={footerComponent}
      // backdropComponent={backdropProps => (
      //   <View className="bg-dark/10 w-full flex-1" {...backdropProps} />
      // )}
    >
      <BottomSheetScrollView>{children}</BottomSheetScrollView>
    </GorhomBottomSheet>
  );
}
