import styles from './BattleCardSection.module.css';

import {mapsinlocale} from '../../../utils/splatoonMaps';

import Map from '../Map/Map';
import { Placeholder, Clock } from 'phosphor-react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export default function BattleCardSection({localecode ,locale, battleInfo, battleType, row, hideOnMobile, unixCurrentTime }) {
	const { lastChange, changeWaitSeconds } = battleInfo;
	const { maps, rule } = battleInfo.list[row][battleType];
	const [splatoonMaps,setMaps] = useState(mapsinlocale(locale));
	const unixStartTime = lastChange + changeWaitSeconds * row;
	const unixEndTime = lastChange + changeWaitSeconds * (row + 1);
	const isActive = unixCurrentTime >= unixStartTime && unixCurrentTime < unixEndTime;

	const formattedTime = (timestamp) => {
		return new Date(timestamp * 1000).toLocaleString(localecode, {
			hour: 'numeric',
			minute: 'numeric'
		});
	};

	const [formattedStartTime,setStartTime] = useState(null);
	const [formattedEndTime,setEndTime] = useState(null);
	useEffect(() => {
		setStartTime(formattedTime(unixStartTime));
		setEndTime(formattedTime(unixEndTime));
	});
	return (
		<div
			className={classNames(styles.card, styles[battleType], {
				[styles.active]: isActive,
				[styles.hideOnMobile]: hideOnMobile,
			})}
		>
			<div className={styles.maps}>
				{maps.map((map, i) => (
					<Map key={i} name={splatoonMaps[map].name} image={splatoonMaps[map].image} />
				))}
			</div>

			<div className={styles.info}>
				<div className={styles.rule}>
					<Placeholder size={24} weight="bold" />
					<p>{rule}</p>
				</div>
				<div className={styles.time}>
					<Clock size={24} weight="bold" />
					<p>{`${formattedStartTime} - ${formattedEndTime}`}</p>
				</div>
			</div>
		</div>
	);
}
