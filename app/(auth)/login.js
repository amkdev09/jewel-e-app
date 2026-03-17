import PasswordInput from '@/components/ui/passwordInput';
import AppText from '@/components/ui/appText';
import { APP_COLORS, theme } from '@/constants/index';
import { AuthLayout } from '@/src/layouts/AuthLayout';
import { useAuthStore } from '@/src/store/auth.store';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

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

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [step, setStep] = useState(STEP_IDENTIFIER);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!identifier.trim()) {
      Alert.alert('Error', 'Please enter mobile number or email');
      return;
    }
    if (!agreed) {
      Alert.alert(
        'Terms',
        'Please acknowledge that you are at least 18 and agree to T&C and Privacy Policy.'
      );
      return;
    }
    setStep(STEP_PASSWORD);
  };

  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    setLoading(true);
    const result = await login(identifier.trim(), password.trim());
    setLoading(false);
    if (result?.success) {
      router.replace('/(tabs)/home');
    } else {
      Alert.alert('Login failed', result?.message || 'Invalid credentials. Please try again.');
    }
  };

  const handleBackFromPassword = () => {
    setStep(STEP_IDENTIFIER);
    setPassword('');
  };

  const openTc = () => Linking.openURL('https://www.caratlane.com/terms').catch(() => {});
  const openPrivacy = () => Linking.openURL('https://www.caratlane.com/privacy').catch(() => {});

  return (
    <AuthLayout scroll={true}>
      <View style={styles.wrapper}>
        {/* Back arrow */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={step === STEP_PASSWORD ? handleBackFromPassword : () => router.back()}
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
                style={styles.input}
                placeholder="Enter Mobile Number or Email"
                placeholderTextColor={TEXT_MUTED}
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
              <TouchableOpacity
                style={[styles.continueBtn, loading && styles.continueBtnDisabled]}
                onPress={handleContinue}
                disabled={loading}
                activeOpacity={0.8}
              >
                <AppText variant="sm" weight="semiBold" style={styles.continueBtnText}>
                  CONTINUE
                </AppText>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.identifierRow}>
                <AppText variant="sm" weight="medium" style={styles.identifierLabel}>
                  Logging in as
                </AppText>
                <AppText variant="sm" weight="semiBold" style={styles.identifierValue} numberOfLines={1}>
                  {identifier}
                </AppText>
              </View>
              <PasswordInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                containerStyle={styles.passwordInput}
                editable={!loading}
              />
              <TouchableOpacity
                style={[styles.continueBtn, loading && styles.continueBtnDisabled]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
              >
                <AppText variant="sm" weight="semiBold" style={styles.continueBtnText}>
                  {loading ? 'LOGGING IN...' : 'LOGIN'}
                </AppText>
              </TouchableOpacity>
            </>
          )}

          {/* T&C checkbox row - only on identifier step */}
          {step === STEP_IDENTIFIER && (
            <View style={styles.tcRow}>
              <TouchableOpacity
                style={[styles.checkbox, agreed && styles.checkboxChecked]}
                onPress={() => setAgreed(!agreed)}
                activeOpacity={0.7}
              >
                {agreed && <Ionicons name="checkmark" size={16} color="#fff" />}
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
    </AuthLayout>
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
    backgroundColor: BUTTON_GRAY,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme?.spacing?.xxxl,
  },
  continueBtnDisabled: {
    opacity: 0.6,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
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
