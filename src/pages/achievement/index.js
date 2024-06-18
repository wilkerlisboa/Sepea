import { Link } from "react-router-dom";

function Achievement(){
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center">
            <img
              src="/image/icon_achievement.svg"
              alt="icon achievement"
              className="text-center align-items-center"
              style={{ maxWidth: '43%', height: 'auto' }}
            />
            <h3 className="mt-5 mx-4 fs-5">
              Parabéns! Seu estudo foi enviado com sucesso.
              <br />
              Volte à página anterior se desejar enviar outro estudo.
            </h3>
            <Link to="/" className="btn btn-primary mt-3" >
              Voltar ao Formulário
            </Link> 
          </div>
        </div>
    );
}
export default Achievement;