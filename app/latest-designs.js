import { AppText } from '@/components/AppText';
import { SPACING } from '@/constants/theme';
import { formatPrice } from '@/src/utils/formatPrice';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const H_PAD = SPACING.base;
const CARD_GAP = 10;
const CARD_WIDTH = (width - H_PAD * 2 - CARD_GAP) / 2;

// Design tokens from reference
const DARK_PURPLE = '#5F2E92';
const LIGHT_PURPLE = '#A06DD2';
const MUSTARD = '#FFC107';
const TEXT_DARK = '#333333';
const BORDER_GRAY = '#E0E0E0';

const FILTER_TABS = ['All', 'New In', 'Store Pick Up', 'Fast Delivery', 'Try At Home'];

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Gold Ruby Pendant Necklace',
    price: 12919,
    specs: '9 KT • 0.490 g • 0.039 CT',
    image: 'https://picsum.photos/seed/j1/400/400',
    hasVideo: true,
    rating: 5,
    hasLatestBadge: true,
  },
  {
    id: '2',
    name: 'Diamond Cluster Pendant',
    price: 18500,
    specs: '22 KT • 1.2 g • 0.15 CT',
    image: 'https://picsum.photos/seed/j2/400/400',
    hasVideo: true,
    rating: 5,
    hasLatestBadge: true,
  },
  {
    id: '3',
    name: 'Simple Gold Pendant',
    price: 8990,
    specs: '9 KT • 0.35 g • 0 CT',
    image: 'https://picsum.photos/seed/j3/400/400',
    hasVideo: false,
    rating: null,
    hasLatestBadge: true,
  },
  {
    id: '4',
    name: 'Emerald Gold Necklace',
    price: 24999,
    specs: '18 KT • 0.8 g • 0.02 CT',
    image: 'https://picsum.photos/seed/j4/400/400',
    hasVideo: false,
    rating: null,
    hasLatestBadge: true,
  },
];

