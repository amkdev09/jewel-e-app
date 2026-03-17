import { AppText } from '@/components/ui/appText';
import { SPACING } from '@/constants/index';
import { ScreenLayout } from '@/src/layouts/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PURPLE_DARK = '#5b21b6';
const PURPLE_LIGHT = '#a78bfa';
const PURPLE_MUTED = '#c4b5fd';
const PEACH_BG = '#fef3e8';
const LAVENDER_BG = '#ede9fe';
const ORANGE_BORDER = '#ea580c';
const ORANGE_ACCENT = '#c2410c';
const TEXT_DARK = '#1a1a1a';
const TEXT_MUTED = '#6b7280';
const GREEN_WHATSAPP = '#25d366';
const CARD_SHADOW = '#e5e7eb';

const STORES = [
  {
    id: '1',
    name: 'Ghumar Mandi',
    rating: '5.0',
    reviewCount: '1091',
    distance: '8km',
    address:
      'B-19-210/1, SCO 1, First Floor, Rani Jhansi Road, Ghumar Mandi, Ludhiana, Ludhiana - 141001',
    phone: '7888897671',
    hours: '11:00 AM - 08:00 PM',
  },
  {
    id: '2',
    name: 'Malhar Road',
    rating: '5.0',
    reviewCount: '3870',
    distance: '8km',
    address: 'Malhar Road, Ludhiana - 141001',
    phone: '7888897672',
    hours: '11:00 AM - 08:00 PM',
  },
  {
    id: '3',
    name: 'Model Town',
    rating: '5.0',
    reviewCount: '2156',
    distance: '12km',
    address: 'Model Town, Ludhiana - 141002',
    phone: '7888897673',
    hours: '10:00 AM - 09:00 PM',
  },
];

const DEFAULT_PINCODE = '142027';

