import AppText from '@/components/ui/appText';
import { SPACING } from '@/constants/index';
import { ScreenLayout } from '@/src/layouts/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PURPLE = '#7c3aed';
const PURPLE_LIGHT = '#ede9fe';
const PURPLE_PALE = '#f0eeff';
const TEXT_DARK = '#1a1a1a';
const TEXT_MUTED = '#6b7280';
const BORDER_COLOR = '#e5e7eb';
const BG_GREY = '#f5f5f5';

const YEARS = ['2024', '2025', '2026'];

// ── Arrow Connector ──────────────────────────────────────────────────────────
function ArrowConnector({ lineHeight = 56 }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: 1.5, height: lineHeight, backgroundColor: PURPLE }} />
      <View style={arrowHeadStyle} />
    </View>
  );
}
const arrowHeadStyle = {
  width: 0,
  height: 0,
  borderLeftWidth: 7,
  borderRightWidth: 7,
  borderTopWidth: 10,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderTopColor: PURPLE,
  marginTop: -1,
};

// ── Sparkle helpers ──────────────────────────────────────────────────────────
const Sparkle = ({ style }) => (
  <AppText
    style={[
      { fontSize: 18, color: PURPLE, fontWeight: '700', opacity: 0.55, position: 'absolute' },
      style,
    ]}
  >
    +
  </AppText>
);
const SparkleSmall = ({ style }) => (
  <AppText
    style={[
      { fontSize: 22, color: PURPLE, fontWeight: '700', opacity: 0.4, position: 'absolute' },
      style,
    ]}
  >
    ·
  </AppText>
);

// ── Jewellery Box Illustration ───────────────────────────────────────────────
function JewelleryBoxIllustration() {
  return (
    <View style={{ width: 150, height: 150, alignItems: 'center', justifyContent: 'center' }}>
      <View style={jb.circle}>
        <View style={jb.lid}>
          <View style={jb.lidBump} />
        </View>
        <View style={jb.base}>
          <View style={jb.slot} />
        </View>
        <View style={jb.jewel} />
      </View>
      <Sparkle style={{ top: 8, right: 14 }} />
      <Sparkle style={{ top: 22, left: 8 }} />
      <SparkleSmall style={{ bottom: 16, right: 10 }} />
      <SparkleSmall style={{ top: 10, left: 24 }} />
      <SparkleSmall style={{ bottom: 12, left: 18 }} />
    </View>
  );
}
const jb = StyleSheet.create({
  circle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1.5,
    borderColor: PURPLE,
    borderStyle: 'dashed',
    backgroundColor: PURPLE_PALE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lid: {
    position: 'absolute',
    top: 26,
    width: 58,
    height: 24,
    borderWidth: 2,
    borderColor: PURPLE,
    borderRadius: 6,
    backgroundColor: PURPLE_PALE,
    alignItems: 'center',
  },
  lidBump: {
    position: 'absolute',
    top: -7,
    width: 16,
    height: 9,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PURPLE,
    backgroundColor: PURPLE_PALE,
  },
  base: {
    position: 'absolute',
    top: 48,
    width: 54,
    height: 28,
    borderWidth: 2,
    borderColor: PURPLE,
    borderRadius: 4,
    backgroundColor: PURPLE_PALE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slot: {
    width: 32,
    height: 10,
    borderWidth: 1.5,
    borderColor: PURPLE,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  jewel: {
    position: 'absolute',
    top: 18,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#eab308',
    borderWidth: 1.5,
    borderColor: PURPLE,
  },
});

// ── Hand Gold Illustration ───────────────────────────────────────────────────
function HandGoldIllustration() {
  return (
    <View
      style={{
        width: 170,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <View style={hg.goldBar}>
        <View style={hg.goldShine} />
      </View>
      <View style={hg.palm}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[hg.finger, { height: 16 + i * 3 }]} />
        ))}
      </View>
      <View style={hg.wrist} />
      <View style={hg.speedLines}>
        {[22, 14, 18].map((w, i) => (
          <View key={i} style={[hg.speedLine, { width: w }]} />
        ))}
      </View>
      <Sparkle style={{ top: 4, right: 18 }} />
      <Sparkle style={{ top: 30, left: 6 }} />
      <SparkleSmall style={{ bottom: 22, right: 8 }} />
      <SparkleSmall style={{ top: 12, right: 38 }} />
      <SparkleSmall style={{ bottom: 32, left: 28 }} />
    </View>
  );
}
const hg = StyleSheet.create({
  goldBar: {
    position: 'absolute',
    top: 16,
    width: 50,
    height: 28,
    backgroundColor: '#eab308',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ca8a04',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 6,
    transform: [{ rotate: '-8deg' }],
    zIndex: 2,
  },
  goldShine: { width: 6, height: 18, backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: 3 },
  palm: {
    position: 'absolute',
    bottom: 26,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    width: 92,
    justifyContent: 'center',
    zIndex: 1,
  },
  finger: {
    width: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1.5,
    borderColor: PURPLE,
    backgroundColor: PURPLE_PALE,
  },
  wrist: {
    position: 'absolute',
    bottom: 10,
    width: 64,
    height: 24,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1.5,
    borderColor: PURPLE,
    backgroundColor: PURPLE_PALE,
  },
  speedLines: { position: 'absolute', left: 2, bottom: 44, gap: 5 },
  speedLine: { height: 1.5, backgroundColor: PURPLE, borderRadius: 2, opacity: 0.45 },
});

