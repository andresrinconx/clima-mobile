import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import React, {useState} from 'react'
import { Picker } from '@react-native-picker/picker'

const Formulario = ({busqueda, setBusqueda, setConsultarAPI}) => {

  const {pais, ciudad} = busqueda
    
  const [ animacionBoton ] = useState(new Animated.Value(1))

  const consultarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '') {
        mostrarAlerta()
        return
    }

    // Pasa la validacion
    setConsultarAPI(true)
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'Agrega una ciudad y un pais para la busqueda',
      [
        { text: 'Entendido' },
      ]
    )
  }

//   const animacionEntrada = () => {
//     Animated.spring( animacionBoton, {
//         toValue: .9
//     }).start()
//   }

//   const animacionSalida = () => {
//     Animated.spring( animacionBoton, {
//         toValue: 1,
//         friction: 4,
//         tension: 30,
//     }).start()
//   }

  const estiloAnimacion = {
    transform: [{ scale: animacionBoton }]
  }

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            placeholder='Ciudad'
            placeholderTextColor='#666'
            style={styles.input}
            value={ciudad}
            onChangeText={ ciudad => setBusqueda({...busqueda, ciudad}) } // el parametro se pasa automatico
          />
        </View>
        <View
            style={styles.picker}
        >
          <Picker
            itemStyle={{ height: 120, backgroundColor: '#fff' }}
            selectedValue={pais}
            onValueChange={ pais => setBusqueda({...busqueda, pais}) } // se reescribe
          >
            <Picker.Item label='-- Seleccione --' value="" />
            <Picker.Item label='Estados Unidos' value="US" />
            <Picker.Item label='Mexico' value="MX" />
            <Picker.Item label='Argentina' value="AR" />
            <Picker.Item label='Colombia' value="CO" />
            <Picker.Item label='Costa Rica' value="CR" />
            <Picker.Item label='Espain' value="ES" />
            <Picker.Item label='Peru' value="PE" />
          </Picker>
        </View>

        <TouchableWithoutFeedback
            // onPressIn={ () => animacionEntrada() }
            // onPressOut={ () => animacionSalida() }
            onPress={ () => consultarClima() }
        >
            <Animated.View
                style={[styles.btnBuscar, estiloAnimacion]}
            >
              <Text style={styles.textoBuscar}>Buscar Clima</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  formulario: {
    marginTop: 100,
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#fff',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
})

export default Formulario