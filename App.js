import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";


import { FontAwesome5 } from "@expo/vector-icons";
// const urlServer = "http://localhost:28002/traxpet-server/rest";
export default function App() {
  const url =
    "http://192.168.100.51:28002/traxpet-server/rest/imagenesMascota/mascotasActivas";
  const mascotasSimilares = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const numberOfItemsPerPageList = [5, 20, 50];
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [isLoading, setIsLoading] = useState(true);
  const [imagenesMascotas, setImagenesMascotas] = useState([]);

  const fetchImages = async () => {
    console.log("Se actualizan imagenes");
    setIsLoading(true);
    const mascotasParaBuscar = mascotasSimilares.slice(
      page * numberOfItemsPerPage,
      page * numberOfItemsPerPage + numberOfItemsPerPage
    );
    if (mascotasParaBuscar.length !== 0) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(mascotasParaBuscar),
      });
      const imagenes = await response.json();

      const mascotitas = imagenesMascotas.concat(imagenes.data);
      setImagenesMascotas(mascotitas);
      setPage(page + 1);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const listEmpty = () => {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          No hay publicaciones que coincidan con la especie de tu mascota :c
        </Text>
        <FontAwesome5 name="paw" size={32} color={"orange"} />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/jpg;base64,${item.ImagenData}` }}
            style={styles.image}
          />
        <TouchableOpacity style={styles.botonVerMas} onPress={fetchImages}>
          <Text>Seleccionar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const botonVerMas = () => {
    return (
      <TouchableOpacity style={styles.botonVerMas} onPress={fetchImages}>
        <Text>Ver mas mascotas</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={imagenesMascotas}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={botonVerMas}
        ListHeaderComponentStyle={{
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
        renderItem={renderItem}
        ListFooterComponent={botonVerMas}
        ListFooterComponentStyle={{
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
        numColumns={2}
        ListEmptyComponent={listEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    height: 250,
    resizeMode: "contain",
    resizeMethod: "scale",
    width: "100%",
    borderRadius: 25,
  },

  message: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 5,
    color: "black",
  },
  botonVerMas: {
    width: 200,
    height: 60,
    backgroundColor: "orange",
  },
  messageContainer: { justifyContent: "center", alignItems: "center" },
});
