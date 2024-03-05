import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface Props {
    veiculo: string;
    setVeiculo: (newValue: string) => void;
}

const VeiculoSelector: React.FC<Props> = ({ veiculo, setVeiculo }) => {
    return (
        <View style={styles.container}>
            <RadioButton.Group onValueChange={newValue => setVeiculo(newValue)} value={veiculo} >
                <View style={styles.radioButtonContainer}>
                    <RadioButton.Item label="Carro" value="carros" />
                    <RadioButton.Item label="Moto" value="motos" />
                    <RadioButton.Item label="Caminhão" value="caminhoes" />
                </View>
            </RadioButton.Group>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        alignItems: 'center',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default VeiculoSelector;
