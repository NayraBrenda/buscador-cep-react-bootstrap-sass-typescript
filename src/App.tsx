import { useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import { Data } from "./interface";
import { Container, Form, Button, Alert } from "react-bootstrap";
import CepDetailsShow from "./Components/CepDetailsShow";
import "./App.sass";

function App() {
  const [cep, setCep] = useState<string | null>("");
  const [cepDetails, setCepDetails] = useState<Data>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const url: string = `https://viacep.com.br/ws/${cep}/json/`;

  const getData = () => {
    if (cep?.length === 0) {
      setError("Digite um CEP");
    } else {
      setLoading(true);
      axios
        .get(url)
        .then((resp) => {
          setCepDetails(resp.data);
          clearError();
        })
        .catch((error) => {
          setError(
            `Ocorreu um erro (${error.message})! Verifique o CEP informado.`
          );
          setCep("");
        })
        .finally(() => setLoading(false));
    }
  };

  const clearError = (): void => setError("");

  return (
    <Container fluid="md" className="Container">
      <h1 className="Title">Buscador de CEP</h1>

      <Form.Control
        className="FormCep"
        size="lg"
        type="text"
        placeholder="00000-000"
        maxLength={8}
        onChange={(e) => setCep(e.target.value)}
      />

      <div className="BuscarCep">
        <Button variant="success" onClick={() => getData()}>
          Buscar Cep
        </Button>
      </div>

      {error && (
        <Alert variant="danger" onClose={() => clearError()} dismissible>
          {error}
        </Alert>
      )}
      {cepDetails ? (
        <CepDetailsShow item={cepDetails} />
      ) : (
        loading && (
          <ReactLoading type={"spin"} color={"#000"} height={50} width={50} />
        )
      )}
    </Container>
  );
}

export default App;
