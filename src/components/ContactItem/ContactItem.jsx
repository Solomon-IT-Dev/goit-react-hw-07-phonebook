import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import {
  ContactItemWrapper,
  ContactItemName,
  ContactItemNum,
  DeleteBtn,
} from './ContactItem.styled';

export default function ContactItem({ id, name, number, onDelete }) {
  return (
    <ContactItemWrapper>
      <ContactItemName>{name}</ContactItemName>
      <ContactItemNum href={`tel:${number}`}>{number}</ContactItemNum>
      <DeleteBtn
        type="button"
        onClick={() => onDelete(id)}
        aria-label="Delete contact"
      >
        <IconContext.Provider value={{ size: '2em' }}>
          <FaTrashAlt />
        </IconContext.Provider>
      </DeleteBtn>
    </ContactItemWrapper>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
