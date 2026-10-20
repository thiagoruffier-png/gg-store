import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import jogos from '../dados';
import CardJogo from '../components/CardJogo';
import CardDestaque from '../components/CardDestaque';
import { useApp } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const { tema } = useApp();

  const jogoDestaque = jogos.find((j) => j.destaque);
  const demais = jogos.filter((j) => !j.destaque);

  const abrirDetalhes = (jogo) => navigation.navigate('Detalhes', { id: jogo.id });

  const cabecalho = (
    <View>
      <Text style={[styles.secao, { color: tema.texto }]}>Em Destaque</Text>
      {jogoDestaque && <CardDestaque jogo={jogoDestaque} onPress={() => abrirDetalhes(jogoDestaque)} />}
      <Text style={[styles.secao, { color: tema.texto, marginTop: 24 }]}>Todos os Jogos</Text>
    </View>
  );

  return (
    <FlatList
      style={{ backgroundColor: tema.fundo }}
      contentContainerStyle={styles.lista}
      data={demais}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      ListHeaderComponent={cabecalho}
      renderItem={({ item }) => <CardJogo jogo={item} onPress={() => abrirDetalhes(item)} />}
    />
  );
}

const styles = StyleSheet.create({
  lista: { padding: 14, paddingBottom: 30 },
  secao: { fontSize: 18, fontWeight: '800', marginBottom: 12, marginLeft: 6 },
});
