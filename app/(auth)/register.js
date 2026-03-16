// app/(auth)/register.js
import { AppText } from '@/components/AppText';
import { SPACING } from '@/constants';
import { AuthLayout } from '@/src/layouts/AuthLayout';
import { useAuthStore } from '@/src/store/auth.store';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppInput from '../../src/components/ui/AppInput';

export default function RegisterScreen() {
  const register = useAuthStore((s) => s.register);

  const [countryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState('unspecified'); // 'female' | 'male' | 'unspecified'
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim()) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!firstName.trim() || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!termsAccepted) {
      Alert.alert('Error', 'Please accept the terms & conditions');
      return;
    }

    setEmailError('');
    setLoading(true);
    const result = await register({
      name: `${firstName.trim()} ${lastName.trim()}`.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (!result.success) {
      Alert.alert('Registration Failed', result.message || 'Please try again');
    }
    // Success navigation is handled inside the store / layout in this project.
  };

  const disabled =
    loading ||
    !email.trim() ||
    !firstName.trim() ||
    !password ||
    !confirmPassword ||
    !termsAccepted;

  return (
    <AuthLayout>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Mobile field */}
        <View style={styles.mobileRow}>
          <View style={styles.countryContainer}>
            <AppText style={styles.countryCodeText}>{countryCode}</AppText>
            <Feather name="chevron-down" size={16} color="#4B5563" />
          </View>
          <TextInput
            style={styles.mobileInput}
            placeholder="Mobile"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
            editable={!loading}
          />
        </View>

        {/* Email with error */}
        <View style={styles.fieldBlock}>
          <AppInput
            placeholder="Enter Email"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (emailError) setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          {!!emailError && <AppText style={styles.errorText}>{emailError}</AppText>}
        </View>

        {/* First / Last name row with floating labels */}
        <View style={styles.nameRow}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#9CA3AF"
            style={styles.floatingField}
            value={firstName}
            onChangeText={setFirstName}
            editable={!loading}
          />
          <View style={styles.nameSpacer} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#9CA3AF"
            style={styles.floatingField}
            value={lastName}
            onChangeText={setLastName}
            editable={!loading}
          />
        </View>

        {/* Password */}
        <View style={styles.fieldBlock}>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
              <Feather name={showPassword ? 'eye' : 'eye-off'} size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordHintRow}>
            {['8 Chrs', '1 Uppercase', '1 Lowercase', '1 Symbol', '1 Number'].map((hint) => (
              <AppText key={hint} style={styles.passwordHintText}>
                <Text style={styles.passwordHintTextDot}>●</Text> {hint}
              </AppText>
            ))}
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.fieldBlock}>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword((prev) => !prev)} hitSlop={8}>
              <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Gender */}
        <View style={styles.genderRow}>
          <GenderOption
            label="Female"
            selected={gender === 'female'}
            onPress={() => setGender('female')}
          />
          <GenderOption
            label="Male"
            selected={gender === 'male'}
            onPress={() => setGender('male')}
          />
          <GenderOption
            label="I don't want to specify"
            selected={gender === 'unspecified'}
            onPress={() => setGender('unspecified')}
          />
        </View>

        {/* WhatsApp consent card */}
        <TouchableOpacity
          style={styles.whatsappCard}
          activeOpacity={0.9}
          onPress={() => setWhatsappOptIn((prev) => !prev)}
        >
          <View style={styles.whatsappLeft}>
            <View
              style={[styles.whatsappCheckOuter, whatsappOptIn && styles.whatsappCheckOuterActive]}
            >
              {whatsappOptIn && <MaterialCommunityIcons name="check" size={14} color="#FFFFFF" />}
            </View>
            <View style={styles.whatsappTextContainer}>
              <AppText style={styles.whatsappTitle}>Opt for WhatsApp & SMS support</AppText>
              <AppText style={styles.whatsappSubtitle}>
                We'll share your delivery updates, order documents, and marketing messages via
                WhatsApp and SMS.
              </AppText>
            </View>
          </View>
          <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
        </TouchableOpacity>

        {/* Terms & Conditions */}
        <View style={styles.termsRow}>
          <TouchableOpacity
            style={styles.checkboxOuter}
            onPress={() => setTermsAccepted((prev) => !prev)}
          >
            {termsAccepted && <MaterialCommunityIcons name="check" size={16} color="#7C3AED" />}
          </TouchableOpacity>
          <View style={styles.termsTextWrapper}>
            <AppText style={styles.termsText}>
              By continuing you acknowledge that you are at least 18 years old and have read and
              agree to CaratLane's <AppText style={styles.linkText}>T&C</AppText> and{' '}
              <AppText style={styles.linkText}>Privacy Policy</AppText>.
            </AppText>
          </View>
        </View>

        {/* Primary button */}
        <TouchableOpacity
          style={[styles.primaryButton, disabled && styles.primaryButtonDisabled]}
          disabled={disabled}
          onPress={handleRegister}
        >
          <AppText style={styles.primaryButtonText}>
            {loading ? 'SIGNING YOU UP...' : 'SIGN ME UP'}
          </AppText>
        </TouchableOpacity>

        {/* Bottom login link */}
        <View style={styles.bottomLoginRow}>
          <AppText style={styles.bottomLoginText}>Already have an account? </AppText>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <AppText style={styles.bottomLoginLink}>Login</AppText>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </AuthLayout>
  );
}

