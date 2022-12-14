import Title from '../../components/Title/Title';
import SplatfestCard from '../../components/splatoon/SplatfestCard/SplatfestCard';

import DesktopLayout from '../../components/splatoon/DesktopLayout/DesktopLayout';
import MobileLayout from '../../components/splatoon/MobileLayout/MobileLayout';

import { Fragment } from 'react';
import classNames from 'classnames';

import styles from './index.module.css';

import { useState, useEffect } from 'react';

import { getLocale } from '../../utils/locale';
import { getMapRotations, getSplatfestData,getNintendoRotation } from '../../utils/fetcher';

export async function getServerSideProps(ctx) {
	const locale = getLocale(ctx.locale);
	getNintendoRotation(false); //used for testing purposes can be removed
	const splatfest = await getSplatfestData(locale);
	const maprotations = await getMapRotations(locale);

	const splatoonInfo = {
		splatfest: splatfest,
		battles: maprotations,
	};

	return {
		props: {
			locale,
			splatoonInfo,
			localecode: ctx.locale,
		},
	};
}

export default function Splatoon({localecode ,locale, splatoonInfo }) {
	const [unixCurrentTime, setUnixCurrentTime] = useState(1670660187); // hardcoded to ensure consinstency between client and server, will be updated with useEffect as soon as the component mounts

	const [regularShown, setRegularShown] = useState((splatoonInfo.battles.list.length < 2)? 1 : 2);
	const [rankedShown, setRankedShown] = useState((splatoonInfo.battles.list.length < 2)? 1 : 2);
	const maxShown = Math.max(regularShown, rankedShown);
	const [hasSplatfest, setSplatfestShown] = useState(false); 
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
		setSplatfestShown(splatoonInfo.splatfest.end >= Math.floor(Date.now() / 1000));

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
					{locale.nav.main}
				</Title>
				<p>{locale.nav.description}</p>
			</div>

			<div className={styles.skewed}>
				{hasSplatfest && <SplatfestCard localecode={localecode} locale={locale} splatfestInfo={splatoonInfo.splatfest} />}

				{isMobile ? (
					<MobileLayout localecode={localecode} locale={locale} splatoonInfo={splatoonInfo} unixCurrentTime={unixCurrentTime} shown={shown} setShown={setShown} />
				) : (
					<DesktopLayout
						localecode={localecode}
						locale={locale}
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
