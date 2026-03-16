import { AppText } from '@/components/AppText';
import { theme } from '@/constants/index';
import { formatPrice } from '@/src/utils/formatPrice';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const HEADER_BG = '#F4EEFA';
const HEADER_ICON = '#6A1B9A';
const BANNER_BG = '#E5F8E7';
const BANNER_TEXT = '#4CAF50';
const EMPTY_HEADING = '#4A148C';
const EMPTY_DESC = '#616161';
const HEART_PINK = '#E91E63';
const LINES_PURPLE = '#DDC3EC';
const CARD_PRICE = '#6A1B9A';
const CARD_ORIGINAL = '#9E9E9E';
const CARD_DESC = '#424242';

const H_PAD = theme?.spacing?.base;
const CARD_W = (width - H_PAD * 2 - 12) * 0.48;
const CARD_MARGIN = 8;

const SUGGESTED_PRODUCTS = [
  {
    id: '1',
    name: 'Petite Blue Butterfly Diamond...',
    price: 50770,
    originalPrice: 52751,
    image: 'https://picsum.photos/seed/butterfly/400/400',
  },
  {
    id: '2',
    name: 'Flora Clone Diamond Ring',
    price: 136185,
    originalPrice: null,
    image: 'https://picsum.photos/seed/flora/400/400',
  },
];

function EmptyStateIllustration() {
  return (
    <View style={styles.emptyCircle}>
      <View style={styles.emptyLines}>
        {[32, 48, 40, 56].map((w, i) => (
          <View key={i} style={[styles.emptyLine, { width: w }]} />
        ))}
      </View>
      <View style={styles.heartOverlay}>
        <Ionicons name="heart" size={52} color={HEART_PINK} />
      </View>
    </View>
  );
}

function WishlistProductCard({ product }) {
  const { name, price, originalPrice, image } = product;
  return (
    <TouchableOpacity style={[styles.productCard, { width: CARD_W }]} activeOpacity={0.9}>
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: image }} style={styles.cardImage} contentFit="cover" />
        <TouchableOpacity style={styles.cardHeartBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="heart-outline" size={20} color={HEADER_ICON} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <View style={styles.cardPriceRow}>
          <AppText variant="lg" weight="semiBold" style={styles.cardPrice}>
            {formatPrice(price)}
          </AppText>
          {originalPrice != null && (
            <AppText variant="base" weight="regular" style={styles.cardOriginal}>
              {formatPrice(originalPrice)}
            </AppText>
          )}
        </View>
        <AppText variant="sm" weight="regular" style={styles.cardName} numberOfLines={2}>
          {name}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + theme?.spacing?.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={HEADER_ICON} />
        </TouchableOpacity>
        <AppText variant="xl" weight="semiBold" style={styles.headerTitle}>
          Wishlist
        </AppText>
        <TouchableOpacity style={styles.headerBtn} hitSlop={12}>
          <Ionicons name="bag-outline" size={24} color={HEADER_ICON} />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Ionicons name="swap-horizontal" size={18} color={BANNER_TEXT} />
        <AppText variant="sm" weight="regular" style={styles.bannerText}>
          Lifetime Exchange For All Your Purchases
        </AppText>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Empty state */}
        <View style={styles.emptyState}>
          <EmptyStateIllustration />
          <AppText variant="xl" weight="semiBold" style={styles.emptyHeading}>
            No Favourites Yet
          </AppText>
          <AppText variant="base" weight="regular" style={styles.emptyDesc}>
            Save your recently viewed designs and stay updated on price drops, discounts & more.
          </AppText>
        </View>

        {/* Suggested products */}
        <View style={styles.productsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {SUGGESTED_PRODUCTS.map((p) => (
              <WishlistProductCard key={p.id} product={p} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    backgroundColor: HEADER_BG,
    paddingHorizontal: H_PAD,
    paddingBottom: theme?.spacing?.sm,
  },
  headerBtn: {
    padding: theme?.spacing?.xs,
    minWidth: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    color: HEADER_ICON,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BANNER_BG,
    paddingVertical: theme?.spacing?.sm,
    paddingHorizontal: H_PAD,
    gap: 8,
  },
  bannerText: {
    color: BANNER_TEXT,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme?.spacing?.xxl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme?.spacing?.xxl,
    paddingHorizontal: H_PAD,
  },
  emptyCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: theme?.spacing?.lg,
  },
  emptyLines: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 8,
  },
  emptyLine: {
    height: 3,
    backgroundColor: LINES_PURPLE,
    borderRadius: 2,
  },
  heartOverlay: {
    zIndex: 1,
  },
  emptyHeading: {
    fontWeight: '600',
    color: EMPTY_HEADING,
    marginBottom: theme?.spacing?.sm,
    textAlign: 'center',
  },
  emptyDesc: {
    lineHeight: 21,
    color: EMPTY_DESC,
    textAlign: 'center',
    maxWidth: 280,
  },
  productsSection: {
    paddingHorizontal: 0,
    marginTop: theme?.spacing?.sm,
  },
  productsScroll: {
    paddingHorizontal: H_PAD,
    gap: CARD_MARGIN,
    paddingVertical: theme?.spacing?.sm,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: CARD_MARGIN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImageWrap: {
    position: 'relative',
    aspectRatio: 1,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardHeartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
  },
  cardInfo: {
    padding: theme?.spacing?.sm,
  },
  cardPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  cardPrice: {
    fontWeight: '600',
    color: CARD_PRICE,
  },
  cardOriginal: {
    color: CARD_ORIGINAL,
    textDecorationLine: 'line-through',
  },
  cardName: {
    color: CARD_DESC,
    lineHeight: 18,
  },
});