// ── eGold Badge — exact match to reference ───────────────────────────────────
function EGoldBadge() {
  return (
    <View style={badge.container}>
      {/* Gold pill: circular "e" + "Gold" */}
      <LinearGradient
        colors={['#d4a500', '#c49000', '#b07800']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={badge.goldPill}
      >
        {/* Circular swirl "e" — mimics the CaratLane-style logo */}
        <View style={badge.eCircleWrap}>
          <View style={badge.eCircleOuter}>
            <View style={badge.eCircleInner} />
            {/* tail of the "e" swirl */}
            <View style={badge.eTail} />
          </View>
        </View>
        <AppText style={badge.goldWord}>Gold</AppText>
      </LinearGradient>
      {/* Dark purple "by CARATLANE" pill — slightly overlaps */}
      <View style={badge.darkPill}>
        <AppText style={badge.darkText}>by CARATLANE</AppText>
      </View>
    </View>
  );
}
const badge = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goldPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 14,
    height: 34,
    borderRadius: 17,
    gap: 4,
  },
  eCircleWrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eCircleOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    // cut bottom-right to make it look like open "e"
    overflow: 'hidden',
  },
  eCircleInner: {
    width: 8,
    height: 3,
    backgroundColor: '#c49000',
    borderRadius: 2,
    position: 'absolute',
    right: -1,
    top: '50%',
    marginTop: -1.5,
  },
  eTail: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 3,
    backgroundColor: '#c49000',
    borderRadius: 2,
  },
  goldWord: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  darkPill: {
    backgroundColor: '#3d0066',
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8, // slight overlap with gold pill
  },
  darkText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

// ── Vault Icon — macOS Security preference pane style ────────────────────────
function VaultIcon() {
  return (
    <View style={vi.outer}>
      <LinearGradient
        colors={['#e8e8e8', '#d0d0d0', '#c0c0c0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.3, y: 1 }}
        style={vi.bg}
      >
        {/* Big combination lock dial — fills most of the icon */}
        <View style={vi.dialOuter}>
          <LinearGradient colors={['#c8c8c8', '#a8a8a8', '#989898']} style={vi.dialGradient}>
            {/* Tick marks around the dial */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <View
                key={i}
                style={[
                  vi.tick,
                  i % 3 === 0 ? vi.tickMajor : vi.tickMinor,
                  {
                    transform: [{ rotate: `${deg}deg` }, { translateY: -(i % 3 === 0 ? 17 : 16) }],
                  },
                ]}
              />
            ))}
            {/* Inner ring */}
            <View style={vi.innerRing}>
              {/* Center hub */}
              <View style={vi.hub}>
                <View style={vi.hubDot} />
              </View>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </View>
  );
}
const vi = StyleSheet.create({
  outer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialOuter: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#909090',
  },
  dialGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    borderRadius: 1,
    backgroundColor: '#666',
    marginLeft: -0.75,
    marginTop: -1,
  },
  tickMajor: { width: 2, height: 6 },
  tickMinor: { width: 1.5, height: 4 },
  innerRing: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#888',
    backgroundColor: '#b8b8b8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hub: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#707070',
  },
  hubDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#606060',
  },
});

