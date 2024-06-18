import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { z } from "zod";
import { Button, Form } from "react-bootstrap";
import mask from "../utils/maascaraCpfCnpj";

const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
};

const formSchema = z.object({
  nome_orgao: z.string().min(1, "Nome do órgão público é obrigatório"),
  nome_gestor: z.string().min(1, "Nome do gestor é obrigatório"),
  cpf_gestor: z.string().refine((value) => validarCPF(value) , {
      message: "CPF inválido.",
  }),
  nome_tecnico: z.string().min(1, "Nome do técnico é obrigatório"),
  cpf_tecnico: z.string().refine((value) => validarCPF(value) , {
      message: "CPF inválido.",
  }),
  contato_tecnico: z.string().min(1, "Contato do técnico é obrigatório"),
  nome_beneficiario: z.string().min(1, "Nome do beneficiário é obrigatório"),
  cpf_beneficiario: z.string().refine((value) => validarCPF(value) , {
      message: "CPF inválido.",
  }),
  contato_beneficiario: z
    .string()
    .min(1, "Contato do beneficiário é obrigatório"),
  loteamento: z.string().min(1, "Nome do loteamento é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  tamanho: z.string().min(1, "Tamanho do lote é obrigatório"),
  coordenada: z.string().min(1, "Coordenada é obrigatória"),
  caracterize: z.string().min(1, "Caracterização é obrigatória"),
  especifique: z.string().min(1, "Especificação é obrigatória"),
  geotecnicos: z.string().min(1, "Informação geotécnica é obrigatória"),
  recuperacao: z.string().min(1, "Informação sobre recuperação é obrigatória"),
  comprovacao: z.string().min(1, "Comprovação é obrigatória"),
  habitabilidade: z.string().min(1, "Habitabilidade é obrigatória"),
  garantia: z.string().min(1, "Garantia é obrigatória"),
});

function Formulario() {
  const apiPublic = process.env.REACT_APP_PUBLIC;
  const service = process.env.REACT_APP_SERVICE;
  const template = process.env.REACT_APP_TEMPLATE;

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nome_orgao: "",
    nome_gestor: "",
    cpf_gestor: "",
    nome_tecnico: "",
    cpf_tecnico: "",
    contato_tecnico: "",
    nome_beneficiario: "",
    cpf_beneficiario: "",
    contato_beneficiario: "",
    loteamento: "",
    endereco: "",
    tamanho: "",
    coordenada: "",
    caracterize: "",
    especifique: "",
    geotecnicos: "",
    recuperacao: "",
    comprovacao: "",
    habitabilidade: "",
    garantia: "",
  });

  useEffect(() => {
    emailjs.init(`${apiPublic}`);
  }, [apiPublic]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = {};
      result.error.errors.forEach((error) => {
        formattedErrors[error.path[0]] = error.message;
      });
      setErrors(formattedErrors);
      return;
    }
    setErrors({});

    emailjs.send(`${service}`, `${template}`, formData).then(
      (response) => {
        console.log(
          "E-mail enviado com sucesso!",
          response.status,
          response.text
        );
        window.location.href = "/achievement";
      },
      (error) => {
        console.error("Erro ao enviar e-mail:", error);
        window.location.href = "/erro";
      }
    );
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-12 col-md-6">
        <h3 className="text-center texto">
          Qualificação do Órgão Requisitante.
        </h3>
        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="mb-3 mt-4">
            <label htmlFor="nome_orgao" className="form-label">
              Nome do Órgão Público
            </label>
            <Form.Control
              type="text"
              name="nome_orgao"
              className="form-control"
              id="nome_orgao"
              placeholder="Digite o nome do órgão público"
              value={formData.nome_orgao}
              onChange={handleChange}
              isInvalid={!!errors?.nome_orgao}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.nome_orgao}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="nome_gestor" className="form-label">
              Nome do Gestor do Órgão Público
            </label>
            <Form.Control
              type="text"
              name="nome_gestor"
              className="form-control"
              id="nome_gestor"
              placeholder="Digite o nome do gestor do órgão público"
              value={formData.nome_gestor}
              onChange={handleChange}
              isInvalid={!!errors?.nome_gestor}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.nome_gestor}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="cpf_gestor" className="form-label">
              CPF do Gestor
            </label>
            <Form.Control
              type="text"
              name="cpf_gestor"
              className="form-control"
              id="cpf_gestor"
              maxLength={14}
              placeholder="Digite o cpf do gestor"
              value={mask(formData.cpf_gestor || "")}
              onChange={handleChange}
              isInvalid={!!errors?.cpf_gestor}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.cpf_gestor}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="nome_tecnico" className="form-label">
              Nome do Responsável Técnico pelo cadastro
            </label>
            <Form.Control
              type="text"
              name="nome_tecnico"
              className="form-control"
              id="nome_tecnico"
              placeholder="Digite o nome responsável técnico pelo cadastro"
              value={formData.nome_tecnico}
              onChange={handleChange}
              isInvalid={!!errors?.nome_tecnico}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.nome_tecnico}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="cpf_tecnico" className="form-label">
              CPF do Técnico Responsável pelo cadastro
            </label>
            <Form.Control
              type="text"
              name="cpf_tecnico"
              className="form-control"
              id="cpf_tecnico"
              maxLength={14}
              placeholder="Digite o cpf do técnico responsável pelo cadastro"
              value={mask(formData.cpf_tecnico || "")}
              onChange={handleChange}
              isInvalid={!!errors?.cpf_tecnico}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.cpf_tecnico}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="contato_tecnico" className="form-label">
              Contato do Técnico Responsável pelo cadastro
            </label>
            <Form.Control
              type="text"
              name="contato_tecnico"
              className="form-control"
              id="contato_tecnico"
              placeholder="Digite o contato do técnico responsável pelo cadastro"
              value={formData.contato_tecnico}
              onChange={handleChange}
              isInvalid={!!errors?.contato_tecnico}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.contato_tecnico}
            </Form.Control.Feedback>
          </div>
          <h3 className="text-center texto">Qualificação do Beneficiário</h3>
          <div className="mb-3 mt-4">
            <label htmlFor="nome_beneficiario" className="form-label">
              Nome do Beneficiário
            </label>
            <Form.Control
              type="text"
              name="nome_beneficiario"
              className="form-control"
              id="nome_beneficiario"
              placeholder="Digite o nome do beneficiário"
              value={formData.nome_beneficiario}
              onChange={handleChange}
              isInvalid={!!errors?.nome_beneficiario}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.nome_beneficiario}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="cpf_beneficiario" className="form-label">
              CPF do Beneficiário
            </label>
            <Form.Control
              type="text"
              name="cpf_beneficiario"
              className="form-control"
              id="cpf_beneficiario"
              maxLength={14}
              placeholder="Digite o cpf do beneficiário"
              value={mask(formData.cpf_beneficiario || "")}
              onChange={handleChange}
              isInvalid={!!errors?.cpf_beneficiario}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.cpf_beneficiario}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="contato_beneficiario" className="form-label">
              Contato do Beneficiário
            </label>
            <Form.Control
              type="text"
              name="contato_beneficiario"
              className="form-control"
              id="contato_beneficiario"
              placeholder="Digite o contato do beneficiário"
              value={formData.contato_beneficiario}
              onChange={handleChange}
              isInvalid={!!errors?.contato_beneficiario}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.contato_beneficiario}
            </Form.Control.Feedback>
          </div>
          <h3 className="text-center texto">
            Qualificação da Área a ser Regularizada
          </h3>
          <div className="mb-3 mt-4">
            <label htmlFor="loteamento" className="form-label">
              Qual o nome do Loteamento?
            </label>
            <Form.Control
              type="text"
              name="loteamento"
              className="form-control"
              id="loteamento"
              placeholder="Digite o nome do loteamento"
              value={formData.loteamento}
              onChange={handleChange}
              isInvalid={!!errors?.loteamento}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.loteamento}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="endereco" className="form-label">
              Coloque o endereço do lote. Mesmo que não oficial
            </label>
            <Form.Control
              type="text"
              name="endereco"
              className="form-control"
              id="endereco"
              placeholder="Digite o endereço do lote, mesmo não oficial"
              value={formData.endereco}
              onChange={handleChange}
              isInvalid={!!errors?.endereco}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.endereco}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="tamanho" className="form-label">
              Descreva o tamanho do lote em m2. Descrever frente x fundo
            </label>
            <Form.Control
              type="text"
              name="tamanho"
              className="form-control"
              id="tamanho"
              placeholder="Digite o tamnho do lote em m²"
              value={formData.tamanho}
              onChange={handleChange}
              isInvalid={!!errors?.cpf_gestor}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.cpf_gestor}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="coordenada" className="form-label">
              Colocar ao menos uma coordenada Lat-Long ou UTM do centro do Lote
            </label>
            <Form.Control
              type="text"
              name="coordenada"
              className="form-control"
              id="coordenada"
              placeholder="Digite as coordenadas latitude e longitude"
              value={formData.coordenada}
              onChange={handleChange}
              isInvalid={!!errors?.coordenada}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.coordenada}
            </Form.Control.Feedback>
          </div>
          <h3 className="text-center texto">Qualificação do Estudo Técnico</h3>
          <div className="mb-3 mt-4">
            <label htmlFor="caracterize" className="form-label">
              Caracterize a situação ambiental da área a ser regularizada
            </label>
            <Form.Control
              type="text"
              name="caracterize"
              className="form-control"
              id="caracterize"
              placeholder="Digite até 500 caracteres"
              value={formData.caracterize}
              onChange={handleChange}
              isInvalid={!!errors?.caracterize}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.caracterize}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="especifique" className="form-label">
              Especifique os sistemas de saneamento básico
            </label>
            <Form.Control
              type="text"
              name="especifique"
              className="form-control"
              id="especifique"
              placeholder="Digite até 500 caracteres"
              value={formData.especifique}
              onChange={handleChange}
              isInvalid={!!errors?.especifique}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.especifique}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="geotecnicos" className="form-label">
              Caso necessário, propor intervenções para a prevenção e o controle
              de riscos geotécnicos e de inundações
            </label>
            <Form.Control
              type="text"
              name="geotecnicos"
              className="form-control"
              id="geotecnicos"
              placeholder="Digite até 500 caracteres"
              value={formData.geotecnicos}
              onChange={handleChange}
              isInvalid={!!errors?.geotecnicos}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.geotecnicos}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="recuperacao" className="form-label">
              Caso necessário, propor ações de recuperação de áreas degradadas e
              ou daquelas não passíveis de regularização ambiental.
            </label>
            <Form.Control
              type="text"
              name="recuperacao"
              className="form-control"
              id="recuperacao"
              placeholder="Digite até 500 caracteres"
              value={formData.recuperacao}
              onChange={handleChange}
              isInvalid={!!errors?.recuperacao}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.recuperacao}
            </Form.Control.Feedback>
          </div>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="compravacao" className="form-label">
              Descreva a comprovação da melhoria das condições de
              sustentabilidade urbano-ambiental, considerados o uso adequado dos
              recursos hídricos, a não ocupação das áreas de risco e a proteção
              das unidades de conservação, quando for o caso
            </Form.Label>
            <Form.Control
              type="text"
              name="comprovacao"
              className="form-control"
              id="compravacao"
              placeholder="Digite até 500 caracteres"
              value={formData.comprovacao}
              onChange={handleChange}
              isInvalid={!!errors?.comprovacao}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.comprovacao}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="mb-3">
            <label htmlFor="habitabilidade" className="form-label">
              Descreva a comprovação da melhoria da habitabilidade dos moradores
              propiciada pela regularização proposta?
            </label>
            <Form.Control
              type="text"
              name="habitabilidade"
              className="form-control"
              id="habitabilidade"
              placeholder="Digite até 500 caracteres"
              value={formData.habitabilidade}
              onChange={handleChange}
              isInvalid={!!errors?.habitabilidade}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.habitabilidade}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <label htmlFor="garantia" className="form-label">
              Descreva como se dará a garantia de acesso público aos Recursos
              Hídricos
            </label>
            <Form.Control
              type="text"
              name="garantia"
              className="form-control"
              id="garantia"
              placeholder="Digite até 500 caracteres"
              value={formData.garantia}
              onChange={handleChange}
              isInvalid={!!errors?.garantia}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.garantia}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3 text-center">
            <Button type="submit" className="btn btn-primary text-center">
              Enviar Estudo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