function ProductCard({ product }) {
  const { name, price, specs, image, hasVideo, rating, hasLatestBadge } = product;
  return (
    <View style={[styles.productCard, { width: CARD_WIDTH }]}>
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: image }} style={styles.cardImage} contentFit="cover" />
        {hasLatestBadge && (
          <View style={styles.latestBadge}>
            <AppText variant="xs" weight="semiBold" style={styles.latestBadgeText}>
              LATEST
            </AppText>
          </View>
        )}
        <TouchableOpacity style={styles.heartBtn} hitSlop={8}>
          <Ionicons name="heart-outline" size={20} color={TEXT_DARK} />
        </TouchableOpacity>
        {hasVideo && (
          <View style={styles.videoIcon}>
            <Ionicons name="videocam-outline" size={16} color="#fff" />
          </View>
        )}
        {rating != null && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={10} color={MUSTARD} />
            <AppText variant="xs" weight="semiBold" style={styles.ratingText}>
              {rating}
            </AppText>
          </View>
        )}
      </View>
      <View style={styles.cardContent}>
        <AppText variant="base" weight="semiBold" style={styles.price}>
          {formatPrice(price)}
        </AppText>
        <TouchableOpacity>
          <AppText variant="sm" weight="regular" style={styles.deliveryLink}>
            Check Delivery Date
          </AppText>
        </TouchableOpacity>
        <AppText variant="xs" weight="regular" style={styles.specs}>
          {specs}
        </AppText>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.tryAtHomeBtn}>
            <AppText variant="xs" weight="semiBold" style={styles.tryAtHomeText}>
              TRY AT HOME
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="bag-outline" size={14} color="#fff" />
            <AppText variant="xs" weight="semiBold" style={styles.addBtnText}>
              ADD
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function LatestDesignsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + SPACING.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <AppText variant="xs" weight="regular" style={styles.headerSub}>
            Delivery & Stores at
          </AppText>
          <TouchableOpacity>
            <AppText variant="sm" weight="semiBold" style={styles.pincodeLink}>
              Enter Pincode
            </AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="search" size={22} color={TEXT_DARK} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => router.push('/wishlist')}
          >
            <Ionicons name="heart-outline" size={22} color={TEXT_DARK} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="bag-outline" size={22} color={TEXT_DARK} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsContent}
      >
        {FILTER_TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <AppText
                variant="sm"
                weight="semiBold"
                style={[styles.tabText, isActive && styles.tabTextActive]}
              >
                {tab}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Banner */}
      <View style={styles.banner}>
        <AppText variant="2xl" weight="semiBold" style={styles.bannerLatest}>
          LATEST
        </AppText>
        <AppText variant="2xl" weight="regular" style={styles.bannerDesigns}>
          Designs
        </AppText>
      </View>

      {/* Product grid */}
      <View style={styles.gridContainer}>
        <FlatList
          data={SAMPLE_PRODUCTS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => <ProductCard product={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + SPACING.sm }]}>
        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="grid-outline" size={20} color="#fff" />
          <AppText variant="sm" weight="semiBold" style={styles.bottomText}>
            Categories
          </AppText>
        </TouchableOpacity>
        <View style={styles.bottomDivider} />
        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="reorder-three-outline" size={20} color="#fff" />
          <AppText variant="sm" weight="semiBold" style={styles.bottomText}>
            Sort
          </AppText>
        </TouchableOpacity>
        <View style={styles.bottomDivider} />
        <TouchableOpacity style={[styles.bottomItem, styles.bottomItemFilter]}>
          <Ionicons name="filter-outline" size={20} color="#fff" />
          <AppText variant="sm" weight="semiBold" style={styles.bottomText}>
            Filter
          </AppText>
          <View style={styles.filterBadge}>
            <AppText variant="xs" weight="semiBold" style={styles.filterBadgeText}>
              1
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: H_PAD,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  headerBtn: {
    padding: SPACING.xs,
  },
  headerCenter: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  headerSub: {
    fontSize: 11,
    color: TEXT_DARK,
  },
  pincodeLink: {
    fontSize: 13,
    color: LIGHT_PURPLE,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerIconBtn: {
    padding: SPACING.xs,
  },
  tabsScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  tabsContent: {
    paddingHorizontal: H_PAD,
    paddingVertical: 6,
    gap: 10,
    alignItems: 'center',
  },
  tab: {
    height: 40,
    minHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BORDER_GRAY,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: LIGHT_PURPLE,
    borderColor: LIGHT_PURPLE,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_DARK,
  },
  tabTextActive: {
    color: '#fff',
  },
  banner: {
    backgroundColor: DARK_PURPLE,
    paddingVertical: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bannerLatest: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
  },
  bannerDesigns: {
    fontSize: 26,
    fontFamily: 'GreatVibes_400Regular',
    color: '#fff',
  },
  gridContainer: {
    flex: 1,
  },
  gridContent: {
    paddingHorizontal: H_PAD,
    paddingVertical: SPACING.base,
    paddingBottom: 100,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: CARD_GAP,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  cardImageWrap: {
    position: 'relative',
    aspectRatio: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  latestBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: MUSTARD,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  latestBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.3,
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  videoIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 10,
    color: TEXT_DARK,
  },
  cardContent: {
    padding: SPACING.sm,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: TEXT_DARK,
  },
  deliveryLink: {
    fontSize: 12,
    color: LIGHT_PURPLE,
    marginTop: 4,
  },
  specs: {
    fontSize: 11,
    color: TEXT_DARK,
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
    gap: 8,
  },
  tryAtHomeBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: LIGHT_PURPLE,
    alignItems: 'center',
  },
  tryAtHomeText: {
    fontSize: 10,
    fontWeight: '600',
    color: LIGHT_PURPLE,
  },
  addBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: DARK_PURPLE,
  },
  addBtnText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: DARK_PURPLE,
    paddingTop: SPACING.sm,
  },
  bottomItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  bottomItemFilter: {
    position: 'relative',
  },
  bottomDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  bottomText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  filterBadge: {
    position: 'absolute',
    top: -2,
    right: '30%',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
});
