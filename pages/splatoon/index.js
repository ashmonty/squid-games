import Title from '../../components/Title/Title';
import SplatfestCard from '../../components/splatoon/SplatfestCard/SplatfestCard';

import DesktopLayout from '../../components/splatoon/DesktopLayout/DesktopLayout';
import MobileLayout from '../../components/splatoon/MobileLayout/MobileLayout';

import { Fragment } from 'react';
import classNames from 'classnames';

import styles from './index.module.css';

import { useState, useEffect } from 'react';

import { getLocale } from '../../utils/locale';
import { getMapRotations, getSplatfestData,useNintendoRotation } from '../../utils/fetcher';

export async function getServerSideProps(ctx) {
	const locale = getLocale(ctx.locale);
	useNintendoRotation(false); //used for testing purposes can be removed
	const splatfest = await getSplatfestData();
	const maprotations = await getMapRotations();

	const splatoonInfo = {
		splatfest: splatfest,
		battles: maprotations,
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

	const [regularShown, setRegularShown] = useState(splatoonInfo.battles.list.length);
	const [rankedShown, setRankedShown] = useState(splatoonInfo.battles.list.length);
	const maxShown = Math.max(regularShown, rankedShown);
	const hasSplatfest = splatoonInfo.splatfest.end >= Math.floor(Date.now() / 1000);
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
			{hasSplatfest && <SplatfestCard locale={locale} splatfestInfo={splatoonInfo.splatfest} />}

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
