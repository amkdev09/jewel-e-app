/**
 * Empty shopping bag screen – matches CaratLane-style design.
 * Shown when bag icon on home is tapped.
 */
import { AppText } from '@/components/AppText';
import { SPACING } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const H_PAD = SPACING.base;

// Design colors from spec
const PRIMARY_PURPLE = '#6A1B9A';
const LIGHTER_PURPLE = '#E0D8ED';
const SCREEN_BG = '#FFFFFF';
const BANNER_BG = '#E8F5E9';
const BANNER_TEXT = '#388E3C';
const DARK_TEXT = '#212121';
const SECONDARY_TEXT = '#757575';
// Illustration colors
const ILLUST_PINK = '#F48FB1';
const ILLUST_PURPLE = '#9C27B0';
const ILLUST_BLUE = '#E0F2F7';
const ILLUST_BOX = '#D7CCC8';

const ASSURANCE_ITEMS = [
  { id: '1', icon: 'checkmark-circle', label: '100%\nCertified' },
  { id: '2', icon: 'sync', label: 'Lifetime\nExchange' },
  { id: '3', icon: 'calendar', label: '1 year\nWarranty', showBadge: true },
];

function BagEmptyIllustration() {
  return (
    <View style={styles.illustrationWrap}>
      <View style={styles.illustrationBlob} />
      <View style={styles.illustrationPerson}>
        <View style={styles.illustrationHead}>
          <View style={styles.illustrationHair} />
          <View style={styles.illustrationCap} />
        </View>
        <View style={styles.illustrationBody} />
        <View style={styles.illustrationBoxWrap}>
          <View style={styles.illustrationBox} />
        </View>
        <View style={styles.illustrationLegs}>
          <View style={styles.illustrationLeg} />
          <View style={styles.illustrationLeg} />
        </View>
      </View>
    </View>
  );
}

