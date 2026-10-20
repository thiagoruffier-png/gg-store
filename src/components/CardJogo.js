import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { formatarPreco } from '../utils';

export default function CardJogo({ jogo, onPress }) {
  const { tema, ehFavorito } = useApp();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}
    >
      <Image source={{ uri: jogo.imagemCapa }} style={styles.capa} />
      {ehFavorito(jogo.id) && (
        <View style={styles.coracao}>
          <Ionicons name="heart" size={16} color={tema.perigo} />
        </View>
      )}
      <View style={styles.info}>
        <Text style={[styles.titulo, { color: tema.texto }]} numberOfLines={1}>
          {jogo.titulo}
        </Text>
        <Text style={[styles.preco, { color: tema.destaque }]}>{formatarPreco(jogo.preco)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, margin: 6, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  capa: { width: '100%', height: 130, backgroundColor: '#334155' },
  coracao: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 14,
    padding: 5,
  },
  info: { padding: 10 },
  titulo: { fontSize: 14, fontWeight: '700' },
  preco: { fontSize: 14, fontWeight: '700', marginTop: 4 },
});
