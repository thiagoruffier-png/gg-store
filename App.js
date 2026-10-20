import React from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, useApp } from './src/context/AppContext';
import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';
import DetalhesScreen from './src/screens/DetalhesScreen';
import PerfilScreen from './src/screens/PerfilScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LojaStack() {
  const { tema } = useApp();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => <Header /> }} />
      <Stack.Screen
        name="Detalhes"
        component={DetalhesScreen}
        options={{
          title: 'Detalhes',
          headerStyle: { backgroundColor: tema.card },
          headerTintColor: tema.texto,
        }}
      />
    </Stack.Navigator>
  );
}

function Rotas() {
  const { tema, modoEscuro, carregando } = useApp();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#0f172a' }}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  const base = modoEscuro ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: { ...base.colors, background: tema.fundo, card: tema.card, text: tema.texto, border: tema.borda },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle={modoEscuro ? 'light-content' : 'dark-content'} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: tema.destaque,
          tabBarInactiveTintColor: tema.mudo,
          tabBarStyle: { backgroundColor: tema.card, borderTopColor: tema.borda },
        }}
      >
        <Tab.Screen
          name="Loja"
          component={LojaStack}
          options={{ tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} /> }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            headerShown: true,
            header: () => <Header />,
            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Rotas />
      </AppProvider>
    </SafeAreaProvider>
  );
}
