import styles from './BattleCardSection.module.css';

import splatoonMaps from '../../../utils/splatoonMaps';

import Image from 'next/image';
import { Placeholder, Clock } from 'phosphor-react';
import classNames from 'classnames';

import { useState, useEffect } from 'react';

export default function BattleCardSection({ locale, battleInfo, battleType, row }) {
	const { maps, rule } = battleInfo.list[row][battleType];
	const { lastChange, changeWaitSeconds } = battleInfo;

	const [unixCurrentTime, setUnixCurrentTime] = useState(1670660187); // hardcoded to ensure consinstency between client and server, will be updated with useEffect as soon as the component mounts

	/*useEffect(() => {
		setUnixCurrentTime(Math.floor(Date.now() / 1000));
		setInterval(() => {
			setUnixCurrentTime(Math.floor(Date.now() / 1000));
		}, 1000);
	}, []);*/

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
			<div className={classNames(styles.banner, styles[battleType])}>
				<Clock size={32} weight="bold" />
				<span>{active ? 'Now' : countdown(unixCurrentTime)}</span>
			</div>
			<div className={classNames(styles.card, styles[battleType], { [styles.first]: active })}>
				<div className={styles.maps}>
					{maps.map((map, index) => (
						<div className={styles.map} key={index}>
							<p>{splatoonMaps[map].name}</p>
							<Image className={styles.mapImage} src={splatoonMaps[map].image} alt={map} />
						</div>
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
