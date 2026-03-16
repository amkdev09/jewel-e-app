import { AppText } from '@/components/AppText';
import { APP_COLORS, FONT_FAMILY, FONT_SIZE } from '@/constants/index';
import { FontAwesome6, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const TAB_ICONS = {
  home: 'home',
  categories: 'grid-outline',
  store: 'storefront',
  profile: 'user-circle',
};

function YouTabBadge() {
  return (
    <View style={badgeStyles.badge}>
      <AppText variant="xs" weight="regular" style={badgeStyles.text}>₹500</AppText>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  badge: {
    backgroundColor: APP_COLORS?.pink,
    paddingHorizontal: 1,
    paddingVertical: 0,
    borderRadius: 10,
    minWidth: 30,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  badgeContainer: {
    position: 'relative',
  },
  badgePosition: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    transform: [{ translateX: -22 }],
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        lazy: true,
        headerShown: false,
        tabBarActiveTintColor: APP_COLORS?.pink,
        tabBarInactiveTintColor: '#555555',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#f3f4f6',
        },
        tabBarLabelStyle: {
          fontFamily: FONT_FAMILY?.regular,
          fontSize: FONT_SIZE?.xs,
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
            <Octicons name={TAB_ICONS.home} size={18} color={color} style={{ fill: `${color}10` }} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => (
            <Ionicons name={TAB_ICONS.categories} size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Find Store',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name={TAB_ICONS.store} size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => (
            <View style={badgeStyles.badgeContainer}>
              <FontAwesome6 name={TAB_ICONS.profile} size={18} color={color} />
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
