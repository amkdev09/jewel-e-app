// app/(auth)/register.js
import AppInput from '@/components/ui/appInput';
import AppText from '@/components/ui/appText';
import PasswordInput from '@/components/ui/passwordInput';
import PhoneInput from '@/components/ui/phoneInput';
import { APP_COLORS, SPACING } from '@/constants';
import { AuthLayout } from '@/src/layouts/AuthLayout';
import { useAuthStore } from '@/src/store/auth.store';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
const passwordSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'At least one uppercase letter')
  .matches(/[a-z]/, 'At least one lowercase letter')
  .matches(/[0-9]/, 'At least one number')
  .matches(/[^A-Za-z0-9]/, 'At least one symbol')
  .required('Password is required');

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().trim().min(2, 'First name is too short').max(100, 'First name is too long').required('First name is required'),
  lastName: Yup.string().trim().max(100, 'Last name is too long'),
  email: Yup.string().trim().email('Please enter a valid email').required('Email is required'),
  countryCode: Yup.string().matches(/^\+\d+$/, 'Invalid country code').required('Country code is required'),
  mobile: Yup.string()
    .trim()
    .min(8, 'Mobile must be at least 8 digits')
    .max(15, 'Mobile must be at most 15 digits')
    .required('Mobile is required'),
  password: passwordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
  gender: Yup.string().oneOf(['female', 'male', 'unspecified']).default('unspecified'),
  whatsappOptIn: Yup.boolean().default(true),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms & conditions'),
});

