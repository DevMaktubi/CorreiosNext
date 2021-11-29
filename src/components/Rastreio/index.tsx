import { useState } from 'react'
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap'
import { rastrearEncomendas } from 'correios-brasil'
const Rastreio = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rastreios, setRastreios] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(false)

  const getData = async () => {
    console.log(code)
    setLoading(true)
    // if (!code.match(/(^[0-9]{8}$)/i)) {
    //   alert('CEP inválido')
    //   setLoading(false)
    //   setResults(false)
    //   setCep('')
    //   return
    // }
    const codRastreio = [`${code}`, `${code}`]
    rastrearEncomendas(codRastreio).then((response) => {
      console.log(response)
    })
  }
  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="mb-2">
        <Container>
          <Navbar.Brand href="#home">CEP Services</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Rastreio</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Hero Section */}
      <div className="d-flex flex-md-row flex-column justify-content-between col-12 col-md-6 mx-auto mt-2 mt-md-0 mb-2 px-2 px-md-0">
        <div className="d-flex justify-content-center align-items-center col-12 col-md-7">
          Você já quis descobrir onde está sua encomenda dos correios? <br />{' '}
          Agora você pode! Com o nosso site, você pode consultar a localização
          de qualquer pacote sendo enviado pelos correios no Brasil.
        </div>
        <div className="d-flex justify-content-center align-items-center col-12 col-md-5">
          <img
            src="/img/deliveries.svg"
            style={{ maxWidth: '300px' }}
            className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
            alt="Imagem de um personagem apoiado em caixas de entrega"
          />
        </div>
      </div>
      {/* Content */}
      <div className="d-flex flex-column flex-md-row col-8 justify-content-md-around mx-auto mt-md-5 mt-2">
        <p className="d-flex flex-row col-12 col-md-9 p-md-2 p-1 justify-content-center justify-content-md-start align-items-center mb-2">
          Verifique agora mesmo o histórico de status de localização da sua
          encomenda.
        </p>
        <div className="d-flex flex-row col-12 col-md-3 p-md-2 p-1 justify-content-around justify-content-md-start align-items-center">
          <div className="form-group m-0 d-flex flex-row">
            <input
              type="text"
              className="form-control"
              name="Code"
              placeholder="03630020"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <a
              className="btn btn-primary ml-2"
              href="#"
              role="button"
              onClick={() => getData()}
            >
              Verificar
            </a>
          </div>
        </div>
      </div>
      {/* Result */}
      <div className="container m-0 p-1 d-flex flex-column col-8 justify-content-md-center mx-auto mt-md-5 mt-2 text-center">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <></>
        )}
        {results ? <></> : <></>}
      </div>
    </div>
  )
}

export default Rastreio
