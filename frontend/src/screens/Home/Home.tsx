import { View, Text, ActivityIndicator, Image } from "react-native";
import CustomButton from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import api from "../../services/api";


export default function Home({navigation}) {
  const { logout } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true)


  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  const fetchUser = async () => {
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nenhum usuário logado</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Welcome, {user.username}</Text>
      <Image
        source={require("../../assets/bernard-bianca.png")}
        style={{ width: 150, height: 150 }}
      />
      <CustomButton title="LOGOUT" onPress={handleLogout}></CustomButton>
    </View>
  );
}