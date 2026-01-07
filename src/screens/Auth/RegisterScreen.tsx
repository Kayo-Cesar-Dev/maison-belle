// src/screens/Auth/RegisterScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

/** 🔥 BACKEND VIA NGROK */
const API_URL = "https://ungreeted-disappointingly-kaila.ngrok-free.dev";

/** 🔥 REDIRECT FIXO DO EXPO */
const redirectUri = "https://auth.expo.io/@kcs069/front-maison-belle";
console.log("REDIRECT URI (Expo FIXED):", redirectUri);

const { width } = Dimensions.get("window");
const vw = width / 100;

export default function RegisterScreen() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  const [confirmSenha, setConfirmSenha] = useState("");
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  // ==========================================================
  // REGISTRO MANUAL
  // ==========================================================
  async function handleRegister() {
    if (!name || !email || !telefone || !senha || !confirmSenha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (senha !== confirmSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    try {
      const payload = {
        name,
        email,
        phone: telefone,
        password: senha,
        passwordConfirmation: confirmSenha,
        role: "CLIENT",
      };

      const resp = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await resp.json();

      if (!resp.ok) {
        Alert.alert("Erro", json.message || json.error || "Falha ao registrar");
        return;
      }

      Alert.alert(
        "Conta criada!",
        "Um email foi enviado para você confirmar sua conta."
      );
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar ao servidor.");
    }
  }

  // ==========================================================
  // REGISTRO COM GOOGLE
  // ==========================================================
  async function handleGoogleRegister() {
    try {
      // 1) Solicitar ao backend a URL de autorização do Google
      const resp = await fetch(
        `${API_URL}/oauth2/authorize/google?redirect_uri=${encodeURIComponent(
          redirectUri
        )}`
      );

      const json = await resp.json();

      if (!resp.ok || !json.url) {
        Alert.alert(
          "Erro",
          json.message ||
            json.error ||
            "Backend não retornou URL de autorização do Google."
        );
        return;
      }

      const googleAuthUrl = json.url;
      console.log("Google Auth URL:", googleAuthUrl);

      // 2) Abrir o navegador com fluxo OAuth
      const result = await WebBrowser.openAuthSessionAsync(
        googleAuthUrl,
        redirectUri
      );

      console.log("Resultado do Google OAuth:", result);

      if (result.type !== "success") {
        Alert.alert("Cancelado", "Autenticação cancelada.");
        return;
      }

      // 3) Extrair ?code=XYZ
      const url = result.url;
      const query = url.split("?")[1];
      const params = new URLSearchParams(query);
      const code = params.get("code");

      if (!code) {
        Alert.alert("Erro", "Google não retornou código de autorização.");
        return;
      }

      console.log("Auth CODE:", code);

      // 4) Trocar o code pelo backend
      const callbackResp = await fetch(
        `${API_URL}/oauth2/callback/google?code=${encodeURIComponent(
          code
        )}&redirect_uri=${encodeURIComponent(redirectUri)}`
      );

      const callbackJson = await callbackResp.json();
      console.log("Resposta callback:", callbackJson);

      if (!callbackResp.ok) {
        Alert.alert(
          "Erro",
          callbackJson.message || callbackJson.error || "Falha no Google OAuth"
        );
        return;
      }

      const data = callbackJson.data || callbackJson;
      const user = data.user || data?.data?.user;
      const userName = user?.name || "Usuário";

      Alert.alert("Sucesso!", `Bem-vindo(a), ${userName}.`);
      navigation.navigate("HomeTabs");

    } catch (error) {
      console.log("Erro no handleGoogleRegister:", error);
      Alert.alert("Erro", "Falha ao registrar com Google.");
    }
  }

  // ==========================================================
  // UI
  // ==========================================================
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.logo}>MAISON BELLE</Text>
        <Text style={styles.sub}>Crie sua conta</Text>

        {/* NOME */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <Feather name="user" size={20} color="#888" style={styles.inputIcon} />
        </View>

        {/* TELEFONE */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
          <Feather name="phone" size={20} color="#888" style={styles.inputIcon} />
        </View>

        {/* EMAIL */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Feather name="mail" size={20} color="#888" style={styles.inputIcon} />
        </View>

        {/* SENHA */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry={!showSenha}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setShowSenha(!showSenha)}>
            <Feather
              name={showSenha ? "eye" : "eye-off"}
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>

        {/* CONFIRMAR SENHA */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#888"
            secureTextEntry={!showConfirmSenha}
            value={confirmSenha}
            onChangeText={setConfirmSenha}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmSenha(!showConfirmSenha)}
          >
            <Feather
              name={showConfirmSenha ? "eye" : "eye-off"}
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>

        {/* BOTÃO REGISTRAR */}
        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
          <Text style={styles.btnRegisterText}>Criar conta</Text>
        </TouchableOpacity>

        {/* DIVISOR */}
        <View style={styles.dividerBox}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou continue com</Text>
          <View style={styles.divider} />
        </View>

        {/* SOCIAL LOGIN */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialCard}
            onPress={handleGoogleRegister}
          >
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

        {/* LOGIN */}
        <TouchableOpacity
          style={{ marginTop: 30 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ==========================================================
// ESTILOS
// ==========================================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  inner: {
    flex: 1,
    paddingHorizontal: vw * 6,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: "center",
  },
  logo: {
    fontSize: 32,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 2,
  },
  sub: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
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
  input: { flex: 1, fontSize: 15, color: "#222" },
  inputIcon: { marginLeft: 8 },
  btnRegister: {
    backgroundColor: "#986C6A",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  btnRegisterText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#E5E5E5" },
  dividerText: { marginHorizontal: 12, color: "#777", fontSize: 13 },
  socialRow: { flexDirection: "row", justifyContent: "space-between" },
  socialCard: {
    width: "30%",
    backgroundColor: "#F9F9F9",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingVertical: 16,
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  socialCardText: {
    color: "#222",
    fontSize: 14,
    fontWeight: "500",
  },
  loginText: { textAlign: "center", fontSize: 15, color: "#444" },
  loginLink: { color: "#986C6A", fontWeight: "600" },
});
