import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { FaCoins } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "./App.css";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

function App() {
  const [valor, setValor] = useState(""); /* const é uma variável de valor fixo, somente para leitura, então vamos utilizar para ler a moeda que o user colocar */
  const [resultado, setResultado] = useState("");
  const [tipoMoeda1, setTipo1Moeda] = useState("BRL"); /* inicia a lista de moeda com real */
  const [tipoMoeda2, setTipo2Moeda] = useState("USD"); /* inicia a lista de moeda2 com dólar */
  const tiposMoedas = [{
    value: 'USD',
    label: '$ Dólar',
  },
  {
    value: 'EUR',
    label: '€ Euro',
  },
  {
    value: 'BRL',
    label: 'R$ Real',
  }]
  
  const data = new Date(); /* new date para atualizar o site em tempo real */

  // useEffect(() => { /* useEffect esta sendo utilizado para não precisar do botão de conversão, pois assim que o user digita o valor ele já trás o resultado */
  //   converter()
  // })

  async function converter() {
    let url = `https://economia.awesomeapi.com.br/${tipoMoeda1}-${tipoMoeda2}/1`;
    if(tipoMoeda1 !== tipoMoeda2){
    fetch(url) /* fetch busca os dados na URL */
      .then((response) => response.json())
      .then((data) => {
        data = data[0]; /* guardar o resultado de retorno da API */
        console.log(data);
        setResultado(valor * data.high);
      });
    } else{
      setResultado(valor)
    }
  }

  function inverter(){
    const aux = tipoMoeda1;
    setTipo1Moeda(tipoMoeda2)
    setTipo2Moeda(aux)
  }

  return (
    <>
      {/* React Fragment */}
      <Navbar bg="info">
        {" "}
        {/* Navbar = barra de navegação */}
        <Navbar.Brand href="#inicio">Conversor de Moedas</Navbar.Brand>
      </Navbar>
      <Jumbotron>
        <h1>
          Olá! Bem-vindes ao nosso Conversor de Moedas <FaCoins />
        </h1>
        <p>Aqui você poderá converter real, dólar e euro!</p>
        <br></br>
        <Form>
          <Form.Label>Informe o valor a ser convertido</Form.Label>
          <FormControl
            type="text"
            value={valor}
            placeholder="R$"
            onChange={(event) => setValor(event.target.value)}
          />
          <br></br>
          <Form.Label>Informe a moeda atual</Form.Label>
          <br></br>
          <TextField
          id="standard-select-currency1"
          select
          label="Select"
          value={tipoMoeda1}
          onChange={(event) => setTipo1Moeda(event.target.value)}
          helperText="Please select your currency"
        >
          {tiposMoedas.map((option) => ( /* .map, percorre o array de tipo de moedas e cria o menu de itens */
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

          {/* <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={moeda1}
          onChange={(event) => setMoeda1(event.target.value)}
          displayEmpty
          // className={classes.selectEmpty}
        >
          <MenuItem value={"BRL"}>Real</MenuItem>
          <MenuItem value={"USD"}>Dólar</MenuItem>
          <MenuItem value={"EUR"}>Euro</MenuItem>
        </Select> */}
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SwapVertIcon />}
            onClick={() => inverter()}        
          >
            INVERTER
          </Button>
          <br></br>
          <br></br>
          <Form.Label>Informe a moeda atual</Form.Label>
          <br></br>
          {/* <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={moeda2}
          onChange={(event) => setMoeda2(event.target.value)}
          displayEmpty
          // className={classes.selectEmpty}
        >
  
          <MenuItem value={"BRL"}>Real</MenuItem>
          <MenuItem value={"USD"}>Dólar</MenuItem>
          <MenuItem value={"EUR"}>Euro</MenuItem>
        </Select> */}
        <TextField
          id="standard-select-currency1"
          select
          label="Select"
          value={tipoMoeda2}
          onChange={(event) => setTipo2Moeda(event.target.value)}
          helperText="Please select your currency"
        >
          {tiposMoedas.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AttachMoneyIcon />}
            onClick={() => converter()}
          >
            CONVERTER
          </Button>
          <br></br>
          <br></br>
          <span>{`Última atualização: ${data}`}</span>
          <br></br>
        </Form>
        <br></br>
        <Row className="justify-content-center">
          <Card bg="info" className="text-center">
            <Card.Header>
              <h2>
                {resultado.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h2>
              <h3></h3>
            </Card.Header>
          </Card>
        </Row>
      </Jumbotron>
    </>
  );
}
export default App;
