import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

const API_URL = "http://172.20.10.2:8080";

const { width, height } = Dimensions.get("window");
const vw = width / 100;

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { user, updateUserPhoto } = useAuth();

  const [uploading, setUploading] = useState(false);

  // ===============================================================
  // PICK IMAGE — 100% COMPATÍVEL COM QUALQUER EXPO
  // ===============================================================
  async function pickImage() {
    // pedir permissão
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permissão negada", "Ative o acesso à galeria.");
      return;
    }

    // abrir galeria (modo universal)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // 🔥 modo universal (FUNCIONA EM TODAS AS VERSÕES)
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    console.log("RESULT:", result);

    if (result.canceled) return;

    const asset = result.assets?.[0] ?? result;
    uploadPhoto(asset.uri);
  }

  // ===============================================================
  // UPLOAD
  // ===============================================================
  async function uploadPhoto(uri: string) {
    try {
      setUploading(true);

      const filename = uri.split("/").pop() || `photo_${user?.id}.jpg`;
      const ext = filename.split(".").pop() || "jpg";

      const form = new FormData();
      form.append("file", {
        uri,
        name: filename,
        type: `image/${ext}`,
      } as any);

      const resp = await fetch(`${API_URL}/users/${user?.id}/photo`, {
        method: "POST",
        body: form,
      });

      const json = await resp.json();

      if (!resp.ok) {
        Alert.alert("Erro", json.error || "Falha ao enviar imagem.");
        return;
      }

      updateUserPhoto(json.photoUrl);
      Alert.alert("Sucesso", "Foto atualizada!");
    } catch (err) {
      console.log("UPLOAD ERROR:", err);
      Alert.alert("Erro", "Erro no upload.");
    } finally {
      setUploading(false);
    }
  }

  // ===============================================================
  // SEM USER
  // ===============================================================
  if (!user) {
    return (
      <View style={styles.centerBox}>
        <Text style={styles.noUserText}>Você está logado como visitante.</Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Feather name="log-in" size={20} color="#FFF" />
          <Text style={styles.logoutText}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ===============================================================
  // PERFIL
  // ===============================================================
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} disabled={uploading}>
          <Image
            key={user.photoUrl}
            source={{
              uri:
                user.photoUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.avatar}
          />

          {uploading && (
            <ActivityIndicator size="large" color="#986C6A" style={styles.loader} />
          )}
        </TouchableOpacity>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
          <Feather name="camera" size={18} color="#FFF" />
          <Text style={styles.changePhotoText}>Trocar foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Feather name="user" size={22} color="#986C6A" />
          <Text style={styles.optionText}>Editar Perfil</Text>
          <Feather name="chevron-right" size={22} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Feather name="calendar" size={22} color="#986C6A" />
          <Text style={styles.optionText}>Meus Agendamentos</Text>
          <Feather name="chevron-right" size={22} color="#999" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Feather name="log-out" size={20} color="#FFF" />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: height * 0.12,
    paddingHorizontal: vw * 6,
  },

  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noUserText: {
    fontSize: 18,
    color: "#444",
    marginBottom: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 45,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 130,
    borderWidth: 3,
    borderColor: "#986C6A",
    marginBottom: 15,
  },

  loader: {
    position: "absolute",
    top: 50,
    left: 50,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },

  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

  changePhotoBtn: {
    backgroundColor: "#986C6A",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 15,
  },

  changePhotoText: {
    color: "#FFF",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },

  options: {
    gap: 14,
    marginBottom: 30,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 14,
  },

  optionText: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },

  logoutButton: {
    backgroundColor: "#986C6A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },

  logoutText: {
    color: "#FFF",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
});
