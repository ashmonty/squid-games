import Title from '../../Title/Title';
import styles from './SplatfestCard.module.css';

import splatoonMaps from '../../../utils/splatoonMaps';

import Image from 'next/image';

import { CalendarBlank } from 'phosphor-react';

export default function SplatfestCard({ locale, splatfestInfo: { name, start, end, art, maps }}) {
	const formattedDate = (timestamp) => {
		return new Date(timestamp * 1000).toLocaleString([], {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		});
	};

	return (
		<div className={styles.card}>
			<Title element="h2">{`Splatfest: ${name}`}</Title>
			<div className={styles.date}>
				<CalendarBlank size={24} weight="bold" />
				<p>{`${formattedDate(start)} - ${formattedDate(end)}`}</p>
			</div>

			<img
				className={styles.splatfestArt}
				src={art}
				alt=''
			/>

			<div className={styles.mapRotation}>
				{maps.map((map, index) => (
					<div className={styles.map} key={index}>
						<p>{splatoonMaps[map].name}</p>
						<Image className={styles.mapImage} src={splatoonMaps[map].image} alt={map} />
					</div>
				))}
			</div>
		</div>
	);
}
