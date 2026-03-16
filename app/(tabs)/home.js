import { AppText } from '@/components/AppText';
import { SPACING } from '@/constants/index';
import { ScreenLayout } from '@/src/layouts/ScreenLayout';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
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
const HEADER_DARK = '#1a2332';
const SEARCH_GREEN = '#16a34a';
const SHOWCASE_CARD_W = width * 0.78;
const SHOWCASE_CARD_MARGIN = 12;
const SHOWCASE_SNAP_W = SHOWCASE_CARD_W + SHOWCASE_CARD_MARGIN * 2;
const CATEGORY_SIZE = (width - H_PAD * 2 - SPACING.sm * 3) / 4;

const CATEGORIES = [
  { id: 'rings', label: 'Rings', image: 'https://picsum.photos/seed/ring/200/200' },
  { id: 'earrings', label: 'Earrings', image: 'https://picsum.photos/seed/ear/200/200' },
  { id: 'necklaces', label: 'Necklaces', image: 'https://picsum.photos/seed/neck/200/200' },
  { id: 'bracelets', label: 'Bracelets & Bangles', image: 'https://picsum.photos/seed/brace/200/200' },
  { id: 'latest', label: 'Latest', image: 'https://picsum.photos/seed/latest/200/200' },
  { id: '22kt', label: '22KT', image: 'https://picsum.photos/seed/22kt/200/200' },
  { id: 'silver-diamonds', label: 'Silver Diamonds', image: 'https://picsum.photos/seed/silver/200/200' },
  { id: '9kt', label: '9KT', image: 'https://picsum.photos/seed/9kt/200/200' },
];

const SHOWCASE_ITEMS = [
  { id: '1', image: 'https://picsum.photos/seed/s1/600/400' },
  { id: '2', image: 'https://picsum.photos/seed/s2/600/400' },
  { id: '3', image: 'https://picsum.photos/seed/s3/600/400' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const categoryCells = useMemo(
    () =>
      CATEGORIES.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={styles.categoryWrap}
          activeOpacity={0.8}
          onPress={() => router.push('/latest-designs')}
        >
          <View style={styles.categoryCircle}>
            <Image
              source={{ uri: cat.image }}
              style={styles.categoryImage}
            />
          </View>
          <AppText variant="sm" weight="regular" style={styles.categoryLabel} numberOfLines={2}>
            {cat.label}
          </AppText>
        </TouchableOpacity>
      )),
    [router]
  );

  const showcaseCards = useMemo(
    () =>
      SHOWCASE_ITEMS.map((item) => (
        <View key={item.id} style={[styles.showcaseCard, { width: SHOWCASE_CARD_W }]}>
          <Image
            source={{ uri: item.image }}
            style={styles.showcaseImage}
          />
        </View>
      )),
    []
  );

  return (
    <ScreenLayout noPadding>
      <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
        <View style={styles.headerTop}>
          <View style={styles.logoWrap}>
            <TouchableOpacity onPress={() => router.push('/(tabs)/categories')}>
              <View style={styles.logoIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationWrap} activeOpacity={0.8}>
              <View>
                <AppText variant="xs" weight="regular" style={styles.locationLine1}>Ghumar Mandi</AppText>
                <View style={styles.locationLine2Wrap}>
                  <AppText variant="xs" weight="regular" style={styles.locationLine2}>Ludhiana 142027 </AppText>
                  <Ionicons name="chevron-down" size={18} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.clubBadge}>
              <AppText variant="xs" weight="semiBold" style={styles.clubTextTop}>CLUB</AppText>
              <AppText variant="xs" weight="regular" style={styles.clubTextBottom}>xClusive</AppText>
            </View>
            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={() => router.push('/wishlist')}
            >
              <Ionicons name="heart-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIconBtn}
              onPress={() => router.push('/bag')}
            >
              <SimpleLineIcons name="bag" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <AppText variant="base" weight="regular" style={styles.searchPlaceholder}>{"Search 'Category'"}</AppText>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dark header: logo, location, club badge, wishlist, cart */}

        {/* White search bar with SHAYA button */}

        {/* Hero banner - dark teal with gold accent */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <AppText variant="2xl" weight="semiBold" style={styles.heroTitle}>WOMEN</AppText>
            <AppText variant="base" weight="regular" style={styles.heroSub}>Discover fine jewelry</AppText>
          </View>
          <View style={styles.heroAccent} />
        </View>

        {/* Category grid - 2 rows x 4 circular */}
        <View style={styles.categorySection}>
          <View style={styles.categoryRow}>{categoryCells.slice(0, 4)}</View>
          <View style={styles.categoryRow}>{categoryCells.slice(4, 8)}</View>
        </View>

        {/* Product showcase - horizontal scroll + FAB */}
        <View style={styles.showcaseSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.showcaseScroll}
            snapToInterval={SHOWCASE_SNAP_W}
            decelerationRate="fast"
          >
            {showcaseCards}
          </ScrollView>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 1 },
  header: {
    backgroundColor: HEADER_DARK,
    paddingHorizontal: 4,
    paddingTop: SPACING.sm + 4,
    paddingBottom: 1,
    paddingHorizontal: H_PAD,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    opacity: 0.9,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  locationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationLine1: {
    color: '#fff',
  },
  locationLine2Wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  locationLine2: {
    color: 'rgba(255,255,255,0.8)',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clubBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  clubTextTop: {
    fontSize: 10,
    fontWeight: '800',
    color: '#facc15',
    letterSpacing: 0.5,
  },
  clubTextBottom: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
  },
  headerIconBtn: {
    padding: 6,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    paddingHorizontal: 14,
    gap: 8,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: '#9ca3af',
  },
  shayaBtn: {
    backgroundColor: SEARCH_GREEN,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 22,
    justifyContent: 'center',
  },
  shayaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  hero: {
    backgroundColor: HEADER_DARK,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.base,
    overflow: 'hidden',
    position: 'relative',
  },
  heroContent: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fef3c7',
    letterSpacing: 4,
  },
  heroSub: {
    fontSize: 14,
    color: 'rgba(254,243,199,0.9)',
    marginTop: 4,
  },
  heroAccent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(212,175,55,0.2)',
  },
  categorySection: {
    backgroundColor: '#fff',
    paddingHorizontal: H_PAD,
    paddingVertical: SPACING.base,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  categoryWrap: {
    width: CATEGORY_SIZE,
    alignItems: 'center',
  },
  categoryCircle: {
    width: CATEGORY_SIZE,
    height: CATEGORY_SIZE,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    marginTop: 6,
    textAlign: 'center',
  },
  showcaseSection: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  showcaseScroll: {
    paddingHorizontal: H_PAD,
    gap: SHOWCASE_CARD_MARGIN,
    paddingVertical: 8,
  },
  showcaseCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1e3d3d',
    marginRight: SHOWCASE_CARD_MARGIN * 2,
  },
  showcaseImage: {
    width: '100%',
    height: '100%',
  },
});
