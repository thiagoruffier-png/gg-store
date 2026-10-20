import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import jogos from '../dados';
import { useApp } from '../context/AppContext';
import { formatarPreco } from '../utils';

export default function DetalhesScreen({ route }) {
  const { id } = route.params;
  const { tema, ehFavorito, alternarFavorito } = useApp();

  const jogo = jogos.find((j) => j.id === id);
  if (!jogo) return null;

  const favorito = ehFavorito(jogo.id);

  return (
    <ScrollView style={{ backgroundColor: tema.fundo }} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image source={{ uri: jogo.imagemCapa }} style={styles.capa} resizeMode="cover" />

      <View style={styles.conteudo}>
        <Text style={[styles.titulo, { color: tema.texto }]}>{jogo.titulo}</Text>

        <View style={styles.linha}>
          <View style={[styles.genero, { backgroundColor: tema.borda }]}>
            <Text style={{ color: tema.mudo, fontSize: 12 }}>{jogo.genero}</Text>
          </View>
          <Text style={[styles.preco, { color: tema.destaque }]}>{formatarPreco(jogo.preco)}</Text>
        </View>

        <Text style={[styles.rotulo, { color: tema.destaque }]}>SOBRE O JOGO</Text>
        <Text style={[styles.descricao, { color: tema.mudo }]}>{jogo.descricao}</Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => alternarFavorito(jogo.id)}
          style={[
            styles.botao,
            favorito
              ? { backgroundColor: 'transparent', borderWidth: 2, borderColor: tema.perigo }
              : { backgroundColor: tema.destaque },
          ]}
        >
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
            size={22}
            color={favorito ? tema.perigo : '#fff'}
          />
          <Text style={[styles.botaoTexto, { color: favorito ? tema.perigo : '#fff' }]}>
            {favorito ? 'Na sua Wishlist' : 'Adicionar à Wishlist'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  capa: { width: '100%', height: 320, backgroundColor: '#334155' },
  conteudo: { padding: 20 },
  titulo: { fontSize: 26, fontWeight: '800' },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  genero: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  preco: { fontSize: 24, fontWeight: '800' },
  rotulo: { fontSize: 13, fontWeight: '800', marginTop: 24, marginBottom: 8, letterSpacing: 0.5 },
  descricao: { fontSize: 15, lineHeight: 22 },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 15,
    borderRadius: 12,
    marginTop: 28,
  },
  botaoTexto: { fontSize: 16, fontWeight: '700' },
});
