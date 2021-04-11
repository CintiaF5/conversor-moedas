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
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import ContactMailIcon from '@material-ui/icons/ContactMail';

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
          Olá! Bem-vindo(a) ao conversor de moedas <FaCoins />
        </h1>
        <p>Aqui você poderá fazer a conversão de moedas para real, dólar e euro!</p>
        <br></br>
        <Form>
        {/* <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl> */}
          <Form.Label>Informe o valor a ser convertido</Form.Label>
          <FormControl
            type="text"
            value={valor}
            placeholder="$"
            onChange={(event) => setValor(event.target.value)}
          />
          <br></br>
          <Form.Label>Informe a moeda atual</Form.Label>
          <br></br>
          <TextField
          id="standard-select-currency1"
          select
          label=""
          value={tipoMoeda1}
          onChange={(event) => setTipo1Moeda(event.target.value)}
          helperText="Por favor selecione a moeda atual"
        >
          {tiposMoedas.map((option) => ( /* .map, percorre o array de tipo de moedas e cria o menu de itens */
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
          <br></br>
          <span>{`Última atualização: ${data}`}</span>  
        </Form>                  
      </Jumbotron>  
      <footer>Aplicativo desenvolvido por Cintia Felix Mendonça <br></br> {<ContactMailIcon/>} cintiafelix1@gmail.com</footer>      
    </>
  );
}
export default App;
