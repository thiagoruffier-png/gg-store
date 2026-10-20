import React, { useState, useEffect } from 'react';
import {
  FlatList, View, Text, TextInput, Switch, TouchableOpacity, Image, Alert, Platform, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import jogos from '../dados';
import { useApp } from '../context/AppContext';
import { formatarPreco } from '../utils';

export default function PerfilScreen({ navigation }) {
  const { tema, perfil, favoritos, alternarFavorito, salvarConfiguracoes } = useApp();

  // Estado local do formulário (só vai para o AsyncStorage ao clicar em "Salvar")
  const [nickname, setNickname] = useState(perfil.nickname);
  const [modoEscuro, setModoEscuro] = useState(perfil.modoEscuro);

  useEffect(() => {
    setNickname(perfil.nickname);
    setModoEscuro(perfil.modoEscuro);
  }, [perfil]);

  const jogosFavoritos = jogos.filter((j) => favoritos.includes(j.id));

  const salvar = async () => {
    await salvarConfiguracoes({ nickname: nickname.trim(), modoEscuro });
    if (Platform.OS === 'web') {
      window.alert('Configurações salvas com sucesso.');
    } else {
      Alert.alert('Pronto!', 'Configurações salvas com sucesso.');
    }
  };

  const abrirJogo = (id) => navigation.navigate('Loja', { screen: 'Detalhes', params: { id } });

  const cabecalho = (
    <View>
      <Text style={[styles.titulo, { color: tema.texto }]}>Meu Perfil</Text>

      <View style={[styles.painel, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <View style={styles.rotuloLinha}>
          <Ionicons name="settings-sharp" size={14} color={tema.destaque} />
          <Text style={[styles.rotulo, { color: tema.destaque }]}>CONFIGURAÇÕES</Text>
        </View>

        <Text style={[styles.label, { color: tema.mudo }]}>Nome de Jogador (Nickname)</Text>
        <TextInput
          value={nickname}
          onChangeText={setNickname}
          placeholder="Digite seu nickname"
          placeholderTextColor={tema.mudo}
          style={[styles.input, { backgroundColor: tema.campo, borderColor: tema.borda, color: tema.texto }]}
        />

        <View style={styles.switchLinha}>
          <View style={[styles.iconeCirculo, { backgroundColor: tema.borda }]}>
            <Ionicons name="moon-outline" size={18} color={tema.mudo} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchTitulo, { color: tema.texto }]}>Modo Escuro</Text>
            <Text style={{ color: tema.mudo, fontSize: 12 }}>Tema do aplicativo</Text>
          </View>
          <Switch
            value={modoEscuro}
            onValueChange={setModoEscuro}
            trackColor={{ true: tema.destaque, false: tema.borda }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity style={[styles.botao, { backgroundColor: tema.destaque }]} onPress={salvar}>
          <Text style={styles.botaoTexto}>Salvar Configurações</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.rotuloLinha, { marginTop: 24, marginBottom: 10 }]}>
        <Ionicons name="heart" size={14} color={tema.destaque} />
        <Text style={[styles.rotulo, { color: tema.destaque }]}>MINHA WISHLIST</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      style={{ backgroundColor: tema.fundo }}
      contentContainerStyle={styles.lista}
      keyboardShouldPersistTaps="handled"
      data={jogosFavoritos}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={cabecalho}
      ListEmptyComponent={
        <Text style={{ color: tema.mudo, textAlign: 'center', marginTop: 10 }}>
          Nenhum jogo na wishlist ainda. Favorite jogos na loja!
        </Text>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => abrirJogo(item.id)}
          style={[styles.item, { backgroundColor: tema.card, borderColor: tema.borda }]}
        >
          <Image source={{ uri: item.imagemCapa }} style={styles.itemCapa} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.itemTitulo, { color: tema.texto }]}>{item.titulo}</Text>
            <Text style={{ color: tema.destaque, fontWeight: '700', marginTop: 4 }}>
              {formatarPreco(item.preco)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => alternarFavorito(item.id)}
            style={[styles.lixeira, { backgroundColor: tema.borda }]}
          >
            <Ionicons name="trash" size={18} color={tema.perigo} />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 26, fontWeight: '800', marginBottom: 16 },
  painel: { borderRadius: 16, borderWidth: 1, padding: 16 },
  rotuloLinha: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rotulo: { fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  label: { fontSize: 12, marginTop: 14, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 15 },
  switchLinha: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  iconeCirculo: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  switchTitulo: { fontSize: 14, fontWeight: '700' },
  botao: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 18 },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 10 },
  itemCapa: { width: 52, height: 52, borderRadius: 8, backgroundColor: '#334155' },
  itemTitulo: { fontSize: 14, fontWeight: '700' },
  lixeira: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
});
