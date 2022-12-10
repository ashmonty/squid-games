import styles from './BattleCardEndButton.module.css';

import classNames from 'classnames';

export default function BattleCardEndButton({ battleType, onClick, children, end }) {
	return (
		<button className={classNames(styles.button, styles[battleType], { [styles.end]: end })} onClick={onClick}>
			{children}
		</button>
	);
}
