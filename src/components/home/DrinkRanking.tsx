import styles from '/styles/home/DrinkRanking.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Image from 'next/image';
import CrownIcon from '/public/crown.png';
import BeerIcon from '/public/beer.png';
import ChuhighIcon from '/public/chuhigh.png';
import SakeIcon from '/public/sake.png';
import WineIcon from '/public/wine.png';
import DrinkRankingTable from 'components/home/DrinkRankingTable';

interface DrinkRankingProps {

}

const DrinkRanking: React.FC<DrinkRankingProps> = (props) => {


  return (
    <div className={styles.drinkRankingDiv}>
      <h2 className={styles.rankingTitle}>
        <Image src={CrownIcon} className={styles.crownIcon} alt="Ranking" width={40} height={40} />
        Ranking
      </h2>
      <Tabs selectedTabClassName={styles.selectedTabClassName}>
        <TabList>
          <Tab>
            <Image src={BeerIcon} alt="Beer" width={20} height={20} />
            ビール
          </Tab>
          <Tab>
            <Image src={ChuhighIcon} alt="Chuhigh" width={20} height={20} />
            チューハイ
          </Tab>
          <Tab>
            <Image src={SakeIcon} alt="Sake" width={20} height={20} />
            日本酒
          </Tab>
          <Tab>
            <Image src={WineIcon} alt="Wine" width={20} height={20} />
            ワイン
          </Tab>
        </TabList>

        <TabPanel>
          <DrinkRankingTable />
        </TabPanel>
        <TabPanel>
          <h3>Any content 2</h3>
        </TabPanel>
        <TabPanel>
          <h3>Any content 3</h3>
        </TabPanel>
        <TabPanel>
          <h3>Any content 4</h3>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default DrinkRanking
