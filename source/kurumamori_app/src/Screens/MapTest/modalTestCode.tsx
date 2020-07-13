import React, { Component, useState } from "react";
import { Modal } from "react-native";
import LottieView from 'lottie-react-native';
import Styled from 'styled-components/native';

const ViewModal = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TouchableOpacity = Styled.TouchableOpacity``;


const View = Styled.View``;
const Text = Styled.Text``;


const [modalVisible, setModalVisible] = useState(false);

<ViewModal>
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
    }}
    >
    <View>

    </View>

  </Modal>

  <TouchableOpacity>
    <Text>Show Modal</Text>
  </TouchableOpacity>
  
</ViewModal>
