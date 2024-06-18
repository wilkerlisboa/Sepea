import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

function Formulario() {
  const [formData, setFormData] = useState({
    nome_orgao: '',
    nome_gestor: '',
    cpf_gestor: '',
    nome_tecnico: '',
    cpf_tecnico: '',
    contato_tecnico: '',
    nome_beneficiario: '',
    cpf_beneficiario: '',
    contato_beneficiario: '',
    loteamento: '',
    endereco: '',
    tamanho: '',
    coordenada: '',
    caracterize: '',
    especifique: '',
    geotecnicos: '',
    recuperacao: '',
    comprovacao: '',
    habitabilidade: '',
    garantia: ''
  });

  useEffect(() => {
    emailjs.init('1bZVq8TPEQuEYlSfU');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send('service_w1pnqoo', 'template_tulesef', formData)
      .then((response) => {
        console.log('E-mail enviado com sucesso!', response.status, response.text);
        window.location.href = '/achievement';
      }, (error) => {
        console.error('Erro ao enviar e-mail:', error);
        window.location.href = '/erro';
      });
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-12 col-md-6">
        <h3 className="text-center texto">Qualificação do Órgão Requisitante.</h3>
        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="mb-3 mt-4">
            <label htmlFor="nome_orgao" className="form-label">Nome do Órgão Público</label>
            <input
              type="text"
              name="nome_orgao"
              className="form-control"
              id="nome_orgao"
              placeholder="Digite o nome do órgão público"
              value={formData.nome_orgao}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nome_gestor" className="form-label">Nome do Gestor do Órgão Público</label>
            <input
              type="text"
              name="nome_gestor"
              className="form-control"
              id="nome_gestor"
              placeholder="Digite o nome do gestor do órgão público"
              value={formData.nome_gestor}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpf_gestor" className="form-label">CPF do Gestor</label>
            <input
              type="number"
              name="cpf_gestor"
              className="form-control"
              id="cpf_gestor"
              placeholder="Digite o cpf do gestor"
              value={formData.cpf_gestor}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nome_tecnico" className="form-label">Nome do Responsável Técnico pelo cadastro</label>
            <input
              type="text"
              name="nome_tecnico"
              className="form-control"
              id="nome_tecnico"
              placeholder="Digite o nome responsável técnico pelo cadastro"
              value={formData.nome_tecnico}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpf_tecnico" className="form-label">CPF do Técnico Responsável pelo cadastro</label>
            <input
              type="text"
              name="cpf_tecnico"
              className="form-control"
              id="cpf_tecnico"
              placeholder="Digite o cpf do técnico responsável pelo cadastro"
              value={formData.cpf_tecnico}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contato_tecnico" className="form-label">Contato do Técnico Responsável pelo cadastro</label>
            <input
              type="text"
              name="contato_tecnico"
              className="form-control"
              id="contato_tecnico"
              placeholder="Digite o contato do técnico responsável pelo cadastro"
              value={formData.contato_tecnico}
              onChange={handleChange}
            />
          </div>
          <h3 className="text-center texto">Qualificação do Beneficiário</h3>
          <div className="mb-3 mt-4">
            <label htmlFor="nome_beneficiario" className="form-label">Nome do Beneficiário</label>
            <input
              type="text"
              name="nome_beneficiario"
              className="form-control"
              id="nome_beneficiario"
              placeholder="Digite o nome do beneficiário"
              value={formData.nome_beneficiario}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpf_beneficiario" className="form-label">CPF do Beneficiário</label>
            <input
              type="text"
              name="cpf_beneficiario"
              className="form-control"
              id="cpf_beneficiario"
              placeholder="Digite o cpf do beneficiário"
              value={formData.cpf_beneficiario}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contato_beneficiario" className="form-label">Contato do Beneficiário</label>
            <input
              type="text"
              name="contato_beneficiario"
              className="form-control"
              id="contato_beneficiario"
              placeholder="Digite o contato do beneficiário"
              value={formData.contato_beneficiario}
              onChange={handleChange}
            />
          </div>
          <h3 className="text-center texto">Qualificação da Área a ser Regularizada</h3>
          <div className="mb-3 mt-4">
            <label htmlFor="loteamento" className="form-label">Qual o nome do Loteamento?</label>
            <input
              type="text"
              name="loteamento"
              className="form-control"
              id="loteamento"
              placeholder="Digite o nome do loteamento"
              value={formData.loteamento}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endereco" className="form-label">Coloque o endereço do lote. Mesmo que não oficial</label>
            <input
              type="text"
              name="endereco"
              className="form-control"
              id="endereco"
              placeholder="Digite o endereço do lote, mesmo não oficial"
              value={formData.endereco}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tamanho" className="form-label">Descreva o tamanho do lote em m2. Descrever frente x fundo</label>
            <input
              type="text"
              name="tamanho"
              className="form-control"
              id="tamanho"
              placeholder="Digite o tamnho do lote em m²"
              value={formData.tamanho}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="coordenada" className="form-label">Colocar ao menos uma coordenada Lat-Long ou UTM do centro do Lote</label>
            <input
              type="text"
              name="coordenada"
              className="form-control"
              id="coordenada"
              placeholder="Digite as coordenadas latitude e longitude"
              value={formData.coordenada}
              onChange={handleChange}
            />
          </div>
          <h3 className="text-center texto">Qualificação do Estudo Técnico</h3>
          <div className="mb-3 mt-4">
            <label htmlFor="caracterize" className="form-label">Caracterize a situação ambiental da área a ser regularizada</label>
            <input
              type="text"
              name="caracterize"
              className="form-control"
              id="caracterize"
              placeholder="Digite até 500 caracteres"
              value={formData.caracterize}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="especifique" className="form-label">Especifique os sistemas de saneamento básico</label>
            <input
              type="text"
              name="especifique"
              className="form-control"
              id="especifique"
              placeholder="Digite até 500 caracteres"
              value={formData.especifique}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="geotecnicos" className="form-label">Caso necessário, propor intervenções para a prevenção e o controle de riscos geotécnicos e de inundações</label>
            <input
              type="text"
              name="geotecnicos"
              className="form-control"
              id="geotecnicos"
              placeholder="Digite até 500 caracteres"
              value={formData.geotecnicos}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recuperacao" className="form-label">Caso necessário, propor ações de recuperação de áreas degradadas e ou daquelas não passíveis de regularização ambiental.</label>
            <input
              type="text"
              name="recuperacao"
              className="form-control"
              id="recuperacao"
              placeholder="Digite até 500 caracteres"
              value={formData.recuperacao}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="compravacao" className="form-label">Descreva a comprovação da melhoria das condições de sustentabilidade urbano-ambiental, considerados o uso adequado dos recursos hídricos, a não ocupação das áreas de risco e a proteção das unidades de conservação, quando for o caso</label>
            <input
              type="text"
              name="comprovacao"
              className="form-control"
              id="compravacao"
              placeholder="Digite até 500 caracteres"
              value={formData.compravacao}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="habitabilidade" className="form-label">Descreva a comprovação da melhoria da habitabilidade dos moradores propiciada pela regularização proposta?</label>
            <input
              type="text"
              name="habitabilidade"
              className="form-control"
              id="habitabilidade"
              placeholder="Digite até 500 caracteres"
              value={formData.habitabilidade}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="garantia" className="form-label">Descreva como se dará a garantia de acesso público aos Recursos Hídricos</label>
            <input
              type="text"
              name="garantia"
              className="form-control"
              id="garantia"
              placeholder="Digite até 500 caracteres"
              value={formData.garantia}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-primary text-center">Enviar Estudo</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
