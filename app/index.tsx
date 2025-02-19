import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ToastAndroid, // ✅ Import Toast for notifications
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TodoType = {
  id: number;
  title: string;
  isDone: boolean;
};



export default function Index() {
  const tododData: TodoType[] = [
    { id: 1, title: "Task 1", isDone: true },
    { id: 2, title: "Task 2", isDone: false },
    { id: 3, title: "Task 3", isDone: false },
    { id: 4, title: "Task 4", isDone: false },
    { id: 5, title: "Task 5", isDone: false },
  ];

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [serachQuery, setSearchQuery] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<TodoType[]>([]);

  const [isSearching, setIsSearching] = useState<boolean>(false); // ✅ Added state to track search status

  useEffect(() => {
    const getTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("my-todo");
        if (storedTodos !== null) {
          const parsedTodos = JSON.parse(storedTodos);
          setTodos(parsedTodos);
          setOldTodos(parsedTodos);
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Failed to load todos!", ToastAndroid.SHORT);
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    // Cannot add Empty
    if (todoText.trim() === "") {
      ToastAndroid.show("Todo cannot be empty!", ToastAndroid.SHORT);
      return;
    }
    try {
      const newTodo = {
        id: Math.random(),
        title: todoText,
        isDone: false,
      };
      const updatedTodos = [...todos, newTodo]; // ✅ Corrected state update
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodos));
      setTodoText("");
      Keyboard.dismiss();
      ToastAndroid.show("Todo Added Successfully!", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Failed to add todo!", ToastAndroid.SHORT);
    }
  };


  const deleteTodo = async (id: number) => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const newTodos = todos.filter((todo) => todo.id !== id);
              await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
              setTodos(newTodos);
              setOldTodos(newTodos);
              ToastAndroid.show("Todo Deleted!", ToastAndroid.SHORT);
            } catch (error) {
              console.log(error);
              ToastAndroid.show("Failed to delete todo!", ToastAndroid.SHORT);
            }
          },
        },
      ]
    );
  };

  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      ); // ✅ Fix for correct state update

      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Failed to update todo!", ToastAndroid.SHORT);
    }
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query !== ""); // ✅ Set search state
    if (query === "") {
      setTodos(oldTodos);
      return;
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    onSearch(serachQuery);
  }, [serachQuery]);

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert("clicked!")} activeOpacity={0.5}>
          <Ionicons name="menu" size={24} color={"#333"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert("Feature Not Implemented Yet!")}>
          <Image
            source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={20}
          color={"#333"}
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Search..."
          value={serachQuery}
          onChangeText={(text) => setSearchQuery(text)}
          placeholderTextColor="#999"
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>

      {/* Todo List */}
      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            deleteTodo={deleteTodo}
            handleTodo={handleDone}
          />
        )} // ✅ Fixed
      />

      {/* Input Field */}
      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <TextInput
          placeholder="Add New Todo"
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
          style={styles.newTodoInput}
          placeholderTextColor="#999"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <Ionicons name="add" size={34} color={"#fff"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>


    </SafeAreaView>
  );
}

// ✅ Fixed: Add return statement inside `TodoItem`
const TodoItem = ({
  todo,
  deleteTodo,
  handleTodo,
}: {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  handleTodo: (id: number) => void;
}) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoInfoContainer}>
        <Checkbox
          value={todo.isDone}
          onValueChange={() => handleTodo(todo.id)}
          color={todo.isDone ? "#4630EB" : undefined}
        />
        <Text
          style={[
            styles.todoText,
            todo.isDone && { textDecorationLine: "line-through" },
          ]}
        >
          {todo.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          deleteTodo(todo.id);
        }}
      >
        <Ionicons name="trash" size={24} color={"red"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  todoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  searchBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 15,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1, // ✅ Fixed: Allows input to take available space
    fontSize: 16,
    color: "#333", // ✅ Ensures entered text is visible
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4630EB",
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
});
