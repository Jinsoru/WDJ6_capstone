import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import LottieView from 'lottie-react-native';

const MapTest = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={false}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello  dddsadasdasdasda World!</Text>
            <Text style={styles.modalText}>Hello  dddsadasdasdasda World!</Text>
            <Text style={styles.modalText}>Hello  dddsadasdasdasda World!</Text>
            <Text style={styles.modalText}>Hello  dddsadasdasdasda World!</Text>
            <Text style={styles.modalText}>Hello  dddsadasdasdasda World!</Text>
            <Text style={styles.modalText}>Hello  dddsadasdasdasda World!</Text>
            <Text style={styles.modalText}>Hello  dddsadasdasdasda World!</Text>
            <Text style={styles.modalText}>Hello  dddsadasdasdasda World!</Text>
            <Text style={styles.modalText}>Hello  dddsadasdasdasda World!</Text>
            
            <LottieView
              // style={{flex:1, backgroundColor:'#EFEFEF'}}
              resizeMode={'contain'}
              source={require('~/Assets/Lottie/nodata2.json')}
              autoPlay
              imageAssetsFolder={'images'}
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 2000);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default MapTest;