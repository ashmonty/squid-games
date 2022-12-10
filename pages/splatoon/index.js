import Title from '../../components/Title/Title';
import SplatfestCard from '../../components/splatoon/SplatfestCard/SplatfestCard';

import DesktopLayout from '../../components/splatoon/DesktopLayout/DesktopLayout';
import MobileLayout from '../../components/splatoon/MobileLayout/MobileLayout';

import { Fragment } from 'react';
import classNames from 'classnames';

import styles from './index.module.css';

import { useState, useEffect } from 'react';

import { getLocale } from '../../utils/locale';

export async function getServerSideProps(ctx) {
	const locale = getLocale(ctx.locale);

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
			lastChange: 1670687423, // Unix timestamp for when the course last changed
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
				{
					regular: {
						rule: 'turfwar',
						maps: ['hammerheadbridge', 'arowanamall'],
					},
					ranked: {
						rule: 'splatzones',
						maps: ['mahimahiresort', 'blackbellyskatepark'],
					},
				},
			],
		},
	};

	return {
		props: {
			locale,
			splatoonInfo,
		},
	};
}

export default function Splatoon({ locale, splatoonInfo }) {
	const [unixCurrentTime, setUnixCurrentTime] = useState(1670660187); // hardcoded to ensure consinstency between client and server, will be updated with useEffect as soon as the component mounts

	const [regularShown, setRegularShown] = useState(2);
	const [rankedShown, setRankedShown] = useState(2);
	const maxShown = Math.max(regularShown, rankedShown);
	const shown = {
		regular: regularShown,
		ranked: rankedShown,
	};
	const setShown = (type, value) => {
		if (type === 'regular') {
			setRegularShown(value);
		} else if (type === 'ranked') {
			setRankedShown(value);
		}
	};

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setUnixCurrentTime(Math.floor(Date.now() / 1000));
		setInterval(() => {
			setUnixCurrentTime(Math.floor(Date.now() / 1000));
		}, 1000);

		setIsMobile(window.innerWidth <= 816);
		window.addEventListener('resize', () => {
			setIsMobile(window.innerWidth <= 816);
		});
		// cleanup function
		return () => window.removeEventListener('resize', setIsMobile(window.innerWidth < 816));
	}, []);

	const augmentAll = () => {
		setRegularShown(maxShown + 1);
		setRankedShown(maxShown + 1);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.text}>
				<Title element="h1" className={styles.title}>
					Splatoon map rotation.
				</Title>
				<p>Check the current map rotation and splatfest info for Splatoon on Pretendo Network</p>
			</div>

			<div className={styles.skewed}>
				<SplatfestCard locale={locale} splatfestInfo={splatoonInfo.splatfest} />

				{isMobile ? (
					<MobileLayout splatoonInfo={splatoonInfo} unixCurrentTime={unixCurrentTime} shown={shown} setShown={setShown} />
				) : (
					<DesktopLayout
						splatoonInfo={splatoonInfo}
						unixCurrentTime={unixCurrentTime}
						augmentAll={augmentAll}
						maxShown={maxShown}
					/>
				)}
			</div>
		</div>
	);
}