// ── Main Screen ──────────────────────────────────────────────────────────────
export default function EGoldScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedYear, setSelectedYear] = useState('2026');
  const [yearFilterOpen, setYearFilterOpen] = useState(false);
  const [orderTypeOpen, setOrderTypeOpen] = useState(false);
  const [distributorOpen, setDistributorOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(true);

  return (
    <ScreenLayout noPadding>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Nav Bar ── */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <View style={styles.logoWrap}>
            {[...Array(12)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.logoDot,
                  {
                    opacity: 0.4 + (i % 4) * 0.15,
                    backgroundColor: PURPLE,
                    width: i % 3 === 0 ? 5 : 4,
                    height: i % 3 === 0 ? 5 : 4,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* ── Welcome Row ── */}
        <View style={styles.welcomeRow}>
          <AppText style={styles.welcomeText}>Welcome to Your Vault!</AppText>
          <EGoldBadge />
        </View>

        {/* ── Balance Card (full width) ── */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceLeft}>
            <AppText style={styles.balanceLabel}>Gold balance</AppText>
            <AppText style={styles.balanceAmount}>0.0000 gms</AppText>
          </View>
          <VaultIcon />
        </View>

        {/* ── Action Buttons ── */}
        <View style={styles.actionsSection}>
          {['Proceed to buy eGold', 'Proceed to Sell your Gold', 'Proceed to Gift'].map((label) => (
            <TouchableOpacity key={label} style={styles.actionItem} activeOpacity={0.7}>
              <AppText style={styles.actionText}>{label}</AppText>
              <Ionicons name="arrow-forward" size={20} color={PURPLE} />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Filter Section ── */}
        <View style={styles.filterSection}>
          {/* Dropdown row */}
          <View style={styles.filterDropdownRow}>
            {[
              {
                label: 'Year',
                chevron: 'chevron-up',
                onPress: () => setYearFilterOpen(!yearFilterOpen),
              },
              {
                label: 'Order Type',
                chevron: 'chevron-down',
                onPress: () => setOrderTypeOpen(!orderTypeOpen),
              },
              {
                label: 'Distributor',
                chevron: 'chevron-down',
                onPress: () => setDistributorOpen(!distributorOpen),
              },
            ].map((d) => (
              <TouchableOpacity
                key={d.label}
                style={styles.filterDropdown}
                onPress={d.onPress}
                activeOpacity={0.8}
              >
                <AppText style={styles.filterDropdownText}>{d.label}</AppText>
                <Ionicons name={d.chevron} size={15} color={TEXT_DARK} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Year pills */}
          <View style={styles.yearPillsRow}>
            {YEARS.map((year) => (
              <TouchableOpacity
                key={year}
                style={[styles.yearPill, selectedYear === year && styles.yearPillActive]}
                onPress={() => setSelectedYear(year)}
                activeOpacity={0.8}
              >
                <AppText
                  style={[styles.yearPillText, selectedYear === year && styles.yearPillTextActive]}
                >
                  {year}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Filter / Clear */}
          <View style={styles.filterBtnRow}>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setFiltersApplied(true)}
              activeOpacity={0.8}
            >
              <AppText style={styles.filterBtnText}>Filter</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => {
                setSelectedYear('');
                setFiltersApplied(false);
              }}
              activeOpacity={0.8}
            >
              <AppText style={styles.clearBtnText}>Clear</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── No Transaction Row ── */}
        <View style={styles.noTransactionRow}>
          <AppText style={styles.noTransactionText}>No Transaction Found</AppText>
          {filtersApplied && selectedYear ? (
            <TouchableOpacity
              style={styles.activeFilterTag}
              onPress={() => {
                setSelectedYear('');
                setFiltersApplied(false);
              }}
              activeOpacity={0.8}
            >
              <AppText style={styles.activeFilterTagText}>{selectedYear} ✕</AppText>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* ── Exchange / Redeem ── */}
        <View style={styles.exchangeSection}>
          <AppText style={styles.exchangeTitle}>Exchange / Redeem</AppText>

          <View style={styles.stepBlock}>
            <JewelleryBoxIllustration />
            <AppText style={styles.stepText}>
              Add to cart any Gold{'\n'}coin(s) or Jewellery
            </AppText>
          </View>

          <ArrowConnector lineHeight={60} />

          <View style={[styles.stepBlock, { marginTop: SPACING.base }]}>
            <HandGoldIllustration />
            <AppText style={styles.stepText}>Pay by Digital Gold{'\n'}option at Checkout</AppText>
          </View>

          <View style={{ alignItems: 'center', marginTop: SPACING.base }}>
            <View style={{ width: 1.5, height: 56, backgroundColor: PURPLE }} />
          </View>
        </View>

        {/* ── Delivery Section ── */}
        <View style={styles.deliverySection}>
          <ArrowConnector lineHeight={20} />

          <View style={styles.truckScene}>
            <View style={styles.shieldWrap}>
              <View style={styles.shield}>
                <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
              </View>
            </View>
            <View style={styles.truckBody}>
              <View style={styles.giftBox}>
                <Ionicons name="gift-outline" size={28} color={PURPLE} />
              </View>
              <View style={styles.truckCab}>
                <Ionicons name="car-outline" size={20} color={PURPLE} />
              </View>
            </View>
            <View style={styles.wheelsRow}>
              <View style={styles.wheel} />
              <View style={styles.wheel} />
            </View>
            <View style={styles.speedLines}>
              {[24, 16, 20].map((w, i) => (
                <View key={i} style={[styles.speedLine, { width: w }]} />
              ))}
            </View>
            <Sparkle style={{ top: 2, right: 2 }} />
            <SparkleSmall style={{ top: 4, right: 52 }} />
          </View>

          <AppText style={styles.deliveryText}>
            Get it delivered at{'\n'}your Doorstep, free of{'\n'}cost!
          </AppText>
        </View>

        {/* ── View Buttons ── */}
        <View style={styles.viewBtnsSection}>
          <TouchableOpacity style={styles.viewBtn} activeOpacity={0.8}>
            <AppText style={styles.viewBtnText}>View all Gold coins</AppText>
          </TouchableOpacity>
          <AppText style={styles.orText}>OR</AppText>
          <TouchableOpacity style={styles.viewBtn} activeOpacity={0.8}>
            <AppText style={styles.viewBtnText}>View Jewellery</AppText>
          </TouchableOpacity>
        </View>

        {/* ── Redeem Info ── */}
        <View style={styles.redeemInfoRow}>
          <View style={styles.redeemIconWrap}>
            <Ionicons name="shield" size={34} color={PURPLE} />
            <View style={styles.redeemIconBadge}>
              <AppText style={styles.redeemBadgeText}>!</AppText>
            </View>
          </View>
          <AppText style={styles.redeemInfoText}>
            You can also Redeem your Gold Balance online as well as offline stores of caratlane
            &amp; our Jewellery Partner
          </AppText>
        </View>
      </ScrollView>

      {/* ── Floating Support Button ── */}
      <TouchableOpacity
        style={[styles.floatingBtn, { bottom: insets.bottom + 16 }]}
        activeOpacity={0.8}
      >
        <Ionicons name="call" size={20} color="#fff" />
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 100, backgroundColor: '#fff' },

  // Nav
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: 12,
    gap: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
    backgroundColor: '#fff',
  },
  backBtn: { padding: 4 },
  logoWrap: { flexDirection: 'row', flexWrap: 'wrap', width: 36, gap: 3 },
  logoDot: { borderRadius: 10 },

  // Welcome
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: '#fff',
  },
  welcomeText: { fontSize: 17, color: TEXT_DARK, fontWeight: '600' },

  // Balance Card
  balanceCard: {
    marginHorizontal: SPACING.base,
    backgroundColor: '#f5eeff',
    borderRadius: 14,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    minHeight: 110,
  },
  balanceLeft: {
    flexShrink: 1,
    paddingRight: 12,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#c084fc',
    fontWeight: '600',
    marginBottom: 8,
    includeFontPadding: false,
  },
  balanceAmount: {
    fontSize: 20,
    color: '#1a1a1a',
    fontWeight: '600',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  // Actions — full width with bigger gap
  actionsSection: {
    marginHorizontal: SPACING.base,
    marginTop: SPACING.xl,
    gap: SPACING.base,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d8c8ff',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: SPACING.base,
    backgroundColor: '#fff',
  },
  actionText: { fontSize: 15, color: PURPLE, fontWeight: '500' },

  // Filter
  filterSection: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.base,
    alignItems: 'center',
    gap: SPACING.base,
  },
  filterDropdownRow: { flexDirection: 'row', gap: SPACING.sm, width: '100%' },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  filterDropdownText: { fontSize: 13, color: TEXT_DARK },
  yearPillsRow: { flexDirection: 'row', gap: SPACING.sm },
  yearPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    backgroundColor: '#fff',
  },
  yearPillActive: { backgroundColor: PURPLE, borderColor: PURPLE },
  yearPillText: { fontSize: 14, color: TEXT_DARK },
  yearPillTextActive: { color: '#fff', fontWeight: '600' },
  filterBtnRow: { flexDirection: 'row', gap: SPACING.sm, width: '100%' },
  filterBtn: {
    flex: 1,
    backgroundColor: PURPLE,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
  },
  filterBtnText: { fontSize: 15, color: '#fff', fontWeight: '700' },
  clearBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  clearBtnText: { fontSize: 15, color: TEXT_DARK, fontWeight: '600' },

  // No Transaction
  noTransactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
  },
  noTransactionText: { fontSize: 14, color: TEXT_MUTED },
  activeFilterTag: {
    borderWidth: 1,
    borderColor: '#c4b5fd',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  activeFilterTagText: { fontSize: 12, color: TEXT_DARK },

  // Exchange / Redeem
  exchangeSection: { backgroundColor: BG_GREY, paddingTop: SPACING.xl, alignItems: 'center' },
  exchangeTitle: { fontSize: 22, fontWeight: '700', color: TEXT_DARK, marginBottom: SPACING.xl },
  stepBlock: { alignItems: 'center', paddingHorizontal: SPACING.base },
  stepText: {
    fontSize: 16,
    color: TEXT_DARK,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 24,
    marginTop: SPACING.sm,
  },

  // Delivery
  deliverySection: { backgroundColor: BG_GREY, alignItems: 'center', paddingBottom: SPACING.xl },
  truckScene: {
    width: 200,
    height: 110,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.base,
  },
  shieldWrap: { position: 'absolute', left: 18, top: 8, zIndex: 2 },
  shield: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  truckBody: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 10,
    top: 12,
  },
  giftBox: {
    width: 52,
    height: 48,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: PURPLE,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  truckCab: {
    width: 38,
    height: 38,
    backgroundColor: PURPLE_LIGHT,
    borderWidth: 1.5,
    borderColor: PURPLE,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  wheelsRow: { flexDirection: 'row', position: 'absolute', bottom: 2, right: 12, gap: 30 },
  wheel: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: PURPLE,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 2,
  },
  speedLines: { position: 'absolute', left: 2, bottom: 22, gap: 4 },
  speedLine: { height: 2, backgroundColor: PURPLE, borderRadius: 2, opacity: 0.4 },
  deliveryText: {
    fontSize: 18,
    color: TEXT_DARK,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
    marginTop: SPACING.sm,
  },

  // View Buttons
  viewBtnsSection: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
    alignItems: 'center',
    backgroundColor: BG_GREY,
  },
  viewBtn: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#a78bfa',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  viewBtnText: { fontSize: 15, color: TEXT_DARK, fontWeight: '700' },
  orText: { fontSize: 15, color: TEXT_DARK, fontWeight: '500', marginVertical: 2 },

  // Redeem Info
  redeemInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.sm,
    backgroundColor: BG_GREY,
  },
  redeemIconWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  redeemIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemBadgeText: { fontSize: 11, color: '#fff', fontWeight: '700' },
  redeemInfoText: { flex: 1, fontSize: 13, color: TEXT_MUTED, lineHeight: 20 },

  // Floating
  floatingBtn: {
    position: 'absolute',
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
});

// import { AppText } from '@/components/AppText';
// import { SPACING } from '@/constants/theme';
// import { ScreenLayout } from '@/src/layouts/ScreenLayout';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Image,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const HEADER_BG = '#f5f5f5';
// const PURPLE = '#7c3aed';
// const PURPLE_LIGHT = '#ede9fe';
// const TEXT_DARK = '#1a1a1a';
// const TEXT_MUTED = '#6b7280';
// const BORDER_COLOR = '#e5e7eb';

// const YEARS = ['2024', '2025', '2026'];

// export default function EGoldScreen() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const [selectedYear, setSelectedYear] = useState('2026');
//   const [yearFilterOpen, setYearFilterOpen] = useState(false);
//   const [orderTypeOpen, setOrderTypeOpen] = useState(false);
//   const [distributorOpen, setDistributorOpen] = useState(false);
//   const [filtersApplied, setFiltersApplied] = useState(true);

//   const handleClear = () => {
//     setSelectedYear('');
//     setFiltersApplied(false);
//   };

//   const handleFilter = () => {
//     setFiltersApplied(true);
//   };

//   return (
//     <ScreenLayout noPadding>
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Top Nav Bar */}
//         <View style={styles.navBar}>
//           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//             <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
//           </TouchableOpacity>
//           {/* CaratLane logo dots */}
//           <View style={styles.logoWrap}>
//             {[...Array(12)].map((_, i) => (
//               <View
//                 key={i}
//                 style={[
//                   styles.logoDot,
//                   {
//                     opacity: 0.4 + (i % 4) * 0.15,
//                     backgroundColor: PURPLE,
//                     width: i % 3 === 0 ? 5 : 4,
//                     height: i % 3 === 0 ? 5 : 4,
//                   },
//                 ]}
//               />
//             ))}
//           </View>
//         </View>

