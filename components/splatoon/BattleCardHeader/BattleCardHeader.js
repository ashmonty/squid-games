import Title from '../../Title/Title';

import classNames from 'classnames';

import styles from './BattleCardHeader.module.css';

export default function BattleCardHeader({ battleType }) {
	return (
		<div className={classNames(styles.battleCardHeader, styles[battleType])} id={battleType}>
			<Title element="h2" className={styles.cardTitle}>{`${battleType[0].toUpperCase()}${battleType.substring(
				1
			)} Battle`}</Title>
		</div>
	);
}
