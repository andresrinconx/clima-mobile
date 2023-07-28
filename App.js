import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import Formulario from './components/Formulario'
import Clima from './components/Clima'

const App = () => {
  const [ busqueda, setBusqueda ] = useState({
    pais: '',
    ciudad: '',
  })
  const [ consultarAPI, setConsultarAPI ] = useState(false)
  const [ resultado, setResultado ] = useState({})
  const [ bgcolor, setBgcolor ] = useState('rgb(71, 149, 212)')

  const {ciudad, pais} = busqueda

  useEffect(() => {
    const consultarClima = async () => {
      if (consultarAPI) {
        const appId = 'b4aab30b10445bab3ef82ddb9c657794'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

        try {
          const response = await fetch(url)
          const result = await response.json()
          setResultado(result)
          setConsultarAPI(false)

          // background

          const kelvin = 273.15
          const {main} = resultado
          const actual = main.temp - kelvin

          
          if (actual < 10) {
            setBgcolor('rgb(105, 100, 149)')
          } else if(actual >= 10 && actual < 25) {
            setBgcolor('rgb(71, 149, 212)')
          } else {
            setBgcolor('rgb(178, 28, 61)')
          }

        } catch (error) {
          mostrarAlerta()
        }
      }
    }
    consultarClima()
  }, [consultarAPI])

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No hay resultados, intenta con otra ciudad o pais',
      [
        { text: 'Entendido' },
      ]
    )    
  }

  const ocultarTeclado = () => {
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }

  return (
    <>  
      <TouchableWithoutFeedback
        onPress={ () => ocultarTeclado() }
      >
        <View style={[styles.app, bgColorApp]}>
            <View>
              <Clima
                resultado={resultado}
              />
            </View>

            <View style={styles.contenido}>
              <Formulario 
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultarAPI={setConsultarAPI}
              />
            </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71, 149, 212)',
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
})

export default App