import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const vw = width / 100;

export default function NotificationScreen() {
  const navigation = useNavigation<any>();

  const notifications = [
    {
      id: 1,
      title: "Horário confirmado!",
      description: "Sua manicure com Julia foi confirmada às 15:30.",
      icon: "check-circle",
    },
    {
      id: 2,
      title: "Promoção da semana",
      description: "10% OFF em serviços de cabelo até sexta!",
      icon: "gift",
    },
    {
      id: 3,
      title: "Novo profissional",
      description: "Conheça a nova especialista em sobrancelhas: Marina!",
      icon: "user-plus",
    },
  ];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={22} color="#222" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notificações</Text>

        {/* Placeholder para balancear */}
        <View style={{ width: 40 }} />
      </View>

      {/* LISTA */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconBox}>
              <Feather name={item.icon as any} size={24} color="#986C6A" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
          </View>
        ))}

        {notifications.length === 0 && (
          <View style={styles.emptyBox}>
            <Feather name="bell-off" size={40} color="#AAA" />
            <Text style={styles.emptyText}>Nenhuma notificação por enquanto</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: vw * 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  scrollContent: {
    paddingHorizontal: vw * 5,
    paddingTop: 20,
    paddingBottom: 40,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
    gap: 14,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#F1E5E4",
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },

  cardDesc: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },

  emptyBox: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
  },
});
