// src/screens/Home/ServicesScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const vw = width / 100;

export default function ServicesScreen() {
  const navigation = useNavigation<any>();

  const services = [
    {
      id: 1,
      name: "Manicure Simples",
      price: "R$ 35,00",
      time: "40 min",
      tag: "unhas",
      image:
        "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 2,
      name: "Pedicure Completa",
      price: "R$ 45,00",
      time: "50 min",
      tag: "unhas",
      image:
        "https://images.unsplash.com/photo-1610992015732-975c3f31c52a?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 3,
      name: "Alongamento em Gel",
      price: "R$ 120,00",
      time: "1h 30min",
      tag: "gel",
      image:
        "https://images.unsplash.com/photo-1598532886846-50eaf4d0e7f8?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 4,
      name: "Sobrancelha Design",
      price: "R$ 30,00",
      time: "25 min",
      tag: "sobrancelha",
      image:
        "https://images.unsplash.com/photo-1599458533998-fdbf03e4f3de?auto=format&fit=crop&w=600&q=60",
    },
  ];

  const tags = ["todas", "unhas", "gel", "sobrancelha"];

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("todas");

  const filteredList = services.filter((s) => {
    const matchText = s.name.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === "todas" || s.tag === selectedTag;
    return matchText && matchTag;
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Serviços</Text>

        {/* BUSCA */}
        <View style={styles.searchBox}>
          <Feather name="search" size={20} color="#777" />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar serviço..."
            placeholderTextColor="#777"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* FILTROS POR TAG */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 4 }}
        >
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                selectedTag === tag && styles.tagSelected,
              ]}
              onPress={() => setSelectedTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTag === tag && styles.tagTextSelected,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTA DE SERVIÇOS */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredList.map((s) => (
          <View key={s.id} style={styles.card}>
            <Image source={{ uri: s.image }} style={styles.image} />

            <View style={styles.infoBox}>
              <Text style={styles.serviceName}>{s.name}</Text>

              <Text style={styles.detail}>
                <Feather name="clock" size={14} color="#777" /> {s.time}
              </Text>

              <Text style={styles.price}>{s.price}</Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Schedule", {
                  serviceId: s.id,
                  serviceName: s.name,
                  serviceTime: s.time,
                  servicePrice: s.price,
                })
              }
            >
              <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        ))}

        {filteredList.length === 0 && (
          <Text style={styles.noResults}>Nenhum serviço encontrado.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: height * 0.12,
    paddingHorizontal: vw * 6,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 14,
    height: 50,
    borderRadius: 12,
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },

  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#EEE",
    borderRadius: 20,
    marginRight: 10,
  },

  tagSelected: {
    backgroundColor: "#986C6A",
  },

  tagText: {
    color: "#555",
    fontSize: 14,
  },

  tagTextSelected: {
    color: "#FFF",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
    alignItems: "center",
    elevation: 2,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
  },

  infoBox: {
    flex: 1,
  },

  serviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },

  detail: {
    fontSize: 13,
    color: "#777",
    marginBottom: 3,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#986C6A",
  },

  button: {
    backgroundColor: "#986C6A",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },

  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    color: "#777",
  },
});
