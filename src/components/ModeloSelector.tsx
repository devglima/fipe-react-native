import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modelo } from '../utils/types';
import { Picker } from '@react-native-picker/picker';

interface Props {
  modelos: Modelo[];
  modeloSelecionado: Modelo | null;
  handleModeloChange: (modelo: Modelo | null) => void;
}

const ModeloSelector: React.FC<Props> = ({ modelos, modeloSelecionado, handleModeloChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titlePicker}>Modelo:</Text>
      <Picker
        selectedValue={modeloSelecionado}
        onValueChange={(itemValue ) => handleModeloChange(itemValue)}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Selecione o modelo" value={null} />
        {modelos.map(modelo => (
          <Picker.Item key={modelo.codigo} label={modelo.nome} value={modelo.codigo} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  titlePicker: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18
  },
  picker: {
    width: '80%',
  },
  pickerItem: {
    height: 100,
    fontSize: 14,
  },
});

export default ModeloSelector;
