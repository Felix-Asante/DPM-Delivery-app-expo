import React, {ReactNode, createContext, useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}
const TabsContext = createContext<TabsContextProps>({
  activeTab: '',
  setActiveTab: () => {},
});

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}
export function Tabs({defaultValue, className, children}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <View className={className}>
      <TabsContext.Provider value={{activeTab, setActiveTab}}>
        {children}
      </TabsContext.Provider>
    </View>
  );
}

export function TabsList({children}: {children: ReactNode}) {
  return (
    <View className="flex flex-row justify-between border-b border-light-200">
      {children}
    </View>
  );
}

interface TabsTriggerProps {
  id: string;
  title: string;
}
export function TabsTrigger({id, title}: TabsTriggerProps) {
  const {activeTab, setActiveTab} = useContext(TabsContext);

  return (
    <TouchableOpacity
      className={`px-0 py-2 flex-1 rounded-md ${
        activeTab === id ? 'border-b border-primary' : 'text-black'
      }`}
      onPress={() => setActiveTab(id)}>
      <Text
        className={`font-bold text-center ${
          activeTab === id ? 'text-primary' : 'text-light'
        }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
}
export function TabsContent({value, children}: TabsContentProps) {
  const {activeTab} = useContext(TabsContext);

  if (value === activeTab)
    return <View className="mt-2 h-full">{children}</View>;

  return null;
}
