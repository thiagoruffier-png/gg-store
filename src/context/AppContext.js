import React, { createContext, useContext, useEffect, useState } from 'react';
import { obterFavoritos, salvarFavoritos, obterPerfil, salvarPerfil } from '../dao/storage';
import { temas } from '../theme';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const [perfil, setPerfil] = useState({ nickname: '', modoEscuro: true });
  const [carregando, setCarregando] = useState(true);

  // Carrega os dados salvos ao abrir o app
  useEffect(() => {
    (async () => {
      const [ids, p] = await Promise.all([obterFavoritos(), obterPerfil()]);
      setFavoritos(ids);
      setPerfil(p);
      setCarregando(false);
    })();
  }, []);

  const ehFavorito = (id) => favoritos.includes(id);

  const alternarFavorito = async (id) => {
    const novos = favoritos.includes(id) ? favoritos.filter((x) => x !== id) : [...favoritos, id];
    setFavoritos(novos);
    await salvarFavoritos(novos);
  };

  const salvarConfiguracoes = async (novoPerfil) => {
    setPerfil(novoPerfil);
    await salvarPerfil(novoPerfil);
  };

  const modoEscuro = perfil.modoEscuro;
  const tema = modoEscuro ? temas.escuro : temas.claro;

  return (
    <AppContext.Provider
      value={{ favoritos, ehFavorito, alternarFavorito, perfil, salvarConfiguracoes, tema, modoEscuro, carregando }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
