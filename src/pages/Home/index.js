import { Container } from "react-bootstrap";
import Logo from "../../components/Logo/index";
import jsonData from "../../json/db.json"
import Footer from "../../components/Footer";
import Formulario from "../../components/Formulario";

// PAGE HOME
function Home() {
  return (
    <>
      <Container fluid className="mt-2">
            <div className="container text-center">
                <div className="row justify-content-center">
                    {jsonData.map((video) => (
                    <div key={video.id} className="logo col-12 col-md-4 mb-3 text-center">
                        <Logo id={video.id} cover={video.cover} url={video.url} className="text-center"/>
                    </div>
                    ))}
                </div>
            </div>
            <h1 className="text-center mt-4">Sistema de Elaboração de Projetos e Estudos Ambientais – SEPEA.</h1>
            <h2 className="text-center mt-4">Regularização Fundiária de Interesse Social (REURB-S)</h2>
            <h3 className="text-center mt-4">Estudo Técnico Ambiental - ETA</h3>
            <p className="text-justify text-center font-weight-bold mx-4 fs-5 ">O presente ETA, tem o objetivo de apoio ao órgão gestor do Reurb-S de Altaneira, na obtenção da Certidão Ambiental necessária ao cumprimento de cada parcela em processo de regularização urbana, é foi baseado na Lei Federal n. 13.465/2017.</p>
            <p className="text-justify text-center font-weight-bold mx-4 fs-5 ">No <strong>Projeto de Regularização Fundiária de Interesse Social</strong>, deve constar o ETA que  apresente justificavas das melhorias da qualidade ambiental em relação à situação de ocupação informal anterior, inclusive por meio de compensações ambientais, se for o caso. As partes do núcleo que estejam fora das áreas de preservação permanente podem ter seu Projeto de Regularização Fundiária aprovado e levado a registro separadamente.</p>
            <hr></hr>
            <Formulario />
            <hr></hr>
            <Footer/>
        </Container>
    </>
  );
}

export default Home;
