import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    setAuthenticated(true);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}
    >
      {!authenticated ? (
        <ThemedView style={styles.centerContent}>
          <ThemedText type="title">Welcome to Tavern BoarXd</ThemedText>
          <ThemedText style={styles.subtitle}>Sign in or register to start planning your next gathering.</ThemedText>

          <ThemedView style={styles.formCard} lightColor="#F7FCFF" darkColor="#0C2530">
            <ThemedText type="subtitle" style={styles.formTitle}>
              {isRegister ? 'Create your account' : 'Sign in to continue'}
            </ThemedText>

            {isRegister ? (
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor="#7A8A97"
                value={name}
                onChangeText={setName}
              />
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7A8A97"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#7A8A97"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={handleAuth}>
              <ThemedText style={styles.primaryButtonText}>{isRegister ? 'Register' : 'Sign in'}</ThemedText>
            </TouchableOpacity>

            <View style={styles.optionRow}>
              <ThemedText style={styles.optionText}>{isRegister ? 'Already have an account?' : 'New here?'}</ThemedText>
              <TouchableOpacity onPress={() => setIsRegister((value) => !value)} activeOpacity={0.7}>
                <ThemedText type="link" style={styles.toggleText}>
                  {isRegister ? 'Log in' : 'Register'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ThemedView>
      ) : (
        <ThemedView style={styles.homeContent}>
          <ThemedText type="title">Home</ThemedText>
          <ThemedText style={styles.subtitle}>
            You’re signed in. Explore your home dashboard and switch to the Explore tab to continue.
          </ThemedText>

          <ThemedView style={styles.homeCard} lightColor="#F7FCFF" darkColor="#0C2530">
            <ThemedText type="defaultSemiBold">Ready for your next event</ThemedText>
            <ThemedText style={styles.homeText}>
              Browse upcoming activities, invite friends, and track RSVPs.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.homeCard} lightColor="#F7FCFF" darkColor="#0C2530">
            <ThemedText type="defaultSemiBold">Explore tab is next</ThemedText>
            <ThemedText style={styles.homeText}>Tap Explore to discover example screens and app features.</ThemedText>
          </ThemedView>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    gap: 16,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
  },
  formCard: {
    padding: 24,
    borderRadius: 28,
    gap: 16,
  },
  formTitle: {
    fontSize: 22,
    lineHeight: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0E1F2F',
  },
  primaryButton: {
    marginTop: 4,
    backgroundColor: '#0A8BB9',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#7A8A97',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  bottomSection: {
    gap: 12,
  },
  featureHeading: {
    fontSize: 18,
    lineHeight: 26,
  },
  featureList: {
    flexDirection: 'row',
    gap: 12,
  },
  featureItem: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    gap: 8,
  },
  featureSmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  homeContent: {
    gap: 16,
  },
  homeCard: {
    padding: 20,
    borderRadius: 24,
    gap: 10,
  },
  homeText: {
    fontSize: 16,
    lineHeight: 24,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
