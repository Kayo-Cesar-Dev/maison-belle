import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { useAuth } from "../../hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();

const API_URL = "http://172.20.10.2:8080";

const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
});

const { width } = Dimensions.get("window");
const vw = width / 100;

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  // =====================================
  // LOGIN MANUAL
  // =====================================
  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha!");
      return;
    }

    try {
      const resp = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const json = await resp.json();

      if (!resp.ok) {
        Alert.alert("Erro", json.error || json.message);
        return;
      }

      await AsyncStorage.setItem("@user", JSON.stringify(json.data.user));
      await AsyncStorage.setItem("@accessToken", json.data.accessToken);
      await AsyncStorage.setItem("@refreshToken", json.data.refreshToken);

      setUser(json.data.user);

      Alert.alert("Bem-vindo!", json.data.user.name);

      navigation.navigate("HomeTabs");
    } catch (e) {
      Alert.alert("Erro", "Falha ao conectar ao servidor.");
    }
  }

  // =====================================
  // LOGIN COM GOOGLE
  // =====================================
  async function handleGoogleLogin() {
    try {
      const res = await fetch(`${API_URL}/oauth2/authorize/google`);
      const data = await res.json();

      const googleAuthUrl = data.url;

      const result = await WebBrowser.openAuthSessionAsync(
        googleAuthUrl,
        redirectUri
      );

      if (result.type !== "success") return;

      const url = result.url;
      const query = url.split("?")[1];
      const params = new URLSearchParams(query);
      const code = params.get("code");

      const callback = await fetch(
        `${API_URL}/oauth2/callback/google?code=${code}`
      );

      const json = await callback.json();

      if (!callback.ok) {
        Alert.alert("Erro", json.error || json.message);
        return;
      }

      await AsyncStorage.setItem("@user", JSON.stringify(json.data.user));
      await AsyncStorage.setItem("@accessToken", json.data.accessToken);
      await AsyncStorage.setItem("@refreshToken", json.data.refreshToken);

      setUser(json.data.user);

      Alert.alert("Bem-vindo!", json.data.user.name);

      navigation.navigate("HomeTabs");
    } catch (e) {
      Alert.alert("Erro", "Falha no login Google.");
    }
  }

  // =====================================
  // INTERFACE
  // =====================================
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MAISON BELLE</Text>
      <Text style={styles.sub}>Entre para continuar</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
          autoCapitalize="none"
        />
        <Feather name="mail" size={20} color="#888" />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={!showSenha}
          value={senha}
          onChangeText={setSenha}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setShowSenha((v) => !v)}>
          <Feather name={showSenha ? "eye" : "eye-off"} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnLoginText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.dividerBox}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>ou continue com</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialCard} onPress={handleGoogleLogin}>
          <AntDesign name="google" size={22} color="#EA4335" />
          <Text style={styles.socialCardText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialCard}>
          <FontAwesome name="facebook" size={22} color="#1877F2" />
          <Text style={styles.socialCardText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialCard}
          onPress={() => navigation.navigate("HomeTabs")}
        >
          <Feather name="user" size={22} color="#222" />
          <Text style={styles.socialCardText}>Convidado</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ marginTop: 30 }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>
          Não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... SEUS STYLES AQUI (mantive iguais)
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: vw * 6,
  },
  logo: {
    fontSize: 32,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 6,
  },
  sub: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 45,
  },
  inputBox: {
    width: "100%",
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },
  btnLogin: {
    backgroundColor: "#986C6A",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  btnLoginText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#777",
    fontSize: 13,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialCard: {
    width: "30%",
    backgroundColor: "#F9F9F9",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 16,
    alignItems: "center",
    gap: 6,
  },
  socialCardText: {
    color: "#222",
    fontSize: 14,
    fontWeight: "500",
  },
  registerText: {
    textAlign: "center",
    fontSize: 15,
    color: "#444",
  },
  registerLink: {
    color: "#986C6A",
    fontWeight: "600",
  },
});
