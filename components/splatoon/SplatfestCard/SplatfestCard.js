import Title from '../../Title/Title';
import Map from '../Map/Map';
import styles from './SplatfestCard.module.css';

import {mapsinlocale} from '../../../utils/splatoonMaps';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CalendarBlank } from 'phosphor-react';

export default function SplatfestCard({localecode ,locale, splatfestInfo: { name, start, end, art, maps } }) {
	const [splatoonMaps,setMaps] = useState(mapsinlocale(locale));
	const formattedDate = (timestamp) => {
		return new Date(timestamp * 1000).toLocaleString(localecode, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		});
	};

	const [formattedStartTime,setStartTime] = useState(null);
	const [formattedEndTime,setEndTime] = useState(null);
	useEffect(() => {
		setStartTime(formattedDate(start));
		setEndTime(formattedDate(end));
	});

	return (
		<div className={styles.card}>
			<Title element="h2" className={styles.cardTitle}>{`${locale.splatoon.splatfest} ${name}`}</Title>
			<div className={styles.date}>
				<CalendarBlank size={24} weight="bold" />
				<p>{`${formattedStartTime} - ${formattedEndTime}`}</p>
			</div>

			<img className={styles.splatfestArt} src={art} alt="" />

			<div className={styles.maps}>
				{maps.map((map, i) => (
					<Map key={i} name={splatoonMaps[map].name} image={splatoonMaps[map].image} />
				))}
			</div>
		</div>
	);
}