function GenderOption({ label, selected, onPress }) {
  return (
    <TouchableOpacity style={styles.genderOption} onPress={onPress}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <AppText style={styles.genderLabel}>{label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: SPACING.xxs,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },

  // Mobile
  mobileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  flagCircle: {
    width: 20,
    height: 14,
    borderRadius: 3,
    backgroundColor: '#F97316',
    marginRight: 6,
  },
  countryCodeText: {
    fontSize: 14,
    color: '#111827',
    marginRight: 4,
  },
  mobileInput: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#111827',
  },

  fieldBlock: {
    marginBottom: 16,
  },

  textInput: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  emailInput: {
    borderRadius: 10,
  },
  inputError: {
    borderColor: '#F97373',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#F97373',
  },

  // Name row with floating label
  nameRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  nameSpacer: {
    width: 12,
  },
  floatingField: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: '#FFFFFF',
  },
  floatingLabel: {
    fontSize: 10,
    color: '#4B5563',
    marginBottom: 2,
  },
  floatingInput: {
    padding: 0,
    margin: 0,
    fontSize: 14,
    color: '#111827',
  },

  // Passwords
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#F9FAFB',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 0,
    marginRight: 8,
    fontSize: 14,
    color: '#111827',
  },
  passwordHintRow: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  passwordHintText: {
    fontSize: 10,
    color: '#6B7280',
  },
  passwordHintTextDot: {
    fontSize: 10,
    color: '#6B7179',
    marginRight: 4,
  },

  // Gender
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  radioOuterSelected: {
    borderColor: '#7C3AED',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7C3AED',
  },
  genderLabel: {
    fontSize: 12,
    color: '#111827',
  },

  // WhatsApp card
  whatsappCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E9FDE6',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  whatsappLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 10,
  },
  whatsappCheckOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#7C3AED',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  whatsappCheckOuterActive: {
    backgroundColor: '#7C3AED',
  },
  whatsappTextContainer: {
    flex: 1,
  },
  whatsappTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  whatsappSubtitle: {
    fontSize: 11,
    color: '#4B5563',
  },

  // Terms
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 26,
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  termsTextWrapper: {
    flex: 1,
  },
  termsText: {
    fontSize: 11,
    color: '#4B5563',
  },
  linkText: {
    color: '#7C3AED',
    textDecorationLine: 'underline',
  },

  // Primary button
  primaryButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5D7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#6B21A8',
  },

  // Bottom login
  bottomLoginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bottomLoginText: {
    fontSize: 12,
    color: '#6B7280',
  },
  bottomLoginLink: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '600',
  },
});
