import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Ano, DetalhesVeiculo, Marca, Modelo } from './src/utils/types';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { consultarMarcas, consultarModelos, consultarAnos, consultarFipe } from './src/services/api';
import VeiculoSelector from './src/components/RadioButtonTipoVeiculo';
import MarcaSelector from './src/components/MarcaSelector';
import ModeloSelector from './src/components/ModeloSelector';
import AnoSelector from './src/components/AnoSelector';

const App: React.FC = () => {

  const [veiculo, setVeiculo] = useState<string>('carros');
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [anos, setAnos] = useState<Ano[]>([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState<Marca | null>(null);
  const [modeloSelecionado, setModeloSelecionado] = useState<Modelo | null>(null);
  const [anoSelecionado, setAnoSelecionado] = useState<Ano | null>(null);
  const [detalhesVeiculo, setDetalhesVeiculo] = useState<DetalhesVeiculo | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMarcas() {
      try {
        const data = await consultarMarcas(veiculo);
        setMarcas(data);
      } catch (error) {
        setError('Erro ao consultar as marcas');

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }

    fetchMarcas();
  }, [veiculo]);

  useEffect(() => {
    async function fetchModelos() {
      if (marcaSelecionada) {

        try {
          const data = await consultarModelos(veiculo, marcaSelecionada);
          setModelos(data);
        } catch (error) {
          setError('Erro ao consultar os modelos');

          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      }
    }

    fetchModelos();
  }, [marcaSelecionada]);

  useEffect(() => {
    async function fetchAnos() {
      if (marcaSelecionada && modeloSelecionado) {
        try {
          const data = await consultarAnos(veiculo, marcaSelecionada, modeloSelecionado);
          setAnos(data);
        } catch (error) {
          setError('Erro ao consultar os anos');

          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      }
    }

    fetchAnos();
  }, [marcaSelecionada, modeloSelecionado]);

  async function consultarFIPE() {
    if (marcaSelecionada && modeloSelecionado && anoSelecionado) {
      try {
        const data = await consultarFipe(veiculo, marcaSelecionada, modeloSelecionado, anoSelecionado);
        setDetalhesVeiculo(data);
      } catch (error) {
        setError('Erro ao consultar tabela FIPE');

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  }

  function handleVeiculoChange(veiculo: string) {
    setModeloSelecionado(null);
    setAnoSelecionado(null);
    setDetalhesVeiculo(null);
    setVeiculo(veiculo);
    setMarcas([]);
    setModelos([]);
    setAnos([]);
  }

  function handleMarcaChange(marca: Marca | null) {
    setModeloSelecionado(null);
    setAnoSelecionado(null);
    setDetalhesVeiculo(null);
    setMarcaSelecionada(marca);
    setModelos([]);
    setAnos([]);
  }

  function handleModeloChange(modelo: Modelo | null) {
    setAnoSelecionado(null);
    setDetalhesVeiculo(null);
    setAnos([]);
    setModeloSelecionado(modelo);
  }

  function handleAnoChange(ano: Ano | null) {
    setDetalhesVeiculo(null);
    setAnoSelecionado(ano);
  }


  return (
    <SafeAreaProvider>
      <VeiculoSelector veiculo={veiculo} setVeiculo={handleVeiculoChange} />
      <MarcaSelector
        marcas={marcas}
        marcaSelecionada={marcaSelecionada}
        handleMarcaChange={handleMarcaChange}
      />
      <ModeloSelector
        modelos={modelos}
        modeloSelecionado={modeloSelecionado}
        handleModeloChange={handleModeloChange}
      />
      <AnoSelector
        anos={anos}
        anoSelecionado={anoSelecionado}
        handleAnoChange={handleAnoChange}
      />

      <View style={styles.container} >

        <View style={styles.spacer}></View>

        <Button title="Consultar Tabela FIPE" onPress={consultarFIPE} />

        {detalhesVeiculo && (
          <View style={styles.detalhesContainer}>
            <Text style={styles.detalhesText}>Tipo de Veículo: {detalhesVeiculo.TipoVeiculo}</Text>
            <Text style={styles.detalhesText}>Valor: {detalhesVeiculo.Valor}</Text>
            <Text style={styles.detalhesText}>Marca: {detalhesVeiculo.Marca}</Text>
            <Text style={styles.detalhesText}>Modelo: {detalhesVeiculo.Modelo}</Text>
            <Text style={styles.detalhesText}>Ano Modelo: {detalhesVeiculo.AnoModelo}</Text>
            <Text style={styles.detalhesText}>Combustível: {detalhesVeiculo.Combustivel}</Text>
            <Text style={styles.detalhesText}>Código FIPE: {detalhesVeiculo.CodigoFipe}</Text>
            <Text style={styles.detalhesText}>Mês de Referência: {detalhesVeiculo.MesReferencia}</Text>
            <Text style={styles.detalhesText}>Sigla Combustível: {detalhesVeiculo.SiglaCombustivel}</Text>
          </View>
        )}

        <View style={styles.spacer}></View>

        <Snackbar
          style={{ marginBottom: 80 }}
          visible={!!error}
          elevation={1}
          onDismiss={() => setError(null)}
        >
          {error}
        </Snackbar>

        <Text style={{ fontSize: 9 }} >Desenvolvido por Guilherme Lima</Text>
        <Text style={{ fontSize: 9 }} >https://www.linkedin.com/in/developer-glima/</Text>

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    marginTop: 50,
  },
  detalhesContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  detalhesText: {
    fontSize: 12,
  },
  spacer: {
    marginBottom: 10,
  }
});

export default App;
