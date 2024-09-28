import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const ClientesTable = ({ clientes = [] }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Data de Nascimento</th>
          <th>cep</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((clientes, i) => (
          <tr key={i}>
            <td>{clientes.id}</td>
            <td>{clientes.nome}</td>
            <td>{clientes.email}</td>
            <td>{clientes.nascimento}</td>
            <td>{clientes.cep}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

ClientesTable.propTypes = {
  clientes: PropTypes.array,
};

export default ClientesTable;
