import { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, SafeAreaView, View, Text, Image, TouchableOpacity, Button, TextInput, Modal } from 'react-native';
import axios from "axios";

function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [id, setId] = useState("")
  const [photo, setPhoto] = useState("https://salt.tikicdn.com/ts/product/3a/a1/8c/a87556ac060f0ea2bfd4f0dc277d7a43.jpg")
  const link = "../assets/images/365-ki-quan_master.png"
  const getPost = () => {
    fetch("https://63477bac0484786c6e81413c.mockapi.io/api/listBook/Book")
      .then((res) => res.json())
      .then(result => {
        console.log(result);
        setData(result);
      }).catch(e => console.log(e))
  }
  useEffect(() => {
    getPost()
  }, [])

  const handelDelete = (item) => {
    axios({
      url: "https://63477bac0484786c6e81413c.mockapi.io/api/listBook/Book/" + item.id,
      method: "delete"
    }).then((res) => {
      getPost();
    })

  }
  const handleUpdate = () => {
    axios.put("https://63477bac0484786c6e81413c.mockapi.io/api/listBook/Book/" + id, {
      name: name,
      photo: "https://salt.tikicdn.com/ts/product/3a/a1/8c/a87556ac060f0ea2bfd4f0dc277d7a43.jpg",
    }).then((res) => {
      setVisible(!visible)
      setName("")
      getPost();
    })
  }
  const handleModelUpdate = (item) => {
    setVisible(true)
    setName(item.name)
    setId(item.id)
  }
  const handleVisiable = () => {
    setVisible(!visible)
    setName("")
  }
  const handleModelAdd = () => {
    setVisibleAdd(true)
  }
  const handleVisiableAdd = () => {
    setVisibleAdd(!visibleAdd)
    setName("")
  }
  const addPost = () => {
    axios.post("https://63477bac0484786c6e81413c.mockapi.io/api/listBook/Book", {
      name: name,
      photo: photo,
    })
      .then((res) => {
        getPost();
        handleVisiableAdd();
      })
      .catch(e => { console.log(e) })
  }



  return (
    <SafeAreaView style={{ marginTop: 5, flex: 1 }}>
      <View style={{ flex: 4 }}>
        <FlatList

          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, borderWidth: 2, marginVertical: 10 }}
                onPress={() => navigation.navigate("Detail", {
                  data: item
                })}

              >
                <View style={{ flexDirection: 'row', }}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    //    source={require(item.photo.toString())}
                  //  source={require()}
                      source={{ uri: item.photo }}
                  />
                  <Text>{item.name}</Text>
                  
                 
                </View>
                <View >
                  <TouchableOpacity

                    onPress={() => handelDelete(item)}
                  >
                    <Text style={{ color: 'red' }}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor: 'yellow', marginTop: 30 }}
                    onPress={() => handleModelUpdate(item)}
                  >
                    <Text style={{ color: 'blue' }}>Update</Text>
                  </TouchableOpacity>

                </View>


              </TouchableOpacity>

            )
          }}
        />
      </View>

      <View
        style={{ flex: 1, marginTop: 10, marginHorizontal: 15 }}
      >
        <Button
          title='Add'
          onPress={() => handleModelAdd()}

        />
      </View>
      <Modal
        visible={visible}
      >
        <TextInput
          label="Title"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          style={{ borderWidth: 2 }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{ backgroundColor: 'red', height: 50, width: 100 }}
            onPress={() => handleUpdate()}
          >
            <Text>save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: 'yellow', height: 50, width: 100 }}
            onPress={() => handleVisiable()}
          >
            <Text>cancle</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={visibleAdd}
      >
        <TextInput
          label="Title"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
          style={{ borderWidth: 2 }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{ backgroundColor: 'red', height: 50, width: 100 }}
            onPress={() => addPost()}
          >
            <Text>save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: 'yellow', height: 50, width: 100 }}
            onPress={() => handleVisiableAdd()}
          >
            <Text>cancle</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Home;