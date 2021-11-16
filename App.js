
import { StatusBar } from 'expo-status-bar';

import React, { useState,useEffect,useRef,Component } from "react";
import { View, TextInput ,Button,TouchableOpacity, SafeAreaView,Text, Platform,StyleSheet, Image } from "react-native";

import * as ImagePicker from 'expo-image-picker';

import firebase from 'firebase/app'
import 'firebase/storage';
//import Axios from "axios";  não foi utilizada. nem sei como utilizar

export default function App() {

  const [value, onChangeText] = React.useState('Nome do arquivo.jpg');

  var firebaseConfig = {
    apiKey: "AIzaSyC6FjL67tWzBHTmPSnLqpbKi0lDOfgsxvA",
    authDomain: "imagens-4c072.firebaseapp.com",
    projectId: "imagens-4c072",
    storageBucket: "imagens-4c072.appspot.com",
    messagingSenderId: "731891870909",
    appId: "1:731891870909:web:e5e80a47abce62a86ddbd4"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
 }


  const [image, setImage] = useState(null);
  const [arquivo,setArquivo] = useState("");

//  const storage = firebase.app().storage("gs://imagens-4c072.appspot.com/");


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sinto muito, mas precisamos ter acesso!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.uri);
  }


const saveImage = async () => {
  let response = await fetch(image);
  let blob = await response.blob();
  firebase.storage().ref().child('imagens/' + arquivo + '.png').put(blob); //  .put(image,metadata);

 }



  return (
    <SafeAreaView style={styles.container}>
      <Button title="Selecione uma imagem da galeria" onPress={pickImage} />
        <Image source={{ uri: image }} style={{ width: 180, height: 180 }} />
        <TextInput 
                  backgroundColor='white'
                  onChangeText={arquivo => setArquivo(arquivo)}
                  placeholder="informe nome do arquivo sem extensão"
                  value={arquivo}/>
        <Button title="Gravar" onPress={saveImage}/>
    </SafeAreaView>
  ); //fecha o return
  
}  //fecha function App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    margin:5,
    borderRadius:25,
    marginTop:50,
    borderColor:'white',
  },
  texto:{
    color:'white'
  }
});