export default function RegisterScreen() {
  const register = useAuthStore((s) => s.register);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const openTc = () => Linking.openURL('https://www.caratlane.com/terms').catch(() => {});
  const openPrivacy = () => Linking.openURL('https://www.caratlane.com/privacy').catch(() => {});

  const handleRegister = async (values) => {
    if (loading) return;
    setLoading(true);

    const fullName = `${values.firstName.trim()} ${values.lastName?.trim() || ''}`.trim();
    const payload = {
      name: fullName,
      email: values.email.trim(),
      countryCode: values.countryCode,
      phone: values.mobile.trim(),
      password: values.password,
      gender:
        values.gender === 'unspecified' ? 'prefer_not_to_say' : values.gender,
    };

    const result = await register(payload);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Registration Failed', result.message || 'Please try again');
    }
    // Success navigation is handled inside the store / layout in this project.
  };

  return (
    <AuthLayout>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={APP_COLORS.darkText} />
        </TouchableOpacity>
        {/* Top signup hero */}
        <View style={styles.heroContainer}>
          <View style={styles.heroLogoWrapper}>
            <View style={styles.heroLogoInner}>
              <Ionicons name="sparkles-outline" size={20} color="#7C3AED" />
            </View>
          </View>
          <AppText variant="xl" weight="semiBold" style={styles.title}>
            Signup with CaratLane
          </AppText>
          <AppText variant="sm" weight="regular" style={styles.desc}>
            Unlock best prices and become an insider for our exclusive launches &amp; offers.
            Complete your profile and get ₹500 worth of xClusive Points.
          </AppText>

          {/* WhatsApp signup CTA */}
          <TouchableOpacity
            style={styles.whatsappBtn}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#25d366" />
            <AppText variant="sm" weight="semiBold" style={styles.whatsappBtnText}>
              SIGNUP WITH WHATSAPP
            </AppText>
          </TouchableOpacity>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.8}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Ionicons name="logo-google" size={28} color="#4285F4" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialBtn, styles.facebookBtn]}
              activeOpacity={0.8}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Ionicons name="logo-facebook" size={28} color="#1877f2" />
            </TouchableOpacity>
          </View>

          {/* Helper legal text */}
          <View style={styles.tcTextWrap}>
            <AppText variant="xs" weight="regular" style={styles.tcText}>
              By continuing you acknowledge that you are at least 18 years old and have read and
              agree to CaratLane&apos;s{' '}
            </AppText>
            <TouchableOpacity onPress={openTc}>
              <AppText variant="xs" weight="semiBold" style={styles.tcLink}>
                T&C
              </AppText>
            </TouchableOpacity>
            <AppText variant="xs" weight="regular" style={styles.tcText}>
              {' '}
            </AppText>
            <TouchableOpacity onPress={openPrivacy}>
              <AppText variant="xs" weight="semiBold" style={styles.tcLink}>
                Privacy Policy.
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.orWrap}>
          <View style={styles.orLine} />
          <AppText variant="sm" weight="medium" style={styles.orText}>
            OR
          </AppText>
          <View style={styles.orLine} />
        </View>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            countryCode: '+91',
            mobile: '',
            password: '',
            confirmPassword: '',
            gender: 'unspecified',
            whatsappOptIn: true,
            termsAccepted: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
          validateOnBlur
          validateOnChange={false}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => {
            const passwordChecks = [
              {
                label: '8 Chrs',
                isValid: values.password.length >= 8,
              },
              {
                label: '1 Uppercase',
                isValid: /[A-Z]/.test(values.password),
              },
              {
                label: '1 Lowercase',
                isValid: /[a-z]/.test(values.password),
              },
              {
                label: '1 Symbol',
                isValid: /[^A-Za-z0-9]/.test(values.password),
              },
              {
                label: '1 Number',
                isValid: /[0-9]/.test(values.password),
              },
            ];

            const disabled = loading;

            return (
              <>
                {/* Mobile field */}
                <PhoneInput
                  label="Mobile"
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  error={touched.mobile && errors.mobile ? errors.mobile : ''}
                  countryCode={values.countryCode}
                  onCountryCodeChange={(code) => setFieldValue('countryCode', code)}
                  editable={!loading}
                />

                {/* Email with error */}
                <AppInput
                  label="Enter Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                  error={touched.email && errors.email ? errors.email : ''}
                />

                {/* First / Last name row with floating labels */}
                <View style={styles.nameRow}>
                  <AppInput
                    label="First Name"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    editable={!loading}
                    error={touched.firstName && errors.firstName ? errors.firstName : ''}
                  />
                  <AppInput
                    label="Last Name"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    editable={!loading}
                    error={touched.lastName && errors.lastName ? errors.lastName : ''}
                  />
                </View>

                {/* Password */}
                <View style={styles.fieldBlock}>
                  <PasswordInput
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={touched.password && errors.password ? errors.password : ''}
                    editable={!loading}
                  />
                  <View style={styles.passwordHintRow}>
                    {passwordChecks.map((hint) => (
                      <AppText
                        key={hint.label}
                        style={[
                          styles.passwordHintText,
                          hint.isValid && { color: '#059669' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.passwordHintTextDot,
                            hint.isValid && { color: '#059669' },
                          ]}
                        >
                          ●
                        </Text>{' '}
                        {hint.label}
                      </AppText>
                    ))}
                  </View>
                </View>

                {/* Confirm Password */}
                <PasswordInput
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ''
                  }
                  editable={!loading}
                />

                {/* Gender */}
                <View style={styles.genderRow}>
                  <GenderOption
                    label="Female"
                    selected={values.gender === 'female'}
                    onPress={() => setFieldValue('gender', 'female')}
                  />
                  <GenderOption
                    label="Male"
                    selected={values.gender === 'male'}
                    onPress={() => setFieldValue('gender', 'male')}
                  />
                  <GenderOption
                    label="I don't want to specify"
                    selected={values.gender === 'unspecified'}
                    onPress={() => setFieldValue('gender', 'unspecified')}
                  />
                </View>

                {/* WhatsApp consent card */}
                <TouchableOpacity
                  style={styles.whatsappCard}
                  activeOpacity={0.9}
                  onPress={() => setFieldValue('whatsappOptIn', !values.whatsappOptIn)}
                >
                  <View style={styles.whatsappLeft}>
                    <View
                      style={[
                        styles.whatsappCheckOuter,
                        values.whatsappOptIn && styles.whatsappCheckOuterActive,
                      ]}
                    >
                      {values.whatsappOptIn && (
                        <MaterialCommunityIcons name="check" size={14} color="#FFFFFF" />
                      )}
                    </View>
                    <View style={styles.whatsappTextContainer}>
                      <AppText style={styles.whatsappTitle}>
                        Opt for WhatsApp & SMS support
                      </AppText>
                      <AppText style={styles.whatsappSubtitle}>
                        We&apos;ll share your delivery updates, order documents, and marketing
                        messages via WhatsApp and SMS.
                      </AppText>
                    </View>
                  </View>
                  <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                </TouchableOpacity>

                {/* Terms & Conditions */}
                <View style={styles.termsRow}>
                  <TouchableOpacity
                    style={styles.checkboxOuter}
                    onPress={() => setFieldValue('termsAccepted', !values.termsAccepted)}
                  >
                    {values.termsAccepted && (
                      <MaterialCommunityIcons name="check" size={14} color="#7C3AED" />
                    )}
                  </TouchableOpacity>
                  <View style={styles.termsTextWrapper}>
                    <AppText style={styles.termsText}>
                      By continuing you acknowledge that you are at least 18 years old and have read
                      and agree to CaratLane&apos;s{' '}
                      <AppText style={styles.linkText}>T&C</AppText> and{' '}
                      <AppText style={styles.linkText}>Privacy Policy</AppText>.
                    </AppText>
                    {errors.termsAccepted && (
                      <AppText style={styles.errorText}>{errors.termsAccepted}</AppText>
                    )}
                  </View>
                </View>

                {/* Primary button */}
                <TouchableOpacity
                  style={[styles.primaryButton, disabled && styles.primaryButtonDisabled]}
                  disabled={disabled}
                  onPress={handleSubmit}
                >
                  <AppText style={styles.primaryButtonText}>
                    {loading ? 'SIGNING YOU UP...' : 'SIGN ME UP'}
                  </AppText>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>

        {/* Bottom login link */}
        <View style={styles.bottomLoginRow}>
          <AppText variant="sm" weight="regular" style={styles.bottomLoginText}>
            Already have an account?{' '}
          </AppText>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <AppText variant="sm" weight="semiBold" style={styles.bottomLoginLink}>
                Login
              </AppText>
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

  // Hero
  heroContainer: {
    flex: 1,
  },
  heroLogoWrapper: {
    alignSelf: 'center',
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#F9FAFB',
  },
  heroLogoInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: APP_COLORS.primary.a,
    textAlign: 'center',
  },
  desc: {
    color: APP_COLORS.darkText,
    marginVertical: SPACING.xxl,
    textAlign: 'center',
  },
  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: '#e6f6e6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#25d366',
    marginBottom: SPACING.base,
    gap: SPACING.base,
  },
  whatsappBtnText: {
    color: APP_COLORS.primary.a,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.base,
    marginVertical: SPACING.xxl,
  },
  socialBtn: {
    width: 46,
    height: 46,
    borderRadius: 28,
    backgroundColor: '#fff4eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookBtn: {
    backgroundColor: '#ebebff',
  },
  tcTextWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tcText: {
    fontSize: 12,
    color: APP_COLORS.darkText,
    lineHeight: 18,
  },
  tcLink: {
    color: APP_COLORS.pink,
  },
  orWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xxl,
    gap: SPACING.base,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: APP_COLORS.secondary.d,
  },
  orText: {
    color: APP_COLORS.secondary.d,
    fontWeight: '500',
  },
  // Mobile
  mobileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fieldBlock: {
    flex: 1,
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
    gap: 12,
  },
  nameSpacer: {
    width: 12,
  },
  nameInput: {
    flex: 1,
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
  passwordHintRow: {
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
    width: 16,
    height: 16,
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
    color: '#6B7280',
  },
  bottomLoginLink: {
    color: APP_COLORS.pink,
    fontWeight: '600',
  },
});
