import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { FaCoins } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import "./App.css";
import Button from "@material-ui/core/Button";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ContactMailIcon from "@material-ui/icons/ContactMail";

function App() {
  /* const é uma variável de valor fixo, somente para leitura, então vamos utilizar para ler a moeda que o user colocar */
  const [valor, setValor] = useState("");

  const [resultado, setResultado] = useState("");

  /* inicia a lista de moeda com real */
  const [tipoMoeda1, setTipo1Moeda] = useState("BRL");

  /* inicia a lista de moeda2 com dólar */
  const [tipoMoeda2, setTipo2Moeda] = useState("USD");

  /* new date para atualizar o site em tempo real */
  const [data, setData] = useState(new Date());

  const tiposMoedas = [
    /* tipos de moedas disponíveis para conversão */
    {
      value: "USD",
      label: "$ Dólar",
    },
    {
      value: "EUR",
      label: "€ Euro",
    },
    {
      value: "BRL",
      label: "R$ Real",
    },
  ];

  /* useEffect realiza a conversão a partir de qualquer alteração de estado de um componente */
  useEffect(() => {
    converter();
    document.title = `Conversor de moedas`;
  });

  async function converter() {
    /* realiza requisição para a API */
    const url = `https://economia.awesomeapi.com.br/${tipoMoeda1}-${tipoMoeda2}/1`;

    const valorCalc = valor.replace(",", "." ); /* utilizado para converter vígula para ponto */

    if (valorCalc === ""){
      setResultado(0);
      return;
    }

    if (isNaN(valorCalc) || valorCalc < 0) {
      /* validação para não funcionar com números negativos ou texto, somente funciona com não negativos */
      alert("Ops! Valores inválidos, por favor digite novamente");
      setValor("");
      return;
    }

    if (tipoMoeda1 !== tipoMoeda2) {
      /* verifica se a conversão esta sendo feita para a mesma moeda, retornando assim o próprio valor caso ocorra */
      fetch(url) /* fetch busca os dados na URL */
        .then((response) => response.json())
        .then((data) => {
          data = data[0]; /* guardar o resultado de retorno da API */
          setResultado(valorCalc * data.high);
          setData(data.create_date);
        });
    } else {
      setResultado(valorCalc);
    }
  }

  function inverter() {
    /* utilizado para trocar os campos de moedas */
    const aux = tipoMoeda1;
    setTipo1Moeda(tipoMoeda2);
    setTipo2Moeda(aux);
  }

  return (
    /* tudo o que será mostrado */
    <>
      {/* React Fragment */}
      <Navbar bg="info">
        {" "}
        {/* Navbar = barra de navegação */}
        <Navbar.Brand>Conversor de Moedas</Navbar.Brand>
      </Navbar>
      <Jumbotron>
        <h1>
          Olá! Bem-vindo(a) ao conversor de moedas <FaCoins />
        </h1>
        <p>
          Aqui você poderá fazer a conversão de moedas para Real, Dólar e Euro!
        </p>
        <br></br>
        <Form>
          <Form.Label>Informe o valor a ser convertido</Form.Label>
          <FormControl /* local que o user vai digitar */
            type="text"
            value={valor}
            placeholder="$"
            onChange={(event) =>
              setValor(event.target.value)
            } /* onChange para quando a digitação, guarda o valor digitado */
          />
          <br></br>
          <Form.Label>Informe a moeda atual</Form.Label>
          <br></br>
          <TextField /* lista de moedas */
            id="standard-select-currency1"
            select
            label=""
            value={tipoMoeda1}
            onChange={(event) => setTipo1Moeda(event.target.value)}
            helperText="Por favor selecione a moeda atual"
          >
            {tiposMoedas.map((
              option /* .map, percorre o array de tipo de moedas e cria o menu de itens */
            ) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br></br>
          <br></br>
          <Button /* botão para inverter o tipo de moeda selecionado */
            variant="contained"
            color="primary"
            startIcon={<SwapVertIcon />}
            onClick={() => inverter()}
          >
            INVERTER
          </Button>
          <br></br>
          <br></br>
          <Form.Label>Informe a moeda a ser convertida</Form.Label>
          <br></br>
          <TextField
            id="standard-select-currency1"
            select
            label=""
            value={tipoMoeda2}
            onChange={(event) => setTipo2Moeda(event.target.value)}
            helperText="Por favor selecione a moeda a ser convertida"
          >
            {tiposMoedas.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br></br>
          <Card bg="info" className="text-center">
            {" "}
            {/* card esta sendo utilizado para mostrar o resultado */}
            <Card.Header>
              <h2>
                {resultado.toLocaleString("pt-br", {
                  style: "currency",
                  currency: tipoMoeda2,
                })}
              </h2>
            </Card.Header>
          </Card>
          <br></br>
          <span>{`Última atualização: ${data}`}</span>
        </Form>
      </Jumbotron>
      <footer>
        {" "}
        {/* rodapé */}
        Aplicativo desenvolvido por Cintia Felix Mendonça <br></br>{" "}
        {<ContactMailIcon />} cintiafelix1@gmail.com
      </footer>
    </>
  );
}
export default App;
