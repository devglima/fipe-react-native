import axios from 'axios';
import { Ano, Marca, Modelo } from '../utils/types';

export async function consultarMarcas(veiculo: string) {
    try {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao consultar as marcas');
    }
}

export async function consultarModelos(veiculo: string, marcaSelecionada: Marca) {
    try {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marcaSelecionada}/modelos`);

        return response.data['modelos'];
    } catch (error) {
        throw new Error('Erro ao consultar os modelos');
    }
}

export async function consultarAnos(veiculo: string, marcaSelecionada: Marca, modeloSelecionado: Modelo) {
    try {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos`);
        return response.data;
        
      } catch (error) {
        throw new Error('Erro ao consultar os anos');
      }
}

export async function consultarFipe(veiculo: string, marcaSelecionada: Marca, modeloSelecionado: Modelo, anoSelecionado: Ano) {
    try {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marcaSelecionada}/modelos/${modeloSelecionado}/anos/${anoSelecionado}`);

        return response.data;
      } catch (error) {
        throw new Error('Erro ao consultar a FIPE');
      }
}


