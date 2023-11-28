import { useNavigate } from 'react-router-dom';
import { CardProps } from '../../types/types';

import styles from './card.module.css';

function Card(props : CardProps) {
  const navigate = useNavigate();
  const { id, name } = props;

  const handleClick = () => {
    navigate(`/client/${id}`);
  };

  return (

    <button
      type="button"
      onClick={ handleClick }
      className={ styles.card }
    >
      <div className={ styles.cardHeader }>
        <h4 data-testid="cardTitle" className="card-title">{ name }</h4>
      </div>
      <div className={ styles.cardBody }>
        <p data-testid="cardText" className="card-text">
          Id:
          {' '}
          { id }
        </p>
      </div>
    </button>

  );
}

export default Card;
