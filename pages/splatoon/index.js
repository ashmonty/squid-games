import Title from '../../components/Title/Title';
import SplatfestCard from '../../components/splatoon/SplatfestCard/SplatfestCard';
import BattleCardSection from '../../components/splatoon/BattleCardSection/BattleCardSection';

import classNames from 'classnames';

import styles from './index.module.css';

export default function Splatoon({ locale }) {
	// currently hardcoded for testing purposes
	const splatoonInfo = {
		splatfest: {
			name: 'Beans on toast vs. Toast on beans',
			start: 1670605267,
			end: 1670609000,
			art: 'https://cdn.discordapp.com/attachments/413884110667251722/1041436681133363292/handvshome.jpg',
			maps: ['saltsprayrig', 'flounderheights', 'mahimahiresort'],
		},
		battles: {
			lastChange: 1670616287, // Unix timestamp for when the course last changed
			changeWaitSeconds: 14400, // how often the courses change in seconds
			list: [
				{
					regular: {
						rule: 'turfwar',
						maps: ['camptriggerfish', 'mahimahiresort'],
					},
					ranked: {
						rule: 'splatzones',
						maps: ['urchinunderpass', 'saltsprayrig'],
					},
				},
				{
					regular: {
						rule: 'turfwar',
						maps: ['urchinunderpass', 'anchovgames'],
					},
					ranked: {
						rule: 'towercontrol',
						maps: ['flounderheights', 'piranhapit'],
					},
				},
				{
					regular: {
						rule: 'turfwar',
						maps: ['museumdalfonsino', 'portmackerel'],
					},
					ranked: {
						rule: 'towercontrol',
						maps: ['walleyewarehouse', 'kelpdome'],
					},
				},
			],
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

				<div className={styles.battleCards}>
					{['regular', 'ranked'].map((battleType, i) => (
						<div className={classNames(styles.battleCardHeader, styles[battleType])} key={i} id={battleType}>
							<Title element="h2">{`${battleType[0].toUpperCase()}${battleType.substring(1)} Battle`}</Title>
						</div>
					))}

					<BattleCardSection battleInfo={splatoonInfo.battles} battleType='regular' row={0} />
					<BattleCardSection battleInfo={splatoonInfo.battles} battleType='ranked' row={0} />

					<BattleCardSection battleInfo={splatoonInfo.battles} battleType='regular' row={1} />
					<BattleCardSection battleInfo={splatoonInfo.battles} battleType='ranked' row={1} />

					<BattleCardSection battleInfo={splatoonInfo.battles} battleType='regular' row={2} />
					<BattleCardSection battleInfo={splatoonInfo.battles} battleType='ranked' row={2} />

				</div>
			</div>
		</div>
	);
}
