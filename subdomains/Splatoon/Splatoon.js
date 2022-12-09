import Title from '../../components/Title/Title';
import SplatfestCard from '../../components/Splatoon/SplatfestCard/SplatfestCard';

import styles from './Splatoon.module.css';

export default function Splatoon({ locale }) {
	const splatoonInfo = {
		splatfest: {
			name: 'Beans on toast vs. Toast on beans',
			start: 'January 36 09:00 PM',
			end: 'Maugust 41 08:59 PM',
			art: 'https://cdn.discordapp.com/attachments/413884110667251722/1041436681133363292/handvshome.jpg',
			mapRotation: ['saltsprayrig', 'flounderheights', 'mahimahiresort'],
		},
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.text}>
				<Title element="h1">Splatoon map rotation.</Title>
				<p>Check the current map rotation and splatfest info for Splatoon on Pretendo Network</p>
			</div>

			<div className={styles.skewed}>
				<SplatfestCard locale={locale} splatfestInfo={splatoonInfo.splatfest} />
			</div>
		</div>
	);
}
