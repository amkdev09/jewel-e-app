import { AppText } from '@/components/AppText';
import { SPACING } from '@/constants/index';
import { ScreenLayout } from '@/src/layouts/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PURPLE = '#7c3aed';
const PURPLE_LIGHT = '#ede9fe';
const TEXT_DARK = '#1a1a1a';
const TEXT_MUTED = '#9ca3af';
const BORDER_COLOR = '#e5e7eb';
const BG = '#f3f3f7';
const WHITE = '#ffffff';
const CARD_BG = '#ebebf0';

const BANK_LIST = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Yes Bank',
];

export default function AddPaymentMethodScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState('bank');

  // Bank form
  const [fullName, setFullName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [reAccountNumber, setReAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);

  // UPI form
  const [upiId, setUpiId] = useState('');

  const [errors, setErrors] = useState({});

  const validateBank = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (!bankName) e.bankName = 'Please select a bank';
    if (!accountNumber.trim()) e.accountNumber = 'Account number is required';
    else if (!/^\d{9,18}$/.test(accountNumber.trim())) e.accountNumber = 'Enter a valid account number';
    if (!reAccountNumber.trim()) e.reAccountNumber = 'Please re-enter account number';
    else if (accountNumber !== reAccountNumber) e.reAccountNumber = 'Account numbers do not match';
    if (!ifscCode.trim()) e.ifscCode = 'IFSC code is required';
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode.trim().toUpperCase())) e.ifscCode = 'Enter a valid IFSC code';
    return e;
  };

  const validateUpi = () => {
    const e = {};
    if (!upiId.trim()) e.upiId = 'UPI ID is required';
    else if (!/^[\w.\-_]{3,}@[a-zA-Z]{3,}$/.test(upiId.trim())) e.upiId = 'Enter a valid UPI ID (e.g. name@upi)';
    return e;
  };

  const handleSave = () => {
    const e = activeTab === 'bank' ? validateBank() : validateUpi();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      Alert.alert('Success', 'Details saved successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  };

  const selectBank = (name) => {
    setBankName(name);
    setBankDropdownOpen(false);
    setErrors((prev) => ({ ...prev, bankName: undefined }));
  };

  const clearError = (field) => setErrors((p) => ({ ...p, [field]: undefined }));

  return (
    <ScreenLayout noPadding>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ── Header ── */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={26} color={TEXT_DARK} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Manage Refunds</AppText>
          <View style={styles.headerRight} />
        </View>

        {/* ── Info Banner ── */}
        <View style={styles.infoBanner}>
          <AppText style={styles.infoText}>
            Sharing bank account/UPI details is mandatory to complete PoP{'\n'}instalment/Refund flow as per guidelines.
          </AppText>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 110 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Bank Account Section ── */}
          <View style={styles.sectionCard}>
            {/* Radio row — tapping toggles to bank */}
            <TouchableOpacity
              style={styles.radioRow}
              onPress={() => { setActiveTab('bank'); setBankDropdownOpen(false); }}
              activeOpacity={0.8}
            >
              <View style={[styles.radioOuter, activeTab === 'bank' && styles.radioOuterActive]}>
                {activeTab === 'bank' && <View style={styles.radioInner} />}
              </View>
              <AppText style={styles.radioLabel}>Add Bank Account</AppText>
            </TouchableOpacity>

            {/* Bank fields — shown when active */}
            {activeTab === 'bank' && (
              <View style={styles.fieldsWrap}>
                {/* Full Name */}
                <InputField
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={(v) => { setFullName(v); clearError('fullName'); }}
                  autoCapitalize="words"
                  error={errors.fullName}
                />

                {/* Bank Name Dropdown */}
                <View style={styles.fieldWrap}>
                  <TouchableOpacity
                    style={[styles.inputBox, styles.dropdownBox, errors.bankName && styles.inputBoxError]}
                    onPress={() => setBankDropdownOpen(!bankDropdownOpen)}
                    activeOpacity={0.8}
                  >
                    <AppText style={bankName ? styles.inputText : styles.placeholderText}>
                      {bankName || 'Bank Name'}
                    </AppText>
                    <Ionicons
                      name={bankDropdownOpen ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={TEXT_MUTED}
                    />
                  </TouchableOpacity>
                  {errors.bankName && <AppText style={styles.errorText}>{errors.bankName}</AppText>}
                  {bankDropdownOpen && (
                    <View style={styles.dropdown}>
                      <ScrollView nestedScrollEnabled style={{ maxHeight: 220 }}>
                        {BANK_LIST.map((b) => (
                          <TouchableOpacity
                            key={b}
                            style={[styles.dropdownItem, bankName === b && styles.dropdownItemActive]}
                            onPress={() => selectBank(b)}
                            activeOpacity={0.7}
                          >
                            <AppText style={[styles.dropdownItemText, bankName === b && styles.dropdownItemTextActive]}>
                              {b}
                            </AppText>
                            {bankName === b && <Ionicons name="checkmark" size={16} color={PURPLE} />}
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* Account Number */}
                <InputField
                  placeholder="Account Number"
                  value={accountNumber}
                  onChangeText={(v) => { setAccountNumber(v); clearError('accountNumber'); }}
                  keyboardType="numeric"
                  secureTextEntry
                  error={errors.accountNumber}
                />

                {/* Re-enter Account Number */}
                <InputField
                  placeholder="Re-enter Account Number"
                  value={reAccountNumber}
                  onChangeText={(v) => { setReAccountNumber(v); clearError('reAccountNumber'); }}
                  keyboardType="numeric"
                  error={errors.reAccountNumber}
                />

                {/* IFSC Code */}
                <InputField
                  placeholder="IFSC Code"
                  value={ifscCode}
                  onChangeText={(v) => { setIfscCode(v.toUpperCase()); clearError('ifscCode'); }}
                  autoCapitalize="characters"
                  maxLength={11}
                  error={errors.ifscCode}
                  last
                />
              </View>
            )}
          </View>

          {/* ── UPI Section ── */}
          <View style={styles.sectionCard}>
            <TouchableOpacity
              style={styles.radioRow}
              onPress={() => { setActiveTab('upi'); setBankDropdownOpen(false); }}
              activeOpacity={0.8}
            >
              <View style={[styles.radioOuter, activeTab === 'upi' && styles.radioOuterActive]}>
                {activeTab === 'upi' && <View style={styles.radioInner} />}
              </View>
              <AppText style={styles.radioLabel}>Add UPI ID</AppText>
            </TouchableOpacity>

            {activeTab === 'upi' && (
              <View style={styles.fieldsWrap}>
                <InputField
                  placeholder="Beneficiary UPI ID"
                  value={upiId}
                  onChangeText={(v) => { setUpiId(v); clearError('upiId'); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.upiId}
                  last
                />
              </View>
            )}
          </View>
        </ScrollView>

        {/* ── Save Button ── */}
        <View style={[styles.saveWrap, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity onPress={handleSave} activeOpacity={0.85} style={styles.saveBtnOuter}>
            <LinearGradient
              colors={['#d05ce3', '#7c3aed']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveBtn}
            >
              <AppText style={styles.saveBtnText}>Save Details</AppText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}

// ── Reusable Input Field ─────────────────────────────────────────────────────
function InputField({ placeholder, value, onChangeText, error, last, ...rest }) {
  return (
    <View style={[styles.fieldWrap, last && { marginBottom: 0 }]}>
      <TextInput
        style={[styles.inputBox, error && styles.inputBoxError]}
        placeholder={placeholder}
        placeholderTextColor={TEXT_MUTED}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {error ? <AppText style={styles.errorText}>{error}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingBottom: 14,
    backgroundColor: WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
  },
  backBtn: { width: 36, alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: TEXT_DARK },
  headerRight: { width: 36 },

  // ── Info Banner ──
  infoBanner: {
    backgroundColor: '#eeeeff',
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
  },
  infoText: {
    fontSize: 13,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
  },

  // ── Scroll ──
  scroll: { flex: 1, backgroundColor: BG },
  scrollContent: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    gap: SPACING.base,
  },

  // ── Section Card ──
  sectionCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.base,
  },

  // ── Radio ──
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#c4c4d0',
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: PURPLE,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: PURPLE,
  },
  radioLabel: {
    fontSize: 16,
    color: TEXT_DARK,
    fontWeight: '500',
  },

  // ── Fields ──
  fieldsWrap: {
    marginTop: SPACING.base,
    gap: SPACING.sm,
  },
  fieldWrap: {
    gap: 4,
  },
  inputBox: {
    backgroundColor: WHITE,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 17,
    fontSize: 15,
    color: TEXT_DARK,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputBoxError: {
    borderColor: '#ef4444',
  },
  inputText: {
    fontSize: 15,
    color: TEXT_DARK,
  },
  placeholderText: {
    fontSize: 15,
    color: TEXT_MUTED,
  },
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginLeft: 4,
    marginTop: 2,
  },

  // ── Dropdown ──
  dropdown: {
    backgroundColor: WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    zIndex: 99,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
  },
  dropdownItemActive: { backgroundColor: PURPLE_LIGHT },
  dropdownItemText: { fontSize: 14, color: TEXT_DARK },
  dropdownItemTextActive: { color: PURPLE, fontWeight: '600' },

  // ── Save Button ──
  saveWrap: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.sm,
    backgroundColor: BG,
  },
  saveBtnOuter: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveBtn: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 16,
  },
  saveBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: WHITE,
    letterSpacing: 0.4,
  },
});