//         {/* Welcome + eGold logo */}
//         <View style={styles.welcomeRow}>
//           <AppText variant="lg" weight="semiBold" style={styles.welcomeText}>
//             Welcome to Your Vault!
//           </AppText>
//           <View style={styles.egoldLogoBadge}>
//             <View style={styles.egoldLogoInner}>
//               <AppText variant="base" weight="semiBold" style={styles.egoldLogoE}>e</AppText>
//               <AppText variant="base" weight="semiBold" style={styles.egoldLogoGold}>Gold</AppText>
//             </View>
//             <View style={styles.egoldLogoTag}>
//               <AppText variant="xs" weight="regular" style={styles.egoldLogoTagText}>by CARATLANE</AppText>
//             </View>
//           </View>
//         </View>

//         {/* Gold Balance Card */}
//         <View style={styles.balanceCard}>
//           <View style={styles.balanceLeft}>
//             <AppText variant="base" weight="semiBold" style={styles.balanceLabel}>
//               Gold balance
//             </AppText>
//             <AppText variant="xl" weight="semiBold" style={styles.balanceAmount}>
//               0.0000 gms
//             </AppText>
//           </View>
//           <View style={styles.vaultIconWrap}>
//             <View style={styles.vaultIcon}>
//               <Ionicons name="lock-closed" size={28} color="#888" />
//               <View style={styles.vaultKnob} />
//             </View>
//           </View>
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.actionsList}>
//           <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
//             <AppText variant="base" weight="semiBold" style={styles.actionText}>
//               Proceed to buy eGold
//             </AppText>
//             <Ionicons name="arrow-forward" size={20} color={PURPLE} />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
//             <AppText variant="base" weight="semiBold" style={styles.actionText}>
//               Proceed to Sell your Gold
//             </AppText>
//             <Ionicons name="arrow-forward" size={20} color={PURPLE} />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
//             <AppText variant="base" weight="semiBold" style={styles.actionText}>
//               Proceed to Gift
//             </AppText>
//             <Ionicons name="arrow-forward" size={20} color={PURPLE} />
//           </TouchableOpacity>
//         </View>

