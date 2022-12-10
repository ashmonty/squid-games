import styles from './BattleCardEndButton.module.css';

import classNames from 'classnames';

export default function BattleCardEndButton({ battleType, onClick, end }) {
	return (
		<button
			className={classNames(styles.button, styles[battleType], { [styles.end]: end })}
			onClick={end ? null : onClick}
		>
			<span>{end ? 'That\'s all for now!' : 'Show more'}</span>
		</button>
	);
}
