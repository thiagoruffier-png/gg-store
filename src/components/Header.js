import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { tema } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: tema.card, paddingTop: insets.top + 12 }]}>
      <View style={styles.logo}>
        <Ionicons name="game-controller" size={24} color={tema.destaque} />
        <Text style={[styles.titulo, { color: tema.texto }]}>GG Store</Text>
      </View>
      <View style={[styles.sino, { backgroundColor: tema.borda }]}>
        <Ionicons name="notifications-outline" size={18} color={tema.texto} />
        <View style={[styles.ponto, { backgroundColor: tema.perigo }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  logo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titulo: { fontSize: 20, fontWeight: '800' },
  sino: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  ponto: { position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: 4 },
});
