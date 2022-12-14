import styles from './BattleCardEndButton.module.css';

import classNames from 'classnames';

export default function BattleCardEndButton({locale ,battleType, onClick, end }) {
	return (
		<button
			className={classNames(styles.button, styles[battleType], { [styles.end]: end })}
			onClick={end ? null : onClick}
		>
			<span>{end ? `${locale.splatoon.buttons.last}` : `${locale.splatoon.buttons.more}`}</span>
		</button>
	);
}
