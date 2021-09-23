import {Table} from 'react-bootstrap';
import styles from '/styles/home/DrinkRankingTable.module.css';
import { Drink } from 'types/Drink';
import Image from 'next/image';
import ReactStars from 'react-stars';
import {Constant} from 'components/Constant';

interface DrinkRankingTableProps {
  rankingList: Drink[];
  drinkTypeName: string;
}

const DrinkRankingTable: React.FC<DrinkRankingTableProps> = (props) => {

  const headerColspan = 2;

  return (
    <Table hover>
      <thead>
        <tr className="centerTr">
          <th className="numberTh">#</th>
          <th colSpan={headerColspan} >商品</th>
          <th className="starTh">星</th>
          <th>説明</th>
        </tr>
      </thead>
      <tbody>
        {(props.rankingList || []).map((drink, count) => {
          let color = "rankingColor" + (count + 1);

          return (
            <tr key={props.drinkTypeName + "Ranking" + (count + 1)} className={"rankingTr" + Constant.CSS_JOIN + color} >
              <td className="centerTd">{count + 1}</td>
              <td className="imageTd">
                {drink.infoUrl != null &&
                  <Image key={props.drinkTypeName + "RankingImage" + (count + 1)}
                  src={drink.infoUrl} alt={props.drinkTypeName + "RankingImage" + (count + 1)} width={70} height={70} />
                }
              </td>
              <td className={styles.nameTd}>{drink.name}</td>
              <td className="centerTd">
                <ReactStars
                  count={5}
                  value={drink.star}
                  size={24}
                  color1={'#d3d3d3'}
                  color2={'#ffd700'}
                  edit={false} />{drink.star}
              </td>
              <td>{drink.description}</td>
            </tr>)
        })}
      </tbody>
    </Table>
  )
}

export default DrinkRankingTable