//         {/* Filter Section */}
//         <View style={styles.filterSection}>
//           {/* Filter Dropdowns */}
//           <View style={styles.filterDropdownRow}>
//             <TouchableOpacity
//               style={styles.filterDropdown}
//               onPress={() => setYearFilterOpen(!yearFilterOpen)}
//               activeOpacity={0.8}
//             >
//               <AppText variant="sm" weight="regular" style={styles.filterDropdownText}>Year</AppText>
//               <Ionicons
//                 name={yearFilterOpen ? 'chevron-up' : 'chevron-up'}
//                 size={16}
//                 color={TEXT_DARK}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.filterDropdown}
//               onPress={() => setOrderTypeOpen(!orderTypeOpen)}
//               activeOpacity={0.8}
//             >
//               <AppText variant="sm" weight="regular" style={styles.filterDropdownText}>Order Type</AppText>
//               <Ionicons name="chevron-down" size={16} color={TEXT_DARK} />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.filterDropdown}
//               onPress={() => setDistributorOpen(!distributorOpen)}
//               activeOpacity={0.8}
//             >
//               <AppText variant="sm" weight="regular" style={styles.filterDropdownText}>Distributor</AppText>
//               <Ionicons name="chevron-down" size={16} color={TEXT_DARK} />
//             </TouchableOpacity>
//           </View>

