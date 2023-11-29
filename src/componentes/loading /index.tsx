import styles from './loading.module.css';

function Loading() {
  return (
    <div className={ styles.loading }>
      <div className={ styles.loading_spinner } />
    </div>
  );
}

export default Loading;
