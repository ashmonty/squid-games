import styles from './BattleCardCountdown.module.css';

import { Clock } from 'phosphor-react';

import classNames from 'classnames';

export default function BattleCardCountdown({ locale,battleInfo, row, active, isWide, unixCurrentTime }) {
	const { lastChange, changeWaitSeconds } = battleInfo;

	const unixStartTime = lastChange + changeWaitSeconds * row;
	const unixEndTime = lastChange + changeWaitSeconds * (row + 1);
	const isActive = unixCurrentTime >= unixStartTime && unixCurrentTime < unixEndTime;
	const isPrevious = unixCurrentTime >= unixEndTime;

	const countdown = (timestamp) => {
		const seconds = lastChange + changeWaitSeconds * row - timestamp;
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secondsLeft = seconds % 60;

		return `${hours}h ${minutes}m ${secondsLeft}s`;
	};

	return (
		<div className={classNames(styles.banner, { [styles.wide]: isWide })}>
			<Clock className={styles.clock} size={32} weight="bold" />
			<span>{isActive ? `${locale.splatoon.time.now}` : (isPrevious ? `${locale.splatoon.time.previous}` : countdown(unixCurrentTime))}</span>
		</div>
	);
}