export default function StoreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [pincode] = useState(DEFAULT_PINCODE);
  const storeCount = STORES.length;

  const openMaps = (store) => {
    const encoded = encodeURIComponent(store.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
    Linking.openURL(url).catch(() => {});
  };

  const openPhone = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(() => {});
  };

  const openWhatsApp = (phone) => {
    const msg = encodeURIComponent('Hi, I would like to know more about your store.');
    Linking.openURL(`https://wa.me/91${phone}?text=${msg}`).catch(() => {});
  };

  const openGoogleReviews = (store) => {
    // Placeholder: could open store's Google place URL
    Linking.openURL('https://www.google.com/search').catch(() => {});
  };

  return (
    <ScreenLayout noPadding style={styles.screen}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={PURPLE_DARK} />
        </TouchableOpacity>
        <AppText variant="lg" weight="semiBold" style={styles.headerTitle}>
          FIND A STORE
        </AppText>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Pincode section - peach */}
        <View style={styles.pincodeSection}>
          <View style={styles.storeIconWrap}>
            <Ionicons name="storefront-outline" size={48} color={ORANGE_ACCENT} />
          </View>
          <AppText variant="xl" weight="semiBold" style={styles.storesInPincode}>
            Stores in {pincode}
          </AppText>
          <View style={styles.pincodeCard}>
            <Ionicons name="locate" size={22} color={PURPLE_DARK} />
            <AppText variant="lg" weight="semiBold" style={styles.pincodeValue}>
              {pincode}
            </AppText>
            <TouchableOpacity activeOpacity={0.7} style={styles.changePincodeBtn}>
              <AppText variant="sm" weight="semiBold" style={styles.changePincodeText}>
                Change Pincode / City
              </AppText>
            </TouchableOpacity>
          </View>
          <AppText variant="sm" weight="regular" style={styles.pincodeDesc}>
            We have {storeCount} stores in this locality, scroll down to view the stores and browse
            the designs available.
          </AppText>
        </View>

        {/* Store list header - lavender */}
        <View style={styles.listHeader}>
          <AppText variant="base" weight="regular" style={styles.listHeaderText}>
            Showing {storeCount} Stores in{' '}
          </AppText>
          <AppText variant="base" weight="semiBold" style={styles.listHeaderPincode}>
            {pincode}
          </AppText>
        </View>

        {/* Store cards */}
        {STORES.map((store) => (
          <View key={store.id} style={styles.storeCard}>
            <View style={styles.storeCardTop}>
              <View style={styles.storeNameBlock}>
                <AppText variant="base" weight="semiBold" style={styles.storeName}>
                  {store.name}
                </AppText>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#eab308" />
                  <AppText variant="sm" weight="regular" style={styles.ratingText}>
                    {store.rating}
                  </AppText>
                  <TouchableOpacity onPress={() => openGoogleReviews(store)} activeOpacity={0.7}>
                    <AppText variant="xs" weight="semiBold" style={styles.reviewsLink}>
                      {store.reviewCount} Google Reviews
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => openMaps(store)}
                activeOpacity={0.7}
              >
                <Ionicons name="paper-plane" size={16} color={PURPLE_DARK} />
                <AppText variant="sm" weight="semiBold" style={styles.navBtnText}>
                  {store.distance}
                </AppText>
              </TouchableOpacity>
            </View>

            <AppText variant="sm" weight="regular" style={styles.storeAddress}>
              {store.address}
            </AppText>

            <View style={styles.contactRow}>
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => openPhone(store.phone)}
                activeOpacity={0.7}
              >
                <Ionicons name="call" size={18} color={PURPLE_DARK} />
                <AppText variant="sm" weight="regular" style={styles.phoneText}>
                  {store.phone}
                </AppText>
              </TouchableOpacity>
              <View style={styles.contactDivider} />
              <View style={styles.contactItem}>
                <Ionicons name="time-outline" size={18} color={TEXT_MUTED} />
                <AppText variant="sm" weight="regular" style={styles.hoursText}>
                  {store.hours}
                </AppText>
              </View>
            </View>

            <TouchableOpacity style={styles.viewDetailsBtn} activeOpacity={0.7}>
              <AppText variant="sm" weight="semiBold" style={styles.viewDetailsText}>
                VIEW STORE DETAILS
              </AppText>
            </TouchableOpacity>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.whatsappBtn}
                onPress={() => openWhatsApp(store.phone)}
                activeOpacity={0.7}
              >
                <Ionicons name="logo-whatsapp" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bookVisitWrap} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#ea580c', '#c2410c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.bookVisitBtn}
                >
                  <AppText variant="sm" weight="semiBold" style={styles.bookVisitText}>
                    BOOK A VISIT
                  </AppText>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewDesignsBtn} activeOpacity={0.7}>
                <AppText variant="sm" weight="semiBold" style={styles.viewDesignsText}>
                  VIEW ALL DESIGNS
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.sm,
    backgroundColor: '#fff',
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    letterSpacing: 0.5,
  },
  headerRight: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  pincodeSection: {
    backgroundColor: PEACH_BG,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  storeIconWrap: {
    marginBottom: SPACING.sm,
  },
  storesInPincode: {
    fontSize: 22,
    fontWeight: '700',
    color: PURPLE_DARK,
    marginBottom: SPACING.base,
  },
  pincodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: ORANGE_BORDER,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  pincodeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: PURPLE_DARK,
    flex: 1,
  },
  changePincodeBtn: {
    paddingVertical: 4,
  },
  changePincodeText: {
    fontSize: 14,
    fontWeight: '600',
    color: ORANGE_ACCENT,
  },
  pincodeDesc: {
    fontSize: 13,
    color: TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 20,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: LAVENDER_BG,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.base,
    gap: 2,
  },
  listHeaderText: {
    fontSize: 15,
    color: PURPLE_DARK,
    fontWeight: '500',
  },
  listHeaderPincode: {
    fontSize: 15,
    color: PURPLE_DARK,
    fontWeight: '700',
  },
  storeCard: {
    backgroundColor: '#fff',
    marginHorizontal: SPACING.base,
    marginTop: SPACING.base,
    padding: SPACING.base,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: CARD_SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  storeCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  storeNameBlock: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '700',
    color: PURPLE_DARK,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: TEXT_MUTED,
    fontWeight: '500',
  },
  reviewsLink: {
    fontSize: 13,
    color: PURPLE_DARK,
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PURPLE_MUTED,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  navBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE_DARK,
  },
  storeAddress: {
    fontSize: 13,
    color: TEXT_MUTED,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.base,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  contactDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#d1d5db',
    marginHorizontal: SPACING.xs,
  },
  phoneText: {
    fontSize: 14,
    color: PURPLE_DARK,
    fontWeight: '500',
  },
  hoursText: {
    fontSize: 13,
    color: TEXT_MUTED,
  },
  viewDetailsBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: PURPLE_MUTED,
    backgroundColor: '#fff',
    marginBottom: SPACING.base,
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '700',
    color: PURPLE_DARK,
    letterSpacing: 0.5,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  whatsappBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: GREEN_WHATSAPP,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookVisitWrap: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookVisitBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookVisitText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  viewDesignsBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: PURPLE_MUTED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDesignsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
});
