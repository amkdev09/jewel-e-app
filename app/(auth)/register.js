import { AppText } from '@/components/AppText';
import { SPACING } from '@/constants/theme';
import { AuthLayout } from '@/src/layouts/AuthLayout';
import { useAuthStore } from '@/src/store/auth.store';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    const result = await register({ name: name.trim(), email: email.trim(), password });
    setLoading(false);
    if (result.success) {
      router.replace('/(tabs)/home');
    } else {
      Alert.alert('Registration Failed', result.message || 'Please try again');
    }
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <AppText variant="2xl" weight="semiBold" style={styles.title}>Create account</AppText>
        <AppText variant="lg" weight="regular" style={styles.subtitle}>Join us for the best in jewelry</AppText>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#9ca3af"
          value={name}
          onChangeText={setName}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <AppText variant="base" weight="semiBold" style={styles.buttonText}>
            {loading ? 'Creating account...' : 'Register'}
          </AppText>
        </TouchableOpacity>

        <View style={styles.footer}>
          <AppText variant="base" weight="regular" style={styles.footerText}>Already have an account? </AppText>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <AppText variant="base" weight="semiBold" style={styles.link}>Sign in</AppText>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.base,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#5c5c5c',
    marginBottom: 32,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#1a1a1a',
  },
  button: {
    height: 48,
    backgroundColor: '#B8860B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#5c5c5c',
    fontSize: 14,
  },
  link: {
    color: '#B8860B',
    fontSize: 14,
    fontWeight: '600',
  },
});
