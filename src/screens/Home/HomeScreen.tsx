import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

const { width } = Dimensions.get("window");
const vw = width / 100;

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ===========================
          HEADER DINÂMICO 
      ============================ */}
      <View style={styles.header}>
        <View>
          {user ? (
            <>
              <Text style={styles.hello}>Olá, {user.name} 👋</Text>
              <Text style={styles.welcome}>Bem-vindo de volta</Text>
            </>
          ) : (
            <>
              <Text style={styles.hello}>Bem-vindo 👋</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ marginTop: 2 }}
              >
                <Text style={[styles.welcome, styles.loginLink]}>
                  Fazer login
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.headerIcons}>
          {user && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <Feather
                name="bell"
                size={24}
                color="#222"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ===========================
          CONTEÚDO ROLE APENAS AQUI
      ============================ */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===========================
            BANNER
        ============================ */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Realce sua beleza hoje!</Text>
          <Text style={styles.bannerSub}>
            Agende seu horário com facilidade
          </Text>

          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() =>
              user
                ? navigation.navigate("Schedule")
                : navigation.navigate("Login")
            }
          >
            <Text style={styles.bannerBtnText}>
              {user ? "Agendar agora" : "Fazer login para agendar"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===========================
            SERVIÇOS
        ============================ */}
        <Text style={styles.sectionTitle}>Serviços</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { icon: "scissors", label: "Cabelo" },
            { icon: "heart", label: "Manicure" },
            { icon: "smile", label: "Make" },
            { icon: "eye", label: "Sobrancelha" },
          ].map((item, i) => (
            <View key={i} style={styles.serviceCard}>
              <Feather name={item.icon as any} size={26} color="#986C6A" />
              <Text style={styles.serviceText}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ===========================
            PROFISSIONAIS
        ============================ */}
        <Text style={styles.sectionTitle}>Profissionais</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Julia", "Carla", "Marina"].map((prof, i) => (
            <View key={i} style={styles.proCard}>
              <Feather name="user" size={34} color="#986C6A" />
              <Text style={styles.proName}>{prof}</Text>
              <Text style={styles.proRole}>Especialista</Text>
            </View>
          ))}
        </ScrollView>

        {/* ===========================
            AGENDAMENTO (somente se logado)
        ============================ */}
        {user && (
          <>
            <Text style={styles.sectionTitle}>Próximo agendamento</Text>

            <View style={styles.bookingCard}>
              <Feather name="calendar" size={26} color="#986C6A" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.bookingTitle}>Amanhã às 15:30</Text>
                <Text style={styles.bookingSub}>Manicure com Julia</Text>
              </View>
            </View>
          </>
        )}

        {/* ===========================
            LOCALIZAÇÃO
        ============================ */}
        <Text style={styles.sectionTitle}>Localização</Text>

        <View style={styles.locationCard}>
          <Feather name="map-pin" size={26} color="#986C6A" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.locationText}>
              Av. Principal, 1200 — Centro
            </Text>
            <Text style={styles.locationLink}>Ver no mapa</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  header: {
    paddingHorizontal: vw * 5,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  hello: {
    fontSize: 18,
    color: "#222",
    fontWeight: "600",
  },

  welcome: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },

  loginLink: {
    color: "#986C6A",
    fontWeight: "700",
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  scroll: {
    paddingHorizontal: vw * 5,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  banner: {
    backgroundColor: "#F9F9F9",
    padding: 24,
    borderRadius: 18,
    marginBottom: 30,
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  bannerSub: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    marginBottom: 18,
  },

  bannerBtn: {
    backgroundColor: "#986C6A",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  bannerBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 14,
  },

  serviceCard: {
    width: 100,
    height: 95,
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEE",
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  serviceText: {
    marginTop: 6,
    color: "#222",
    fontSize: 14,
    fontWeight: "500",
  },

  proCard: {
    width: 120,
    height: 135,
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEE",
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },

  proName: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  proRole: {
    color: "#777",
    fontSize: 12,
    marginTop: 2,
  },

  bookingCard: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
    marginBottom: 25,
  },

  bookingTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  bookingSub: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },

  locationCard: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
    marginBottom: 40,
  },

  locationText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },

  locationLink: {
    color: "#986C6A",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "600",
  },
});
