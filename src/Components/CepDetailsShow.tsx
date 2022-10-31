import { Data } from "../interface";
import { ListGroup } from "react-bootstrap";

interface IProps {
  item: Data;
}

const CepDetailsShow = ({ item }: IProps) => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          {item.logradouro}, {item.bairro}
        </ListGroup.Item>
        <ListGroup.Item>
          {item.localidade}-{item.uf}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default CepDetailsShow;