//           {/* Year Pills */}
//           <View style={styles.yearPillsRow}>
//             {YEARS.map((year) => (
//               <TouchableOpacity
//                 key={year}
//                 style={[
//                   styles.yearPill,
//                   selectedYear === year && styles.yearPillActive,
//                 ]}
//                 onPress={() => setSelectedYear(year)}
//                 activeOpacity={0.8}
//               >
//                 <AppText
//                   variant="sm"
//                   weight={selectedYear === year ? 'semiBold' : 'regular'}
//                   style={[
//                     styles.yearPillText,
//                     selectedYear === year && styles.yearPillTextActive,
//                   ]}
//                 >
//                   {year}
//                 </AppText>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Filter / Clear Buttons */}
//           <View style={styles.filterBtnRow}>
//             <TouchableOpacity
//               style={styles.filterBtn}
//               onPress={handleFilter}
//               activeOpacity={0.8}
//             >
//               <AppText variant="base" weight="semiBold" style={styles.filterBtnText}>Filter</AppText>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.clearBtn}
//               onPress={handleClear}
//               activeOpacity={0.8}
//             >
//               <AppText variant="base" weight="semiBold" style={styles.clearBtnText}>Clear</AppText>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* No Transaction Found */}
//         <View style={styles.noTransactionRow}>
//           <AppText variant="sm" weight="regular" style={styles.noTransactionText}>
//             No Transaction Found
//           </AppText>
//           {filtersApplied && selectedYear ? (
//             <TouchableOpacity
//               style={styles.activeFilterTag}
//               onPress={handleClear}
//               activeOpacity={0.8}
//             >
//               <AppText variant="xs" weight="regular" style={styles.activeFilterTagText}>
//                 {selectedYear} ✕
//               </AppText>
//             </TouchableOpacity>
//           ) : null}
//         </View>

//         {/* Delivery Illustration Section */}
//         <View style={styles.deliverySection}>
//           {/* Arrow pointing down */}
//           <View style={styles.arrowWrap}>
//             <View style={styles.arrowLine} />
//             <View style={styles.arrowHead} />
//           </View>

//           {/* Illustration */}
//           <View style={styles.illustrationWrap}>
//             {/* Delivery truck illustration using icons/shapes */}
//             <View style={styles.truckScene}>
//               {/* Shield with checkmark */}
//               <View style={styles.shieldWrap}>
//                 <View style={styles.shield}>
//                   <Ionicons name="checkmark-circle" size={22} color="#16a34a" />
//                 </View>
//               </View>
//               {/* Gift box on truck */}
//               <View style={styles.truckBody}>
//                 <View style={styles.giftBox}>
//                   <Ionicons name="gift-outline" size={28} color={PURPLE} />
//                 </View>
//                 {/* Truck cab */}
//                 <View style={styles.truckCab}>
//                   <Ionicons name="car-outline" size={20} color={PURPLE} />
//                 </View>
//               </View>
//               {/* Wheels */}
//               <View style={styles.wheelsRow}>
//                 <View style={styles.wheel} />
//                 <View style={styles.wheel} />
//               </View>
//               {/* Speed lines */}
//               <View style={styles.speedLines}>
//                 <View style={[styles.speedLine, { width: 24 }]} />
//                 <View style={[styles.speedLine, { width: 16 }]} />
//                 <View style={[styles.speedLine, { width: 20 }]} />
//               </View>
//               {/* Sparkles */}
//               <View style={styles.sparkleTopRight}>
//                 <AppText style={styles.sparkleText}>+</AppText>
//               </View>
//               <View style={styles.sparkleMid}>
//                 <AppText style={styles.sparkleText}>·</AppText>
//               </View>
//             </View>
//           </View>

//           <AppText variant="lg" weight="semiBold" style={styles.deliveryText}>
//             Get it delivered at{'\n'}your Doorstep, free of{'\n'}cost!
//           </AppText>
//         </View>

//         {/* View Buttons Section */}
//         <View style={styles.viewBtnsSection}>
//           <TouchableOpacity style={styles.viewBtn} activeOpacity={0.8}>
//             <AppText variant="base" weight="semiBold" style={styles.viewBtnText}>
//               View all Gold coins
//             </AppText>
//           </TouchableOpacity>

