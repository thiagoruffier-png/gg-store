import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { formatarPreco } from '../utils';

export default function CardDestaque({ jogo, onPress }) {
  const { tema } = useApp();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}
    >
      <Image source={{ uri: jogo.imagemCapa }} style={styles.capa} resizeMode="cover" />
      <View style={[styles.badge, { backgroundColor: tema.destaque }]}>
        <Text style={styles.badgeTexto}>LANÇAMENTO</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.titulo, { color: tema.texto }]}>{jogo.titulo}</Text>
        <Text style={[styles.descricao, { color: tema.mudo }]} numberOfLines={2}>
          {jogo.descricao}
        </Text>
        <View style={styles.rodape}>
          <View style={[styles.genero, { backgroundColor: tema.borda }]}>
            <Text style={[styles.generoTexto, { color: tema.mudo }]}>{jogo.genero}</Text>
          </View>
          <Text style={[styles.preco, { color: tema.destaque }]}>{formatarPreco(jogo.preco)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginHorizontal: 6 },
  capa: { width: '100%', height: 190, backgroundColor: '#334155' },
  badge: { position: 'absolute', top: 10, left: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeTexto: { color: '#fff', fontSize: 10, fontWeight: '800' },
  info: { padding: 14 },
  titulo: { fontSize: 18, fontWeight: '800' },
  descricao: { fontSize: 13, marginTop: 4 },
  rodape: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  genero: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  generoTexto: { fontSize: 11 },
  preco: { fontSize: 18, fontWeight: '800' },
});
