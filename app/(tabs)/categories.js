import { AppText } from '@/components/AppText';
import { SPACING } from '@/constants/index';
import { ScreenLayout } from '@/src/layouts/ScreenLayout';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const H_PAD = SPACING.base;
const PURPLE_DARK = '#5b21b6';
const PURPLE_LIGHT = '#a78bfa';
const PURPLE_ACCENT = '#7c3aed';
const TEXT_DARK = '#1a1a1a';
const TEXT_MUTED = '#6b7280';

const TOP_CATEGORIES = [
  { id: 'rings', label: 'Rings', image: 'https://picsum.photos/seed/ring1/200/200' },
  { id: 'earrings', label: 'Earrings', image: 'https://picsum.photos/seed/ear1/200/200' },
  { id: 'bracelets', label: 'Bracelets & Bangles', image: 'https://picsum.photos/seed/brace1/200/200' },
  { id: 'solitaires', label: 'Solitaires', image: 'https://picsum.photos/seed/solitaire/200/200' },
  { id: '22kt', label: '22KT', image: 'https://picsum.photos/seed/22kt1/200/200' },
  { id: 'silver-shaya', label: 'Silver by Shaya', image: 'https://picsum.photos/seed/silvershaya/200/200' },
  { id: 'mangalsutra', label: 'Mangalsutra', image: 'https://picsum.photos/seed/mangal/200/200' },
  { id: 'necklaces', label: 'Necklaces', image: 'https://picsum.photos/seed/neck1/200/200' },
];

const GENDER_TABS = ['Women', 'Men', 'Kids'];

const MOST_BROWSED = [
  { id: 'mb1', image: 'https://picsum.photos/seed/mb1/400/240' },
  { id: 'mb2', image: 'https://picsum.photos/seed/mb2/400/240' },
  { id: 'mb3', image: 'https://picsum.photos/seed/mb3/400/240' },
];

const BANNER_CARD_W = width - H_PAD * 2;
const BANNER_CARD_MARGIN = 12;
const MOST_BROWSED_CARD_W = width * 0.72;

export default function CategoriesScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Women');

  return (
    <ScreenLayout noPadding>
      {/* Header: logo + wishlist + cart */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
        <View style={styles.logoWrap}>
          <View style={styles.logoIcon} />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Ionicons name="heart-outline" size={20} color={TEXT_DARK} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            {/* <Ionicons name="bag-outline" size={24} color={TEXT_DARK} /> */}
            <SimpleLineIcons name="bag" size={18} color={TEXT_DARK} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs: Women | Men | Kids */}
      <View style={styles.tabsRow}>
        {GENDER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <AppText
              variant="base"
              weight={activeTab === tab ? 'semiBold' : 'regular'}
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </AppText>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Categories */}
        <AppText variant="xl" weight="semiBold" style={styles.sectionTitle}>Top Categories</AppText>
        <View style={styles.categoryGrid}>
          {TOP_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              activeOpacity={0.8}
            >
              <View style={styles.categoryCardImageWrap}>
                <Image
                  source={{ uri: cat.image }}
                  style={styles.categoryCardImage}
                />
              </View>
              <AppText variant="base" weight="regular" style={styles.categoryCardLabel} numberOfLines={2}>
                {cat.label}
              </AppText>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={PURPLE_LIGHT}
                style={styles.categoryCardArrow}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Friends | Silver */}
        <View style={styles.sectionTitleRow}>
          <AppText variant="xl" weight="semiBold" style={[styles.sectionTitle, styles.sectionTitleInRow]}>Friends </AppText>
          <AppText variant="xl" weight="semiBold" style={[styles.sectionTitle, styles.sectionTitleBold]}>| Silver</AppText>
        </View>
        <View style={styles.bannerWrap}>
          <View style={[styles.bannerCard, { width: BANNER_CARD_W }]}>
            <LinearGradient
              colors={['#6d28d9', '#a21caf', '#be185d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.bannerContent}>
              <View style={styles.bannerTextWrap}>
                <AppText variant="2xl" weight="semiBold" style={styles.bannerTitle}>SHAYA</AppText>
                <AppText variant="xl" weight="semiBold" style={styles.bannerSub}>DIAMONDS</AppText>
                <AppText variant="base" weight="regular" style={styles.bannerScript}>Natural Diamonds</AppText>
                <AppText variant="sm" weight="regular" style={styles.bannerMeta}>in 925 Silver</AppText>
              </View>
              <View style={styles.bannerDecoration}>
                <Image
                  source={{ uri: 'https://picsum.photos/seed/shaya1/200/200' }}
                  style={styles.bannerDecoImage}
                />
              </View>
            </View>
            <View style={styles.bannerDots}>
              <View style={[styles.dot, styles.dotInactive]} />
              <View style={[styles.dot, styles.dotActive]} />
            </View>
          </View>
        </View>

        {/* Most Browsed */}
        <AppText variant="xl" weight="semiBold" style={styles.sectionTitle}>Most Browsed</AppText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mostBrowsedScroll}
        >
          {MOST_BROWSED.map((item) => (
            <View
              key={item.id}
              style={[styles.mostBrowsedCard, { width: MOST_BROWSED_CARD_W }]}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.mostBrowsedImage}
              />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: H_PAD,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: PURPLE_ACCENT,
    opacity: 0.9,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerIconBtn: {
    padding: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: H_PAD,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
    backgroundColor: '#fff',
  },
  tab: {
    marginRight: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  tabText: {
    fontSize: 16,
    color: TEXT_MUTED,
    fontWeight: '500',
  },
  tabTextActive: {
    color: PURPLE_DARK,
    fontWeight: '600',
  },
  tabUnderline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    backgroundColor: PURPLE_ACCENT,
    borderRadius: 1,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: H_PAD,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.xxl,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: SPACING.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    alignItems: 'baseline',
  },
  sectionTitleInRow: {
    marginBottom: 0,
  },
  sectionTitleBold: {
    marginBottom: 0,
    fontWeight: '800',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.xl,
  },
  categoryCard: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
    marginBottom: SPACING.md,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryCardImageWrap: {
    width: 56,
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  categoryCardImage: {
    width: '100%',
    height: '100%',
  },
  categoryCardLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_DARK,
    marginLeft: SPACING.sm,
  },
  categoryCardArrow: {
    marginLeft: SPACING.xs,
  },
  bannerWrap: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  bannerCard: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
  },
  bannerSub: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
    marginTop: 2,
  },
  bannerScript: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
    marginTop: 6,
  },
  bannerMeta: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  bannerDecoration: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  bannerDecoImage: {
    width: '100%',
    height: '100%',
  },
  bannerDots: {
    position: 'absolute',
    bottom: SPACING.sm,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: PURPLE_ACCENT,
  },
  mostBrowsedScroll: {
    paddingRight: H_PAD,
    gap: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  mostBrowsedCard: {
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: PURPLE_DARK,
  },
  mostBrowsedImage: {
    width: '100%',
    height: '100%',
  },
});
