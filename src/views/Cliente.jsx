import { useState } from 'react';
import clientesDataSet from '../datasets/Cliente';
import ClientesTable from '../components/ClientesTable';
import { Alert, Button, Form, Modal } from 'react-bootstrap';

const Cliente = () => {
  let [clientes, setClientes] = useState([...clientesDataSet]);

  const [show, setShow] = useState(false);

  const [errorsForm, setErrorsForm] = useState({});

  const handleShow = () => setShow(!show);

  let [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  });

  const handleChangeFormData = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const validateValues = () => {
    let errors = {};
    if (formData.nome === null || formData.nome.trim().length < 1 || formData.nome.trim().length > 50) {
      errors.nome = 'Nome inválido';
    }

    if (formData.email === null || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateValues();
    setErrorsForm(errors);

    let qtdErrors = Object.keys(errors).length;

    if (qtdErrors === 0) {
      let novoCliente = { ...formData };
      setClientes([...clientes, novoCliente]);

      setShow(false);
    }
  };

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        +
      </Button>

      <ClientesTable clientes={clientes}></ClientesTable>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Cliente</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* Nome */}
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                onChange={handleChangeFormData}
                value={formData.nome}
                type="text"
                placeholder="Digite o nome"
                name="nome"
              />
              {errorsForm && errorsForm.nome}
            </Form.Group>
            {/* Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleChangeFormData}
                value={formData.email}
                type="email"
                placeholder="Digite o email"
                name="email"
              />
              {errorsForm && errorsForm.email}
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

export default Cliente;
