import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Marca } from '../utils/types';

interface Props {
    marcas: Marca[];
    marcaSelecionada: Marca | null;
    handleMarcaChange: (marca: Marca | null) => void;
}

const MarcaSelector: React.FC<Props> = ({ marcas, marcaSelecionada, handleMarcaChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titlePicker}>Marca:</Text>
            <Picker
                selectedValue={marcaSelecionada}
                onValueChange={(itemValue) => handleMarcaChange(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
            >
                <Picker.Item label="Selecione a marca" value={null} />
                {marcas.map(marca => (
                    <Picker.Item key={marca.codigo} label={marca.nome} value={marca.codigo} />
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

export default MarcaSelector;
