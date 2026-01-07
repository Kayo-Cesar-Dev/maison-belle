import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const vw = width / 100;

export default function AppointmentsScreen() {
  const appointments = [
    {
      id: 1,
      service: "Manicure + Pedicure",
      date: "27/11/2025",
      time: "14:30",
      professional: "Maria Almeida",
      status: "CONFIRMADO",
    },
    {
      id: 2,
      service: "Alongamento de Unhas",
      date: "02/12/2025",
      time: "09:00",
      professional: "Ana Paula",
      status: "PENDENTE",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Meus Agendamentos</Text>

      {appointments.map((a) => (
        <View key={a.id} style={styles.card}>
          {/* LADO ESQUERDO */}
          <View style={styles.cardLeft}>
            <Text style={styles.service}>{a.service}</Text>
            <Text style={styles.date}>
              {a.date} • {a.time}
            </Text>
            <Text style={styles.professional}>com {a.professional}</Text>
          </View>

          {/* LADO DIREITO */}
          <View style={styles.cardRight}>
            <View
              style={[
                styles.statusBadge,
                a.status === "CONFIRMADO"
                  ? styles.statusConfirmed
                  : styles.statusPending,
              ]}
            >
              <Text style={styles.statusText}>{a.status}</Text>
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Feather name="more-vertical" size={22} color="#444" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* BOTÃO NOVO AGENDAMENTO */}
      <TouchableOpacity style={styles.newButton}>
        <Feather name="plus" size={22} color="#FFF" />
        <Text style={styles.newButtonText}>Novo Agendamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: height * 0.12, // alinhado com Perfil
    paddingHorizontal: vw * 6,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    elevation: 2,
  },

  cardLeft: {
    flex: 1,
  },

  service: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },

  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },

  professional: {
    fontSize: 14,
    color: "#777",
  },

  cardRight: {
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusConfirmed: {
    backgroundColor: "#D4F8D4",
  },

  statusPending: {
    backgroundColor: "#FFE6B3",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },

  moreButton: {
    marginTop: 10,
    padding: 5,
  },

  newButton: {
    marginTop: 20,
    backgroundColor: "#986C6A",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  newButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
