import axios from 'axios'
import { useState } from 'react'
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap'

interface cepInfo {
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ddd: string
}

const Main = () => {
  const [cepInfo, setCepInfo] = useState<cepInfo>({} as cepInfo)
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(false)

  const getData = async () => {
    console.log(cep)
    setLoading(true)
    if (!cep.match(/(^[0-9]{8}$)/i)) {
      alert('CEP inválido')
      setLoading(false)
      setResults(false)
      setCep('')
      return
    }
    await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
      setCepInfo(res.data)
      setLoading(false)
      setResults(true)
      setCep('')
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
          Você já quis descobrir onde fica o local de entrega de um produto?{' '}
          <br /> Agora você pode! Com o nosso site, você pode pesquisar o CEP de
          qualquer lugar do Brasil.
        </div>
        <div className="d-flex justify-content-center align-items-center col-12 col-md-5">
          <img
            src="/img/around-the-world.svg"
            style={{ maxWidth: '300px' }}
            className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
            alt="Imagem de uma personagem segurando o globo da terra"
          />
        </div>
      </div>
      {/* Content */}
      <div className="d-flex flex-column flex-md-row col-8 justify-content-md-around mx-auto mt-md-5 mt-2">
        <p className="d-flex flex-row col-12 col-md-9 p-md-2 p-1 justify-content-center justify-content-md-start align-items-center mb-2">
          Verifique agora mesmo onde fica a localização de um CEP específico.
        </p>
        <div className="d-flex flex-row col-12 col-md-3 p-md-2 p-1 justify-content-around justify-content-md-start align-items-center">
          <div className="form-group m-0 d-flex flex-row">
            <input
              type="text"
              className="form-control"
              name="CEP"
              placeholder="03630020"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
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
        {results ? (
          <>
            <div className="row my-2 mx-0 p-0 ">
              <div className="col-md col-12 text-center d-flex flex-column flex-md-row align-items-center mb-2 mb-md-0 justify-content-md-center justify-content-start">
                <h5 className="mb-0 mr-md-2 mr-0">Logradouro:</h5>
                <h5 className="mb-0" id="logradouro">
                  {cepInfo.logradouro}
                </h5>
              </div>
              <div className="col-md col-12 text-center d-flex flex-column flex-md-row align-items-center justify-content-md-center justify-content-start">
                <h5 className="mb-0 mr-md-2 mr-0">Complemento:</h5>
                <h5 className="mb-0" id="complemento">
                  {cepInfo.complemento}
                </h5>
              </div>
            </div>
            <div className="row my-2 mx-0 p-0">
              <div className="col-md col-12 text-center d-flex flex-column flex-md-row align-items-center mb-2 mb-md-0 justify-content-md-center justify-content-start">
                <h5 className="mb-0 mr-md-2 mr-0">Bairro:</h5>
                <h5 className="mb-0" id="bairro">
                  {cepInfo.bairro}
                </h5>
              </div>
              <div className="col-md col-12 text-center d-flex flex-column flex-md-row align-items-center justify-content-md-center justify-content-start">
                <h5 className="mb-0 mr-md-2 mr-0">Cidade:</h5>
                <h5 className="mb-0" id="localidade">
                  {cepInfo.localidade}
                </h5>
              </div>
            </div>
            <div className="row my-2 mx-0 p-0">
              <div className="col-md col-12 text-center d-flex flex-column flex-md-row align-items-center mb-2 mb-md-0 justify-content-md-center justify-content-start">
                <h5 className="mb-0 mr-md-2 mr-0">UF:</h5>
                <h5 className="mb-0" id="uf">
                  {cepInfo.uf}
                </h5>
              </div>
              <div className="col-md col-12 text-center d-flex flex-column flex-md-row align-items-center justify-content-md-center justify-content-start">
                <h5 className="mb-0 mr-md-2 mr-0">DDD:</h5>
                <h5 className="mb-0" id="ddd">
                  {cepInfo.ddd}
                </h5>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Main
