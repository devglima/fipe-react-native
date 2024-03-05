import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ano } from '../utils/types';
import { Picker } from '@react-native-picker/picker';

interface Props {
  anos: Ano[];
  anoSelecionado: Ano | null;
  handleAnoChange: (ano: Ano | null) => void;
}

const AnoSelector: React.FC<Props> = ({ anos, anoSelecionado, handleAnoChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titlePicker}>Ano:</Text>
      <Picker
        selectedValue={anoSelecionado}
        onValueChange={(itemValue) => handleAnoChange(itemValue)}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Selecione o ano" value={null} />
        {anos.map(ano => (
          <Picker.Item key={ano.codigo} label={ano.nome} value={ano.codigo} />
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

export default AnoSelector;
