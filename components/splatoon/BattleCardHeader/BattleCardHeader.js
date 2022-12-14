import Title from '../../Title/Title';

import classNames from 'classnames';

import styles from './BattleCardHeader.module.css';

export default function BattleCardHeader({ battleType,locale }) {
	return (
		<div className={classNames(styles.battleCardHeader, styles[battleType])} id={battleType}>
			<Title element="h2" className={styles.cardTitle}>{locale.splatoon.modes[battleType]}</Title>
		</div>
	);
}
