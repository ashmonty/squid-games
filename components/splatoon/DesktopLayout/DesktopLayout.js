import BattleCardCountdown from '../BattleCardCountdown/BattleCardCountdown';
import BattleCardSection from '../BattleCardSection/BattleCardSection';
import BattleCardHeader from '../BattleCardHeader/BattleCardHeader';
import BattleCardEndButton from '../BattleCardEndButton/BattleCardEndButton';

import styles from './DesktopLayout.module.css';

import { Fragment } from 'react';

export default function DesktopLayout({ splatoonInfo, unixCurrentTime, augmentAll, maxShown }) {
	return (
		<div className={styles.battleCards}>
			{['regular', 'ranked'].map((battleType, i) => (
				<BattleCardHeader key={i} battleType={battleType} />
			))}

			{[...Array(maxShown).keys()].map((key, i) => {
				return (
					<Fragment key={key}>
						<BattleCardCountdown
							row={i}
							battleInfo={splatoonInfo.battles}
							unixCurrentTime={unixCurrentTime}
							isWide={true}
						/>
						<BattleCardSection
							battleInfo={splatoonInfo.battles}
							battleType="regular"
							row={i}
							key={key}
							unixCurrentTime={unixCurrentTime}
						/>
						<BattleCardSection
							battleInfo={splatoonInfo.battles}
							battleType="ranked"
							row={i}
							key={key + 1}
							unixCurrentTime={unixCurrentTime}
						/>
					</Fragment>
				);
			})}

			<BattleCardEndButton
				onClick={augmentAll}
				battleType={'all'}
				end={maxShown >= splatoonInfo.battles.list.length}
			/>
		</div>
	);
}
