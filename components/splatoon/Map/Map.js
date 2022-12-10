import styles from './Map.module.css';
import Image from 'next/image';

export default function Map({ name, image }) {
	return (
		<div className={styles.map}>
			<p>{name}</p>
			<Image className={styles.mapImage} src={image} alt={name} />
		</div>
	);
}
