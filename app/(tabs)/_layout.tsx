import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen 
        name="index"
        options={{
          title: 'Signup', href: null,
          headerShow: false
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }:any) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }:any) => <IconSymbol size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          title: 'Test Screen',
          tabBarIcon: ({ color }:any) => <IconSymbol size={28} name="book" color={color} />,
        }}
      />
    </Tabs>
  );
}
