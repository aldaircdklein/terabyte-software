import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketIOCliente from 'socket.io-client';

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [ip, setIP] = useState('0.0.0.0');
  const [socket, setSocket] = useState();
  const [scanned, setScanned] = useState(false);
  const [ativarCamera, setAtivarCamera] = useState(false);

  const AsyncIP = async () => {
    try {
      await AsyncStorage.setItem('@storage_ip', ip)
    } catch (e) {}
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      try {
        const value = await AsyncStorage.getItem('@storage_ip');
        if(value !== null){
          setIP(value);
          setSocket(socketIOCliente(`http://${value}:3333`));
        }
      } catch (error) {}

    })();
  }, []);

  const SocketEmitCode = (codeProduct) => {
    socket.emit("sendCode", codeProduct)
  }

  const handleBarCodeScanned = (dado) => {
    setScanned(true);
    SocketEmitCode(dado.data);
    alert(`Código lido: ${dado.data}`);
    setTimeout(()=>{
      setScanned(false);
    },1000)
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    return (
    <View style={{ flex: 2, backgroundColor:'#e1e1e1'}}>
      <Text style={{marginTop:30, textAlign:'center'}}>Leitor Código</Text>
      <Button color="#030e45" title={'Abrir/fechar  câmera'} onPress={() => {setAtivarCamera( ativarCamera? false:true)}} />
      {
        ativarCamera? (
          <>
            <Camera style={{height:400}}
              type={Camera.Constants.Type.back}
              flashMode={flash}
              onBarCodeScanned={ dado => {scanned ? undefined : handleBarCodeScanned(dado)}}
            >
            </Camera>
            <Button color="#030e45" title={'Ligar/desligar flash'} onPress={() => {setFlash(flash === Camera.Constants.FlashMode.off? Camera.Constants.FlashMode.torch:Camera.Constants.FlashMode.off)}} />
          </>
        ):<Text style={{marginTop:30, marginBottom:30 ,textAlign:'center'}}>Bem vindo ao Terabyte Software</Text> 
      }
      <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop:20}}
          onChangeText={text => setIP(text)}
          value={ip}
        />
      <Button title={'Salvar IP'} onPress={() => {AsyncIP()}} color="transparent" />
    </View>
    );
};