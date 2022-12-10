import styles from './BattleCardSection.module.css';

import splatoonMaps from '../../../utils/splatoonMaps';

import Image from 'next/image';
import { Placeholder, Clock } from 'phosphor-react';
import classNames from 'classnames';

export default function BattleCardSection({ locale, battleInfo, battleType, row, unixCurrentTime, hideOnMobile }) {
	const { maps, rule } = battleInfo.list[row][battleType];
	const { lastChange, changeWaitSeconds } = battleInfo;

	const unixStartTime = lastChange + changeWaitSeconds * row;
	const unixEndTime = lastChange + changeWaitSeconds * (row + 1);

	const formattedTime = (timestamp) => {
		return new Date(timestamp * 1000).toLocaleString([], {
			hour: 'numeric',
			minute: 'numeric',
		});
	};

	const countdown = (timestamp) => {
		const seconds = lastChange + changeWaitSeconds * row - timestamp;
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secondsLeft = seconds % 60;

		return `${hours}h ${minutes}m ${secondsLeft}s`;
	};

	const active = unixStartTime < unixCurrentTime && unixCurrentTime < unixEndTime;

	return (
		<>
			<div className={classNames(styles.banner, styles[battleType], { [styles.hideOnMobile]: hideOnMobile })}>
				<Clock size={32} weight="bold" />
				<span>{active ? 'Now' : countdown(unixCurrentTime)}</span>
			</div>
			<div
				className={classNames(styles.card, styles[battleType], {
					[styles.first]: active,
					[styles.hideOnMobile]: hideOnMobile,
				})}
			>
				<div className={styles.maps}>
					{maps.map((map, i) => (
						<p key={i}>{splatoonMaps[map].name}</p>
					))}
					{maps.map((map, i) => (
						<Image className={styles.mapImage} src={splatoonMaps[map].image} alt={map} key={i} />
					))}
				</div>

				<div className={styles.info}>
					<div className={styles.rule}>
						<Placeholder size={24} weight="bold" />
						<p>{rule}</p>
					</div>
					<div className={styles.time}>
						<Clock size={24} weight="bold" />
						<p>{`${formattedTime(unixStartTime)} - ${formattedTime(unixEndTime)}`}</p>
					</div>
				</div>
			</div>
		</>
	);
}