export default function BagScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bag'); // 'bag' | 'trial'

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerBtn}
          hitSlop={12}
        >
          <Ionicons name="chevron-back" size={24} color={PRIMARY_PURPLE} />
        </TouchableOpacity>

        {/* Segmented control */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[
              styles.segment,
              styles.segmentLeft,
              activeTab === 'bag' && styles.segmentSelected,
            ]}
            onPress={() => setActiveTab('bag')}
            activeOpacity={0.8}
          >
            <AppText
              variant="sm"
              weight="semiBold"
              style={[
                styles.segmentText,
                activeTab === 'bag' && styles.segmentTextSelected,
              ]}
            >
              Shopping Bag (0)
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segment,
              styles.segmentRight,
              activeTab === 'trial' && styles.segmentSelected,
            ]}
            onPress={() => setActiveTab('trial')}
            activeOpacity={0.8}
          >
            <AppText
              variant="sm"
              weight="regular"
              style={[
                styles.segmentTextUnselected,
                activeTab === 'trial' && styles.segmentTextSelected,
              ]}
            >
              Home Trial (0)
            </AppText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.headerBtn} hitSlop={12}>
          <Ionicons name="heart-outline" size={24} color={PRIMARY_PURPLE} />
        </TouchableOpacity>
      </View>

      {/* Promotional banner */}
      <View style={styles.banner}>
        <Ionicons name="checkmark-circle" size={20} color={BANNER_TEXT} />
        <AppText variant="sm" weight="regular" style={styles.bannerText}>
          15 Day Return & Money Back Available On All Online Orders
        </AppText>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + SPACING.xxl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Empty state */}
        <View style={styles.emptyState}>
          <AppText variant="2xl" weight="semiBold" style={styles.emptyTitle}>
            There is nothing here!
          </AppText>
          <AppText variant="base" weight="regular" style={styles.emptySubtitle}>
            Let's do some retail therapy.
          </AppText>
          <View style={styles.illustrationSpacer} />
          <BagEmptyIllustration />
        </View>

        {/* CARATLANE ASSURITY */}
        <View style={styles.assuranceSection}>
          <AppText
            variant="base"
            weight="semiBold"
            style={styles.assuranceTitle}
          >
            CARATLANE ASSURITY
          </AppText>
          <View style={styles.assuranceRow}>
            {ASSURANCE_ITEMS.map((item) => (
              <View key={item.id} style={styles.assuranceItem}>
                <View style={styles.assuranceIconWrap}>
                  <Ionicons
                    name={item.icon}
                    size={28}
                    color={PRIMARY_PURPLE}
                  />
                  {item.showBadge && (
                    <View style={styles.assuranceBadge}>
                      <AppText variant="xs" weight="semiBold" style={styles.assuranceBadgeText}>1</AppText>
                    </View>
                  )}
                </View>
                <AppText
                  variant="xs"
                  weight="regular"
                  style={styles.assuranceLabel}
                >
                  {item.label}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        {/* CTA button */}
        <TouchableOpacity
          style={styles.ctaBtn}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <AppText variant="base" weight="semiBold" style={styles.ctaBtnText}>
            START SHOPPING
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SCREEN_BG,
    paddingHorizontal: H_PAD,
    paddingBottom: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  headerBtn: {
    padding: SPACING.xs,
    minWidth: 40,
    alignItems: 'center',
  },
  segmentedControl: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: SPACING.lg,
    backgroundColor: LIGHTER_PURPLE,
    borderRadius: 10,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  segmentRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  segmentSelected: {
    backgroundColor: PRIMARY_PURPLE,
  },
  segmentText: {
    color: '#fff',
    fontSize: 12,
  },
  segmentTextUnselected: {
    color: PRIMARY_PURPLE,
    fontSize: 12,
  },
  segmentTextSelected: {
    color: '#fff',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BANNER_BG,
    paddingVertical: SPACING.sm,
    paddingHorizontal: H_PAD,
    gap: 8,
  },
  bannerText: {
    color: BANNER_TEXT,
    fontSize: 13,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: H_PAD,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: SPACING.xxl,
  },
  emptyTitle: {
    color: DARK_TEXT,
    fontSize: 22,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: SECONDARY_TEXT,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  illustrationSpacer: {
    height: SPACING.xl,
  },
  illustrationWrap: {
    width: 180,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationBlob: {
    position: 'absolute',
    width: 140,
    height: 120,
    borderRadius: 70,
    backgroundColor: ILLUST_BLUE,
    bottom: 20,
  },
  illustrationPerson: {
    alignItems: 'center',
    zIndex: 1,
  },
  illustrationHead: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
    alignItems: 'center',
  },
  illustrationHair: {
    position: 'absolute',
    top: -4,
    width: 44,
    height: 24,
    backgroundColor: ILLUST_PINK,
    borderRadius: 22,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  illustrationCap: {
    position: 'absolute',
    top: 2,
    width: 32,
    height: 14,
    backgroundColor: ILLUST_PURPLE,
    borderRadius: 4,
  },
  illustrationBody: {
    width: 48,
    height: 38,
    backgroundColor: ILLUST_PURPLE,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginTop: -2,
  },
  illustrationBoxWrap: {
    marginTop: -12,
    alignItems: 'center',
  },
  illustrationBox: {
    width: 50,
    height: 36,
    backgroundColor: ILLUST_BOX,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  illustrationLegs: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  illustrationLeg: {
    width: 6,
    height: 44,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  assuranceSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.base,
  },
  assuranceTitle: {
    color: DARK_TEXT,
    letterSpacing: 1,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  assuranceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 320,
  },
  assuranceItem: {
    alignItems: 'center',
    flex: 1,
  },
  assuranceIconWrap: {
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  assuranceBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: PRIMARY_PURPLE,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assuranceBadgeText: {
    color: '#fff',
    fontSize: 9,
  },
  assuranceLabel: {
    color: PRIMARY_PURPLE,
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaBtn: {
    backgroundColor: PRIMARY_PURPLE,
    paddingVertical: SPACING.base,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  ctaBtnText: {
    color: '#fff',
    letterSpacing: 1,
    fontSize: 15,
  },
});
