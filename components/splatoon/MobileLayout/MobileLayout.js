import BattleCardCountdown from '../BattleCardCountdown/BattleCardCountdown';
import BattleCardSection from '../BattleCardSection/BattleCardSection';
import BattleCardHeader from '../BattleCardHeader/BattleCardHeader';
import BattleCardEndButton from '../BattleCardEndButton/BattleCardEndButton';

import styles from './MobileLayout.module.css';

import { Fragment } from 'react';

export default function MobileLayout({localecode,locale, splatoonInfo, unixCurrentTime, shown, setShown }) {
	return (
		<div className={styles.battleCards}>
			{['regular', 'ranked'].map((battleType, i) => {
				return (
					<div className={styles.battleCard} key={i}>
						<BattleCardHeader locale={locale} battleType={battleType} />
						{[...Array(shown[battleType]).keys()].map((key, j) => {
							return (
								<Fragment key={key}>
									<BattleCardCountdown
										row={j}
										battleInfo={splatoonInfo.battles}
										unixCurrentTime={unixCurrentTime}
										active={!key}
										locale={locale}
									/>
									<BattleCardSection
										battleInfo={splatoonInfo.battles}
										battleType={battleType}
										row={j}
										key={key}
										unixCurrentTime={unixCurrentTime}
										locale={locale}
										localecode={localecode}
									/>
								</Fragment>
							);
						})}

						<BattleCardEndButton
							onClick={() => setShown(battleType, shown[battleType] + 1)}
							battleType={battleType}
							end={shown[battleType] >= splatoonInfo.battles.list.length}
							locale={locale}
						/>
					</div>
				);
			})}
		</div>
	);
}
