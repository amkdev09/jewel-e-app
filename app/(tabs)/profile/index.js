import AppText from '@/components/ui/appText';
import { SPACING } from '@/constants/index';
import { ScreenLayout } from '@/src/layouts/ScreenLayout';
import { useAuthStore } from '@/src/store/auth.store';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_PURPLE = '#4c1d95';
const GREEN_ACCENT = '#16a34a';
const YELLOW_ACCENT = '#eab308';
const TEXT_DARK = '#1a1a1a';
const TEXT_MUTED = '#6b7280';

const PROFILE_PROGRESS = 0.32;

const ACTION_CARDS = [
  {
    id: 'orders',
    title: 'Orders',
    subtitle: 'Place your order NOW!',
    icon: 'document-text-outline',
    color: GREEN_ACCENT,
  },
  {
    id: 'treasure',
    title: 'Treasure Chest',
    subtitle: 'Start Saving for Jewellery',
    icon: 'gift-outline',
    color: '#ec4899',
  },
  {
    id: 'tryathome',
    title: 'Try At Home',
    subtitle: 'To discover more about je...',
    icon: 'home-outline',
    color: '#a78bfa',
  },
];

const MENU_ITEMS = [
  {
    id: 'scan',
    title: 'Scan at Store',
    subtitle: 'To discover more about jewellery',
    icon: 'barcode-outline',
    route: '/scan',
  },
  {
    id: 'wishlist',
    title: 'Wishlist',
    subtitle: 'Your most loved jewellery',
    icon: 'heart-outline',
    route: '/wishlist',
  },
  {
    id: 'egold',
    title: 'eGold',
    subtitle: 'Now you can invest worry free & redeem anytime',
    icon: null,
    isEGold: true,
    route: '/profile/EGold',
  },
  {
    id: 'addPaymentMethod',
    title: 'Add Bank/UPI Details',
    subtitle: 'Your preferred refund payment method',
    icon: 'cash-outline',
    route: '/profile/add-payment-method',
  },
  {
    id: 'payments',
    title: 'Payments',
    subtitle: 'Payment link generated for you',
    icon: 'cash-outline',
  },
  {
    id: 'scanHistory',
    title: 'Scan History',
    subtitle: 'See the products you liked at store',
    icon: 'barcode-outline',
    route: '/scan',
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [occupationOpen, setOccupationOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const displayName = user?.name?.split(' ')[0] || 'Amar';

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <ScreenLayout noPadding>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header - dark purple */}
        <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
          <View style={styles.headerLeft}>
            <AppText variant="xl" weight="semiBold" style={styles.greeting}>
              Hi, {displayName}
            </AppText>
            <AppText variant="sm" weight="regular" style={styles.profilePrompt}>
              Complete your profile and get 500 xClusive points
            </AppText>
            <View style={styles.progressWrap}>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${PROFILE_PROGRESS * 100}%` }]} />
              </View>
              <AppText variant="sm" weight="semiBold" style={styles.progressLabel}>
                32%
              </AppText>
            </View>
          </View>
          <TouchableOpacity style={styles.completeBtn} activeOpacity={0.8}>
            <AppText variant="sm" weight="semiBold" style={styles.completeBtnText}>
              COMPLETE
            </AppText>
          </TouchableOpacity>
        </View>

        {/* xClusive CLUB banner */}
        <TouchableOpacity style={styles.clubBanner} activeOpacity={0.9}>
          <View style={styles.clubBannerLeft}>
            <AppText variant="lg" weight="semiBold" style={styles.clubTitle}>
              xClusive
            </AppText>
            <View style={styles.clubBadge}>
              <AppText variant="xs" weight="semiBold" style={styles.clubBadgeText}>
                CLUB
              </AppText>
            </View>
          </View>
          <View style={styles.clubBannerRight}>
            <View style={styles.coinIcon}>
              <AppText variant="base" weight="semiBold" style={styles.coinText}>
                0
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Action cards - Orders, Treasure Chest, Try At Home */}
        <View style={styles.actionRow}>
          {ACTION_CARDS.map((card) => (
            <TouchableOpacity key={card.id} style={styles.actionCard} activeOpacity={0.8}>
              <Ionicons name={card.icon} size={28} color={card.color} style={styles.actionIcon} />
              <AppText variant="base" weight="semiBold" style={styles.actionTitle}>
                {card.title}
              </AppText>
              <AppText
                variant="sm"
                weight="regular"
                style={styles.actionSubtitle}
                numberOfLines={2}
              >
                {card.subtitle}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special offers for special roles */}
        <LinearGradient colors={['#ede9fe', '#f5f3ff', '#fff']} style={styles.specialSection}>
          <View style={styles.specialContent}>
            <View style={styles.specialTextWrap}>
              <AppText variant="lg" weight="semiBold" style={styles.specialTitle}>
                Special offers for special roles!
              </AppText>
              <AppText variant="base" weight="regular" style={styles.specialSubtitle}>
                Tell us what you do
              </AppText>
              <TouchableOpacity
                style={styles.occupationDropdown}
                onPress={() => setOccupationOpen(!occupationOpen)}
                activeOpacity={0.8}
              >
                <AppText variant="base" weight="regular" style={styles.occupationPlaceholder}>
                  Occupation
                </AppText>
                <Ionicons name="chevron-down" size={20} color={TEXT_MUTED} />
              </TouchableOpacity>
            </View>
            <View style={styles.giftIconWrap}>
              <Ionicons name="gift" size={48} color="#7c3aed" />
            </View>
          </View>
        </LinearGradient>

        {/* List items - Scan at Store, Wishlist, eGold */}
        <View style={styles.listSection}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              activeOpacity={0.7}
              onPress={() => {
                if (item.route) router.push(item.route);
              }}
            >
              <View style={styles.listItemIconWrap}>
                {item.isEGold ? (
                  <View style={styles.egoldIcon}>
                    <AppText variant="xs" weight="semiBold" style={styles.egoldIconText}>
                      eGold
                    </AppText>
                  </View>
                ) : (
                  <Ionicons name={item.icon} size={24} color="#7c3aed" />
                )}
              </View>
              <View style={styles.listItemText}>
                <AppText variant="base" weight="semiBold" style={styles.listItemTitle}>
                  {item.title}
                </AppText>
                <AppText
                  variant="sm"
                  weight="regular"
                  style={styles.listItemSubtitle}
                  numberOfLines={2}
                >
                  {item.subtitle}
                </AppText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={TEXT_MUTED} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <AppText variant="base" weight="semiBold" style={styles.logoutText}>
            Sign out
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: SPACING.xxl,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: HEADER_PURPLE,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: SPACING.xs,
  },
  profilePrompt: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.95)',
    marginBottom: SPACING.sm,
  },
  progressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  progressBg: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: GREEN_ACCENT,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    minWidth: 28,
  },
  completeBtn: {
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: SPACING.base,
    marginLeft: SPACING.sm,
  },
  completeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  clubBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3b0764',
    marginHorizontal: SPACING.base,
    marginTop: -SPACING.md,
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  clubBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  clubTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  clubBadge: {
    backgroundColor: YELLOW_ACCENT,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  clubBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  clubBannerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  coinIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(234,179,8,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    gap: SPACING.sm,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    marginBottom: SPACING.sm,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 11,
    color: TEXT_MUTED,
  },
  specialSection: {
    marginHorizontal: SPACING.base,
    marginTop: SPACING.lg,
    borderRadius: 12,
    padding: SPACING.base,
    overflow: 'hidden',
  },
  specialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  specialTextWrap: {
    flex: 1,
  },
  specialTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5b21b6',
    marginBottom: 4,
  },
  specialSubtitle: {
    fontSize: 14,
    color: '#7c3aed',
    marginBottom: SPACING.sm,
  },
  occupationDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 12,
    paddingHorizontal: SPACING.base,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9e5ff',
  },
  occupationPlaceholder: {
    fontSize: 14,
    color: TEXT_MUTED,
  },
  giftIconWrap: {
    marginLeft: SPACING.base,
  },
  listSection: {
    marginTop: SPACING.xl,
    marginHorizontal: SPACING.base,
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.base,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  listItemIconWrap: {
    width: 40,
    alignItems: 'center',
  },
  listItemText: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 2,
  },
  listItemSubtitle: {
    fontSize: 13,
    color: TEXT_MUTED,
  },
  egoldIcon: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  egoldIconText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7c3aed',
  },
  logoutBtn: {
    marginTop: SPACING.xl,
    marginHorizontal: SPACING.base,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_DARK,
  },
});
