import { Link } from "react-router-dom";


// PAGE ERRO
function Erro(){
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center align-items-center justify-content-center">
        <img
          src="/image/icon_erro.svg"
          alt="icon erro"
          className="text-center align-items-center"
          style={{ maxWidth: '43%', height: 'auto' }}
        />
        <h3 className="mt-5 mx-4 fs-5">
          Opa! Desculpe-nos pelo transtorno, mas ocorreu um erro durante o envio do seu formulário.
          <br />
          Volte à página anterior e tente reenviar novamente.
        </h3>
        <Link to="/" className="btn btn-primary mt-3" >
          Voltar ao Formulário
        </Link>
      </div>
    </div>
  );
}
export default Erro;