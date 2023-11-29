import { useNavigate } from 'react-router-dom';
import { CardProps } from '../../types/types';

import styles from './card.module.css';

function Card(props : CardProps) {
  const navigate = useNavigate();
  const { id, name } = props;

  const handleClick = () => {
    navigate(`/clients/${id}`);
  };

  return (
    <button
      type="button"
      onClick={ handleClick }
      className={ styles.cardContainer }
    >
      <div className={ styles.cardHeader }>
        <h4 className="card-title">{ name }</h4>
      </div>
      <div className={ styles.cardBody }>
        <p className="card-text">
          {`ID: ${id}`}
        </p>
      </div>
    </button>
  );
}

export default Card;
