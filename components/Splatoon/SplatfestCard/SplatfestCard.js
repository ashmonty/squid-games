import Title from '../../Title/Title';
import styles from './SplatfestCard.module.css';

import splatoonMaps from '../../../utils/splatoonMaps';

import Image from 'next/image';

import { CalendarBlank } from 'phosphor-react';

export default function SplatfestCard({locale, splatfestInfo: {name, start, end, art, mapRotation}}) {
	return (
		<div className={styles.card}>
			<Title element="h2">{`Splatfest: ${name}`}</Title>
			<div className={styles.date}>
				<CalendarBlank size={24} weight="bold"/>
				<p>{start} - {end}</p>
			</div>

			<img className={styles.splatfestArt} src="https://cdn.discordapp.com/attachments/413884110667251722/1041436681133363292/handvshome.jpg" alt='' />

			<div className={styles.mapRotation}>
				{mapRotation.map((map, index) => (
					<div className={styles.map} key={index}>
						<p>{splatoonMaps[map].name}</p>
						<Image className={styles.mapImage} src={splatoonMaps[map].image} alt={map}/>
					</div>
				))}
			</div>
		</div>
	);
}