//           <AppText variant="base" weight="regular" style={styles.orText}>OR</AppText>

//           <TouchableOpacity style={styles.viewBtn} activeOpacity={0.8}>
//             <AppText variant="base" weight="semiBold" style={styles.viewBtnText}>
//               View Jewellery
//             </AppText>
//           </TouchableOpacity>
//         </View>

//         {/* Redeem Info */}
//         <View style={styles.redeemInfoRow}>
//           <View style={styles.redeemIconWrap}>
//             <Ionicons name="shield" size={32} color={PURPLE} />
//             <View style={styles.redeemIconBadge}>
//               <Ionicons name="alert" size={12} color="#fff" />
//             </View>
//           </View>
//           <AppText variant="sm" weight="regular" style={styles.redeemInfoText}>
//             You can also Redeem your Gold Balance online as well as offline stores of caratlane &amp; our Jewellery Partner
//           </AppText>
//         </View>
//       </ScrollView>

//       {/* Floating Support Button */}
//       <TouchableOpacity style={[styles.floatingBtn, { bottom: insets.bottom + 16 }]} activeOpacity={0.8}>
//         <Ionicons name="call" size={20} color="#fff" />
//       </TouchableOpacity>
//     </ScreenLayout>
//   );
// }

// const styles = StyleSheet.create({
//   scroll: { flex: 1, backgroundColor: '#fff' },
//   scrollContent: {
//     paddingBottom: 100,
//     backgroundColor: '#fff',
//   },

//   // Nav
//   navBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: SPACING.base,
//     paddingVertical: SPACING.sm,
//     gap: SPACING.sm,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: BORDER_COLOR,
//   },
//   backBtn: {
//     padding: 4,
//   },
//   logoWrap: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width: 36,
//     gap: 3,
//   },
//   logoDot: {
//     borderRadius: 10,
//   },

//   // Welcome Row
//   welcomeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: SPACING.base,
//     paddingTop: SPACING.lg,
//     paddingBottom: SPACING.sm,
//   },
//   welcomeText: {
//     fontSize: 18,
//     color: TEXT_DARK,
//     fontWeight: '600',
//   },
//   egoldLogoBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 6,
//     overflow: 'hidden',
//   },
//   egoldLogoInner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#d4a017',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   egoldLogoE: {
//     fontSize: 18,
//     color: '#fff',
//     fontStyle: 'italic',
//     fontWeight: '700',
//   },
//   egoldLogoGold: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: '700',
//     marginLeft: 2,
//   },
//   egoldLogoTag: {
//     backgroundColor: '#3b0764',
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     alignSelf: 'stretch',
//     justifyContent: 'center',
//   },
//   egoldLogoTagText: {
//     fontSize: 9,
//     color: '#fff',
//     fontWeight: '600',
//     letterSpacing: 0.3,
//   },

//   // Balance Card
//   balanceCard: {
//     marginHorizontal: SPACING.base,
//     marginTop: SPACING.sm,
//     backgroundColor: '#f3f0fc',
//     borderRadius: 12,
//     padding: SPACING.lg,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   balanceLeft: {},
//   balanceLabel: {
//     fontSize: 15,
//     color: PURPLE,
//     fontWeight: '600',
//     marginBottom: SPACING.xs,
//   },
//   balanceAmount: {
//     fontSize: 26,
//     color: TEXT_DARK,
//     fontWeight: '600',
//   },
//   vaultIconWrap: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#e5e7eb',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   vaultIcon: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   vaultKnob: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#aaa',
//     marginTop: 2,
//   },

//   // Actions List
//   actionsList: {
//     marginHorizontal: SPACING.base,
//     marginTop: SPACING.xl,
//     gap: SPACING.sm,
//   },
//   actionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1.5,
//     borderColor: PURPLE_LIGHT,
//     borderRadius: 10,
//     paddingVertical: SPACING.base,
//     paddingHorizontal: SPACING.base,
//     backgroundColor: '#fff',
//   },
//   actionText: {
//     fontSize: 15,
//     color: PURPLE,
//     fontWeight: '600',
//   },

