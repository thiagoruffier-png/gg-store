// DAO: centraliza todas as chamadas ao AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = '@ggstore:favoritos';
const CHAVE_PERFIL = '@ggstore:perfil';

const PERFIL_PADRAO = { nickname: '', modoEscuro: true };

export async function obterFavoritos() {
  try {
    const json = await AsyncStorage.getItem(CHAVE_FAVORITOS);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.warn('Erro ao ler favoritos', e);
    return [];
  }
}

export async function salvarFavoritos(ids) {
  try {
    await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(ids));
  } catch (e) {
    console.warn('Erro ao salvar favoritos', e);
  }
}

export async function salvarFavorito(id) {
  const atuais = await obterFavoritos();
  if (!atuais.includes(id)) await salvarFavoritos([...atuais, id]);
}

export async function removerFavorito(id) {
  const atuais = await obterFavoritos();
  await salvarFavoritos(atuais.filter((x) => x !== id));
}

export async function obterPerfil() {
  try {
    const json = await AsyncStorage.getItem(CHAVE_PERFIL);
    return json ? { ...PERFIL_PADRAO, ...JSON.parse(json) } : PERFIL_PADRAO;
  } catch (e) {
    console.warn('Erro ao ler perfil', e);
    return PERFIL_PADRAO;
  }
}

export async function salvarPerfil(perfil) {
  try {
    await AsyncStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
  } catch (e) {
    console.warn('Erro ao salvar perfil', e);
  }
}
