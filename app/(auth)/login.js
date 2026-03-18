import AppText from '@/components/ui/appText';
import PasswordInput from '@/components/ui/passwordInput';
import { APP_COLORS, theme } from '@/constants/index';
import { AuthLayout } from '@/src/layouts/AuthLayout';
import { useAuthStore } from '@/src/store/auth.store';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';

const PURPLE_DARK = '#5b21b6';
const PURPLE_LIGHT = '#a78bfa';
const TEXT_DARK = '#1a1a1a';
const TEXT_MUTED = '#6b7280';
const BORDER_GRAY = '#e5e7eb';
const BUTTON_GRAY = '#9ca3af';
const GREEN_WHATSAPP = '#25d366';
const FACEBOOK_BLUE = '#1877f2';

const STEP_IDENTIFIER = 1;
const STEP_PASSWORD = 2;

const isValidEmailOrPhone = (value) => {
  const v = (value || '').trim();
  if (!v) return false;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const digits = v.replace(/[^\d]/g, '');
  const isPhone = digits.length >= 10 && digits.length <= 15;
  return isEmail || isPhone;
};

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [step, setStep] = useState(STEP_IDENTIFIER);

  const handleBackFromPassword = () => {
    setStep(STEP_IDENTIFIER);
  };

  const openTc = () => Linking.openURL('https://www.caratlane.com/terms').catch(() => { });
  const openPrivacy = () => Linking.openURL('https://www.caratlane.com/privacy').catch(() => { });

  const identifierSchema = Yup.object({
    identifier: Yup.string()
      .required('Mobile number or email is required')
      .test('email-or-phone', 'Enter a valid email or mobile number', (v) => isValidEmailOrPhone(v)),
    agreed: Yup.boolean().oneOf(
      [true],
      'Please acknowledge that you are at least 18 and agree to T&C and Privacy Policy.'
    ),
  });

  const passwordSchema = Yup.object({
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const validationSchema = step === STEP_IDENTIFIER ? identifierSchema : passwordSchema;

  return (
    <AuthLayout scroll={true}>
      <Formik
        initialValues={{ identifier: '', password: '', agreed: false }}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={async (values, helpers) => {
          const identifier = values.identifier.trim();
          const password = values.password.trim();

          if (step === STEP_IDENTIFIER) {
            helpers.setTouched({ identifier: true, agreed: true }, true);
            const errs = await helpers.validateForm();
            if (errs.identifier || errs.agreed) return;
            setStep(STEP_PASSWORD);
            return;
          }

          helpers.setTouched({ password: true }, true);
          const errs = await helpers.validateForm();
          if (errs.password) return;

          try {
            const result = await login(identifier, password);
            console.log('result: ', result);
            if (result?.success) {
              router.replace('/(tabs)/home');
            } else {
              Alert.alert('Login failed', result?.message || 'Invalid credentials. Please try again.');
            }
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        }) => (
          <View style={styles.wrapper}>
            {/* Back arrow */}
            <TouchableOpacity
              style={styles.backBtn}
              onPress={
                step === STEP_PASSWORD
                  ? () => {
                    handleBackFromPassword();
                    setFieldValue('password', '');
                    setFieldTouched('password', false, false);
                  }
                  : () => router.back()
              }
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
            </TouchableOpacity>

            <View style={styles.scrollContent}>
              {/* Keyhole icon in gradient circle */}
              <View style={styles.iconWrap}>
                <LinearGradient
                  colors={[PURPLE_LIGHT, PURPLE_DARK]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.keyholeCircle}
                >
                  <Ionicons name="key" size={48} color="#fff" />
                </LinearGradient>
              </View>
              <AppText variant="xl" weight="semiBold" style={styles.title}>
                Welcome back!
              </AppText>
              <AppText variant="base" weight="regular" style={styles.desc}>
                Login to unlock best prices and become an insider for our exclusive launches offers.
                Complete your profile and get ₹500 worth of xCLusive Points.
              </AppText>

              {step === STEP_IDENTIFIER ? (
                <>
                  <TextInput
                    style={[styles.input, touched.identifier && errors.identifier && styles.inputError]}
                    placeholder="Enter Mobile Number or Email"
                    placeholderTextColor={TEXT_MUTED}
                    value={values.identifier}
                    onChangeText={handleChange('identifier')}
                    onBlur={handleBlur('identifier')}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!isSubmitting}
                  />
                  {touched.identifier && errors.identifier ? (
                    <AppText variant="xs" weight="regular" style={styles.fieldError}>
                      {errors.identifier}
                    </AppText>
                  ) : null}

                  <LinearGradient
                    colors={
                      values.agreed
                        ? ['rgb(229, 110, 235)', 'rgb(136, 99, 251)']
                        : [BUTTON_GRAY, BUTTON_GRAY]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      borderRadius: 10,
                      marginBottom: theme?.spacing?.xxl,
                    }}
                  >
                    <TouchableOpacity
                      style={[styles.continueBtn]}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      activeOpacity={0.8}
                    >
                      <AppText variant="sm" weight="semiBold" style={styles.continueBtnText}>
                        CONTINUE
                      </AppText>
                    </TouchableOpacity>
                  </LinearGradient>
                </>
              ) : (
                <>
                  <View style={styles.identifierRow}>
                    <AppText variant="sm" weight="medium" style={styles.identifierLabel}>
                      Logging in as
                    </AppText>
                    <AppText variant="sm" weight="semiBold" style={styles.identifierValue} numberOfLines={1}>
                      {values.identifier}
                    </AppText>
                  </View>
                  <PasswordInput
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    containerStyle={styles.passwordInput}
                    editable={!isSubmitting}
                  />
                  {touched.password && errors.password ? (
                    <AppText variant="xs" weight="regular" style={styles.fieldError}>
                      {errors.password}
                    </AppText>
                  ) : null}
                  <LinearGradient
                    colors={
                      !isSubmitting
                        ? ['rgb(229, 110, 235)', 'rgb(136, 99, 251)']
                        : [BUTTON_GRAY, BUTTON_GRAY]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      borderRadius: 10,
                      marginBottom: theme?.spacing?.xxl,
                    }}
                  >
                    <TouchableOpacity
                      style={[styles.continueBtn, isSubmitting && styles.continueBtnDisabled]}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      activeOpacity={0.8}
                    >
                      <AppText variant="sm" weight="semiBold" style={styles.continueBtnText}>
                        {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
                      </AppText>
                    </TouchableOpacity>
                  </LinearGradient>
                </>
              )}

              {/* T&C checkbox row - only on identifier step */}
              {step === STEP_IDENTIFIER && (
                <View style={styles.tcRow}>
                  <TouchableOpacity
                    style={[styles.checkbox, values.agreed && styles.checkboxChecked]}
                    onPress={() => {
                      setFieldValue('agreed', !values.agreed);
                      setFieldTouched('agreed', true, false);
                    }}
                    activeOpacity={0.7}
                  >
                    {values.agreed && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </TouchableOpacity>
                  <View style={styles.tcTextWrap}>
                    <AppText variant="xs" weight="regular" style={styles.tcText}>
                      By continuing you acknowledge that you are at least 18 years old and have read and
                      agree to CaratLane&apos;s{' '}
                    </AppText>
                    <TouchableOpacity onPress={openTc} style={styles.tcLinkTouch}>
                      <AppText variant="xs" weight="semiBold" style={styles.tcLink}>
                        T&C
                      </AppText>
                    </TouchableOpacity>
                    <AppText variant="xs" weight="regular" style={styles.tcText}>
                      {' '}
                    </AppText>
                    <TouchableOpacity onPress={openPrivacy} style={styles.tcLinkTouch}>
                      <AppText variant="xs" weight="semiBold" style={styles.tcLink}>
                        Privacy Policy.
                      </AppText>
                    </TouchableOpacity>
                    {touched.agreed && errors.agreed ? (
                      <AppText variant="xs" weight="regular" style={styles.fieldError}>
                        {errors.agreed}
                      </AppText>
                    ) : null}
                  </View>
                </View>
              )}

              {/* OR divider */}
              <View style={styles.orWrap}>
                <View style={styles.orLine} />
                <AppText variant="sm" weight="medium" style={styles.orText}>
                  OR
                </AppText>
                <View style={styles.orLine} />
              </View>

              {/* WhatsApp login */}
              <TouchableOpacity
                style={styles.whatsappBtn}
                activeOpacity={0.8}
                onPress={() => router.replace('/(tabs)/home')}
              >
                <Ionicons name="logo-whatsapp" size={24} color={GREEN_WHATSAPP} />
                <AppText variant="sm" weight="semiBold" style={styles.whatsappBtnText}>
                  LOGIN WITH WHATSAPP
                </AppText>
              </TouchableOpacity>

              {/* Google & Facebook */}
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
                  <Ionicons name="logo-facebook" size={28} color={FACEBOOK_BLUE} />
                </TouchableOpacity>
              </View>

              {/* Sign up link */}
              <View style={styles.footer}>
                <AppText variant="base" weight="regular" style={styles.footerText}>
                  New to CaratLane?
                </AppText>
                <Link href="/(auth)/register" asChild>
                  <TouchableOpacity activeOpacity={0.7}>
                    <AppText variant="base" weight="semiBold" style={styles.createAccountLink}>
                      Create Account
                    </AppText>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </AuthLayout >
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: theme?.spacing?.xl,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme?.spacing?.xl,
  },
  iconWrap: {
    alignItems: 'center',
    marginBottom: theme?.spacing?.md,
  },
  keyholeCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: PURPLE_DARK,
    textAlign: 'center',
  },
  desc: {
    color: TEXT_MUTED,
    marginVertical: theme?.spacing?.xxl,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: BORDER_GRAY,
    borderRadius: 10,
    paddingHorizontal: theme?.spacing?.base,
    marginVertical: theme?.spacing?.xxl,
    color: TEXT_DARK,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  fieldError: {
    color: '#ef4444',
    marginTop: -theme?.spacing?.xl,
    marginBottom: theme?.spacing?.base,
  },
  identifierRow: {
    marginBottom: theme?.spacing?.sm,
  },
  identifierLabel: {
    color: TEXT_MUTED,
    marginBottom: 2,
  },
  identifierValue: {
    color: TEXT_DARK,
  },
  passwordInput: {
    marginVertical: theme?.spacing?.base,
  },
  continueBtn: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtnDisabled: {
    opacity: 0.6,
  },
  continueBtnText: {
    color: '#fff',
  },
  tcRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: theme?.spacing?.xxl,
    gap: theme?.spacing?.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: BORDER_GRAY,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: PURPLE_DARK,
    borderColor: PURPLE_DARK,
  },
  tcTextWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tcText: {
    fontSize: 12,
    color: TEXT_MUTED,
    lineHeight: 18,
  },
  tcLinkTouch: {
    paddingVertical: 2,
  },
  tcLink: {
    color: APP_COLORS.pink,
  },
  orWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme?.spacing?.xxl,
    gap: theme?.spacing?.sm,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER_GRAY,
  },
  orText: {
    color: TEXT_MUTED,
    fontWeight: '500',
  },
  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: '#e6f6e6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GREEN_WHATSAPP,
    marginBottom: theme?.spacing?.base,
    gap: theme?.spacing?.base,
  },
  whatsappBtnText: {
    color: APP_COLORS.primary.a,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme?.spacing?.base,
    marginVertical: theme?.spacing?.xxl,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff4eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookBtn: {
    backgroundColor: '#ebebff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 14,
    color: TEXT_MUTED,
  },
  createAccountLink: {
    color: APP_COLORS.pink,
  },
});
