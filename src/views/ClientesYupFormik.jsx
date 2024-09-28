import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import ClientesTable from "../components/ClientesTable";

const ClientesYupFormik = () => {
  const schema = Yup.object().shape({
    nome: Yup.string().trim().min(1).max(20).required("Nome é obrigatório"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("Email é obrigatório"),
    nascimento: Yup.date().required("data de nascimento é obrigatório"),
    cep: Yup.string().trim().required("CEP é obrigatório"),
  });

  const [clientes, setClientes] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const formData = {
    nome: "",
    email: "",
    nascimento: "",
    cep: "",
  };

  useEffect(() => {
    fetch("http://localhost:3000/clientes", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error("Erro ao carregar clientes:", error));
  }, []);

  const handleSubmit = (values) => {
    const novoCliente = { ...values };

    fetch("http://localhost:3000/clientes", {
      method: "POST",
      body: JSON.stringify(novoCliente),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao cadastrar cliente");
        return response.json();
      })
      .then((data) => {
        setClientes((prev) => [...prev, data]);
        setShow(false);
      })
      .catch((error) => {
        console.error("Problemas ao cadastrar cliente:", error);
      });
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        Adicionar (+)
      </Button>

      <ClientesTable clientes={clientes} />

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Cliente</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.nome}
                type="text"
                placeholder="Digite o nome"
                name="nome"
              />

              {formik.errors.nome}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="custom-label">E-mail</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="Digite o e-mail"
                name="email"
              />

              {formik.errors.email}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.nascimento}
                type="date"
                name="nascimento"
              />

              {formik.errors.nascimento}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCep">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.cep}
                type="text"
                placeholder="Digite o CEP"
                name="cep"
              />

              {formik.errors.cep}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow} type="button">
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ClientesYupFormik;
