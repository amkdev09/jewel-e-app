import AppText from '@/components/ui/appText';
import { Feather } from '@expo/vector-icons';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Modal,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

interface PhoneInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
}

type CountryItem = {
  name: string;
  callingCode: string;
  cca2?: string;
};

const PhoneInput = ({
  label = 'Mobile',
  value,
  onChangeText,
  error,
  containerStyle,
  inputStyle,
  countryCode = '+91',
  onCountryCodeChange,
  ...rest
}: PhoneInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef<TextInput | null>(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [countryError, setCountryError] = useState<string | null>(null);

  useEffect(() => {
    Animated.timing(animated, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [animated, isFocused, value]);

  const handlePress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const borderColor = error ? '#F97373' : isFocused ? '#000' : '#D1D5DB';

  const currentCountryLabel = useMemo(() => {
    const match = countries.find((c) => c.callingCode === countryCode);
    return match ? `${match.callingCode}` : countryCode;
  }, [countries, countryCode]);

  const openPicker = async () => {
    setIsPickerVisible(true);
    if (countries.length || loadingCountries) return;
    try {
      setLoadingCountries(true);
      setCountryError(null);
      const response = await fetch('https://restcountries.com/v3.1/all');
      const json = await response.json();
      const mapped: CountryItem[] = (json || [])
        .map((item: any) => {
          const root = item?.idd?.root;
          const suffix = Array.isArray(item?.idd?.suffixes) ? item.idd.suffixes[0] : null;
          if (!root || !suffix) return null;
          return {
            name: item?.name?.common || '',
            callingCode: `${root}${suffix}`,
            cca2: item?.cca2,
          } as CountryItem;
        })
        .filter(Boolean)
        .sort((a: CountryItem, b: CountryItem) => a.name.localeCompare(b.name));
      setCountries(mapped);
    } catch (e) {
      setCountryError('Unable to load countries. Please try again.');
    } finally {
      setLoadingCountries(false);
    }
  };

  const handleSelectCountry = (item: CountryItem) => {
    if (onCountryCodeChange) {
      onCountryCodeChange(item.callingCode);
    }
    setIsPickerVisible(false);
  };

  return (
    <View style={[containerStyle, { flex: 1 }]}>
      <View style={[styles.container, { borderColor }]}>
        <TouchableOpacity style={styles.countryContainer} onPress={openPicker} activeOpacity={0.7}>
          <AppText style={styles.countryCodeText}>{currentCountryLabel}</AppText>
          <Feather name="chevron-down" size={16} color="#4B5563" />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={handlePress}>
          <TextInput
            ref={inputRef}
            value={value}
            style={[styles.input, inputStyle, { flex: 1 }]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={onChangeText}
            placeholder={label}
            placeholderTextColor="#6B7280"
            keyboardType="phone-pad"
            {...rest}
          />
        </TouchableWithoutFeedback>
      </View>
      {!!error && <AppText style={styles.errorText}>{error}</AppText>}

      <Modal
        visible={isPickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsPickerVisible(false)}>
          <View style={styles.modalBackdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          <View style={styles.modalHeader}>
            <AppText style={styles.modalTitle}>Select country code</AppText>
          </View>
          {countryError ? (
            <View style={styles.modalErrorWrapper}>
              <AppText style={styles.modalErrorText}>{countryError}</AppText>
            </View>
          ) : (
            <FlatList
              data={countries}
              keyExtractor={(item) => `${item.cca2}-${item.callingCode}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryRow}
                  onPress={() => handleSelectCountry(item)}
                >
                  <AppText style={styles.countryName}>{item.name}</AppText>
                  <AppText style={styles.countryCode}>{item.callingCode}</AppText>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default memo(PhoneInput);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    margin: 0,
    color: '#111827',
    borderLeftWidth: 1,
    paddingLeft: 12,
    borderColor: '#D1D5DB',
  },
  inputError: {
    borderColor: '#F97373',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#F97373',
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingVertical: 10,
  },
  countryCodeText: {
    fontSize: 14,
    color: '#111827',
    marginRight: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    maxHeight: '65%',
  },
  modalHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  modalErrorWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalErrorText: {
    fontSize: 13,
    color: '#DC2626',
  },
  countryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  countryName: {
    fontSize: 14,
    color: '#111827',
  },
  countryCode: {
    fontSize: 13,
    color: '#6B7280',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  listContent: {
    paddingBottom: 24,
  },
});
