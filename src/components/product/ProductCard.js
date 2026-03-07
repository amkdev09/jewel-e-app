import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { formatPrice } from '@/src/utils/formatPrice';
import { SPACING } from '@/src/constants/spacing';
import { Colors } from '@/src/constants/colors';

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
            <Text style={styles.badgeText}>New</Text>
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
          <Text style={styles.wishlistIcon}>{isInWishlist ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        {rating != null && (
          <Text style={styles.rating}>★ {rating}</Text>
        )}
        <Text style={styles.price}>{formatPrice(price)}</Text>
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
