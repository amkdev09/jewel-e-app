import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const TAB_PURPLE = '#7c3aed';
const TAB_ICONS = {
  home: 'home',
  categories: 'grid',
  treasure: 'diamond',
  store: 'location',
  profile: 'person',
};

function YouTabBadge() {
  return (
    <View style={badgeStyles.badge}>
      <Text style={badgeStyles.text}>₹500</Text>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  badge: {
    backgroundColor: TAB_PURPLE,
    paddingHorizontal: 1,
    paddingVertical: 0,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  text: {
    fontSize: 8,
    fontWeight: '700',
    color: '#fff',
  },
  badgePosition: {
    position: 'absolute',
    bottom: -4,
    right: '50%',
    transform: [{ translateX: '50%' }],
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        lazy: true,
        headerShown: false,
        tabBarActiveTintColor: TAB_PURPLE,
        tabBarInactiveTintColor: '#9ca6af',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#f3f4f6',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name={TAB_ICONS.home} size={16} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => (
            <Ionicons name={TAB_ICONS.categories} size={16} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="treasure"
        options={{
          title: 'Treasure Chest',
          tabBarIcon: ({ color }) => (
            <Ionicons name={TAB_ICONS.treasure} size={16} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Find Store',
          tabBarIcon: ({ color }) => (
            <Ionicons name={TAB_ICONS.store} size={16} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => (
            <View>
              <Ionicons name={TAB_ICONS.profile} size={16} color={color} />
              <View style={badgeStyles.badgePosition}>
                <YouTabBadge />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