//   // Filter Section
//   filterSection: {
//     marginTop: SPACING.xl,
//     paddingHorizontal: SPACING.base,
//     gap: SPACING.base,
//   },
//   filterDropdownRow: {
//     flexDirection: 'row',
//     gap: SPACING.sm,
//   },
//   filterDropdown: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   filterDropdownText: {
//     fontSize: 13,
//     color: TEXT_DARK,
//   },
//   yearPillsRow: {
//     flexDirection: 'row',
//     gap: SPACING.sm,
//   },
//   yearPill: {
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     backgroundColor: '#fff',
//   },
//   yearPillActive: {
//     backgroundColor: PURPLE,
//     borderColor: PURPLE,
//   },
//   yearPillText: {
//     fontSize: 13,
//     color: TEXT_DARK,
//   },
//   yearPillTextActive: {
//     color: '#fff',
//   },
//   filterBtnRow: {
//     flexDirection: 'row',
//     gap: SPACING.sm,
//   },
//   filterBtn: {
//     flex: 1,
//     backgroundColor: PURPLE,
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   filterBtnText: {
//     fontSize: 15,
//     color: '#fff',
//     fontWeight: '700',
//   },
//   clearBtn: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//   },
//   clearBtnText: {
//     fontSize: 15,
//     color: TEXT_DARK,
//     fontWeight: '600',
//   },

//   // No Transaction
//   noTransactionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: SPACING.base,
//     paddingTop: SPACING.lg,
//   },
//   noTransactionText: {
//     fontSize: 14,
//     color: TEXT_MUTED,
//   },
//   activeFilterTag: {
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     backgroundColor: '#fff',
//   },
//   activeFilterTagText: {
//     fontSize: 12,
//     color: TEXT_DARK,
//   },

//   // Floating Button
//   floatingBtn: {
//     position: 'absolute',
//     right: 16,
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: PURPLE,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.25,
//     shadowRadius: 6,
//     elevation: 6,
//   },

//   // Delivery Section
//   deliverySection: {
//     marginTop: SPACING.xl,
//     backgroundColor: '#f3f0fc',
//     alignItems: 'center',
//     paddingBottom: SPACING.xl,
//     paddingTop: SPACING.sm,
//   },
//   arrowWrap: {
//     alignItems: 'center',
//     marginBottom: SPACING.sm,
//   },
//   arrowLine: {
//     width: 1.5,
//     height: 60,
//     backgroundColor: PURPLE,
//   },
//   arrowHead: {
//     width: 0,
//     height: 0,
//     borderLeftWidth: 7,
//     borderRightWidth: 7,
//     borderTopWidth: 10,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderTopColor: PURPLE,
//     marginTop: -1,
//   },
//   illustrationWrap: {
//     width: 180,
//     height: 120,
//     marginBottom: SPACING.base,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   truckScene: {
//     width: 180,
//     height: 110,
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   shieldWrap: {
//     position: 'absolute',
//     left: 20,
//     top: 10,
//     zIndex: 2,
//   },
//   shield: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: '#fff',
//     borderWidth: 2,
//     borderColor: PURPLE,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   truckBody: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     position: 'absolute',
//     right: 10,
//     top: 15,
//   },
//   giftBox: {
//     width: 50,
//     height: 46,
//     backgroundColor: '#fff',
//     borderWidth: 1.5,
//     borderColor: PURPLE,
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   truckCab: {
//     width: 36,
//     height: 36,
//     backgroundColor: PURPLE_LIGHT,
//     borderWidth: 1.5,
//     borderColor: PURPLE,
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 2,
//   },
//   wheelsRow: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 4,
//     right: 14,
//     gap: 28,
//   },
//   wheel: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: PURPLE,
//     borderWidth: 3,
//     borderColor: '#fff',
//     shadowColor: PURPLE,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.4,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   speedLines: {
//     position: 'absolute',
//     left: 4,
//     bottom: 20,
//     gap: 4,
//   },
//   speedLine: {
//     height: 2,
//     backgroundColor: PURPLE,
//     borderRadius: 2,
//     opacity: 0.4,
//   },
//   sparkleTopRight: {
//     position: 'absolute',
//     right: 6,
//     top: 6,
//   },
//   sparkleMid: {
//     position: 'absolute',
//     right: 60,
//     top: 4,
//   },
//   sparkleText: {
//     fontSize: 16,
//     color: PURPLE,
//     fontWeight: '700',
//     opacity: 0.5,
//   },
//   deliveryText: {
//     fontSize: 18,
//     color: TEXT_DARK,
//     fontWeight: '600',
//     textAlign: 'center',
//     lineHeight: 26,
//     marginTop: SPACING.sm,
//   },

//   // View Buttons
//   viewBtnsSection: {
//     paddingHorizontal: SPACING.base,
//     paddingTop: SPACING.xl,
//     gap: SPACING.sm,
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//     paddingBottom: SPACING.lg,
//   },
//   viewBtn: {
//     width: '100%',
//     borderWidth: 2,
//     borderColor: PURPLE,
//     borderRadius: 10,
//     paddingVertical: 14,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   viewBtnText: {
//     fontSize: 15,
//     color: TEXT_DARK,
//     fontWeight: '700',
//   },
//   orText: {
//     fontSize: 15,
//     color: TEXT_DARK,
//     fontWeight: '500',
//     marginVertical: SPACING.xs,
//   },

//   // Redeem Info
//   redeemInfoRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingHorizontal: SPACING.base,
//     paddingTop: SPACING.lg,
//     paddingBottom: SPACING.xl,
//     gap: SPACING.sm,
//     backgroundColor: '#f5f5f5',
//   },
//   redeemIconWrap: {
//     width: 40,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   redeemIconBadge: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: PURPLE,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   redeemInfoText: {
//     flex: 1,
//     fontSize: 13,
//     color: TEXT_MUTED,
//     lineHeight: 20,
//   },
// });
