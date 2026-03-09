import { AppText } from '@/components/AppText';
import { Colors, SPACING } from '@/constants/theme';
import { formatPrice } from '@/src/utils/formatPrice';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

function ProductCardComponent({
  product,
  width,
  onPress,
  onWishlist,
  isInWishlist = false,
}) {
  const { name, price, image, rating, isNew } = product;

  return (
    <TouchableOpacity
      style={[styles.card, { width }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: image }}
          style={[styles.image, { width, height: width }]}
          contentFit="cover"
        />
        {isNew && (
          <View style={styles.badge}>
            <AppText variant="xs" weight="semiBold" style={styles.badgeText}>New</AppText>
          </View>
        )}
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={(e) => {
            e?.stopPropagation?.();
            onWishlist?.();
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AppText variant="base" weight="regular" style={styles.wishlistIcon}>{isInWishlist ? '❤️' : '🤍'}</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <AppText variant="base" weight="medium" style={styles.name} numberOfLines={2}>
          {name}
        </AppText>
        {rating != null && (
          <AppText variant="sm" weight="regular" style={styles.rating}>★ {rating}</AppText>
        )}
        <AppText variant="lg" weight="semiBold" style={styles.price}>{formatPrice(price)}</AppText>
      </View>
    </TouchableOpacity>
  );
}

export const ProductCard = memo(ProductCardComponent);
export default ProductCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.sm,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.light.backgroundSecondary,
  },
  image: {
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistIcon: {
    fontSize: 16,
  },
  info: {
    paddingTop: SPACING.xs,
    paddingHorizontal: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    lineHeight: 20,
  },
  rating: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: 4,
  },
});
