// src/screens/Home/ScheduleScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export default function ScheduleScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { serviceName, serviceTime, servicePrice } = route.params as any;

  const professionals = [
    { id: 1, name: "Maria Almeida" },
    { id: 2, name: "Ana Paula" },
    { id: 3, name: "Fernanda Silva" },
  ];

  const times = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
  ];

  const generateDates = () => {
    const today = new Date();
    const arr = [];

    for (let i = 0; i < 10; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      arr.push({
        id: i,
        day: d.getDate(),
        weekday: d.toLocaleDateString("pt-BR", { weekday: "short" }),
        full: d.toISOString().split("T")[0],
      });
    }

    return arr;
  };

  const dates = generateDates();

  const [selectedProfessional, setSelectedProfessional] =
    useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const canConfirm = !!(selectedProfessional && selectedDate && selectedTime);

  return (
    <View style={styles.page}>
      {/* HEADER COM VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Agendamento</Text>

        {/* espaço para centralizar */}
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* DETALHES DO SERVIÇO */}
        <View style={styles.serviceBox}>
          <Text style={styles.serviceTitle}>{serviceName}</Text>

          <View style={styles.serviceRow}>
            <Feather name="clock" size={18} color="#986C6A" />
            <Text style={styles.serviceDetail}>{serviceTime}</Text>
          </View>

          <View style={styles.serviceRow}>
            <Feather name="tag" size={18} color="#986C6A" />
            <Text style={styles.serviceDetail}>{servicePrice}</Text>
          </View>
        </View>

        {/* PROFISSIONAIS */}
        <Text style={styles.sectionTitle}>Selecione a profissional</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {professionals.map((p) => (
            <TouchableOpacity
              key={p.id}
              onPress={() => setSelectedProfessional(p.id)}
              style={[
                styles.profCard,
                selectedProfessional === p.id && styles.profSelected,
              ]}
            >
              <Feather
                name="user"
                size={26}
                color={selectedProfessional === p.id ? "#FFF" : "#986C6A"}
              />
              <Text
                style={[
                  styles.profName,
                  selectedProfessional === p.id && styles.profNameSelected,
                ]}
              >
                {p.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* DATAS */}
        <Text style={styles.sectionTitle}>Selecione a data</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((d) => (
            <TouchableOpacity
              key={d.id}
              onPress={() => setSelectedDate(d.full)}
              style={[
                styles.dateCard,
                selectedDate === d.full && styles.dateSelected,
              ]}
            >
              <Text
                style={[
                  styles.dateWeek,
                  selectedDate === d.full && styles.dateSelectedText,
                ]}
              >
                {d.weekday}
              </Text>
              <Text
                style={[
                  styles.dateDay,
                  selectedDate === d.full && styles.dateSelectedText,
                ]}
              >
                {d.day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* HORÁRIOS */}
        <Text style={styles.sectionTitle}>Selecione o horário</Text>

        <View style={styles.timesGrid}>
          {times.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedTime(t)}
              style={[
                styles.timeCard,
                selectedTime === t && styles.timeSelected,
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === t && styles.timeSelectedText,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BOTÃO CONFIRMAR */}
        <TouchableOpacity
          disabled={!canConfirm}
          style={[
            styles.confirmButton,
            !canConfirm && styles.buttonDisabled,
          ]}
          onPress={() => {
            const prof = professionals.find(
              (p) => p.id === selectedProfessional
            )?.name;

            alert(
              `Agendado!\nServiço: ${serviceName}\nProfissional: ${prof}\nData: ${selectedDate}\nHora: ${selectedTime}`
            );
          }}
        >
          <Text style={styles.confirmText}>Confirmar Agendamento</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: height * 0.09, // 🔥 AFASTANDO TUDO DO TOPO
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },

  container: {
    paddingHorizontal: 22,
  },

  // SERVIÇO DETALHADO
  serviceBox: {
    backgroundColor: "#F7EDED",
    padding: 18,
    borderRadius: 14,
    marginBottom: 25,
  },

  serviceTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },

  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 8,
  },

  serviceDetail: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    marginTop: 10,
  },

  // PROFISSIONAIS
  profCard: {
    width: 160,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: "#F5EAEA",
    borderRadius: 14,
    marginRight: 14,
    elevation: 2,
    alignItems: "center",
  },

  profSelected: {
    backgroundColor: "#986C6A",
  },

  profName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#444",
    marginTop: 8,
  },

  profNameSelected: {
    color: "#FFF",
  },

  // DATAS
  dateCard: {
    width: 75,
    height: 85,
    backgroundColor: "#F1F1F1",
    borderRadius: 16,
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  dateSelected: {
    backgroundColor: "#986C6A",
  },

  dateWeek: {
    fontSize: 14,
    color: "#555",
  },

  dateDay: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },

  dateSelectedText: {
    color: "#FFF",
  },

  // HORÁRIOS
  timesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 6,
  },

  timeCard: {
    width: "30%",
    paddingVertical: 14,
    backgroundColor: "#F3F3F3",
    borderRadius: 12,
    alignItems: "center",
  },

  timeSelected: {
    backgroundColor: "#986C6A",
  },

  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },

  timeSelectedText: {
    color: "#FFF",
  },

  // BOTÃO CONFIRMAR
  confirmButton: {
    marginTop: 30,
    backgroundColor: "#986C6A",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonDisabled: {
    backgroundColor: "#c9a6a4",
  },

  confirmText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },
});
