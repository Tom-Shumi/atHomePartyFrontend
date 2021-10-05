import {useEffect, useState} from 'react';
import { Beer } from 'types/Beer';
import {apiClient} from 'utils/ApiUtils';
import {createQueryString} from 'utils/ListApiUtils';
import {env} from 'utils/EnvUtils';
import Router from 'next/router';
import {Button} from 'react-bootstrap';
import NoData from 'components/common/NoData';
import BeerListTable from 'components/drink/beer/beerList/BeerListTable';
import BeerDetailSearchModal from 'components/drink/beer/beerList/BeerDetailSearchModal';
import {Constant} from 'components/Constant';
import BeerSortSelectBox from 'components/drink/beer/beerList/BeerSortSelectBox';

const BeerList: React.FC = () => {
  const [beerList, setBeerList] = useState<Beer[]>([]);
  const [searchText, setSearchText] = useState<string>(""); // テキストボックス内の文字列
  const [searchedText, setSearchedText] = useState<string>(""); // 実際に検索を行なった文字列
  const [currentPage, setCurrentPage]  = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [order, setOrder] = useState<string>("");
  const [detailSearchCondition, setDetailSearchCondition] = useState(initDetailSearchCondition());
  const [isDetailSearchModalOpen, setIsDetailSearchModalOpen] = useState<boolean>(false);
  const [currentSearchType, setCurrentSearchType] = useState<string>(Constant.SEARCH_TYPE_DEFAULT);

  const handleChangeSearchText = () => (e: any) => setSearchText(e.target.value);
  const handleChangeOrder = () => (e: any) => setOrder(e.target.value);

  // 初期表示用
  useEffect(() => {
    callFetchBeerList();
  }, []);

  const paging = (page: number) => {
    setCurrentPage(page)
    callFetchBeerList(page)
  }

  const searchBeerList = () => {
    setSearchedText(searchText)
  }

  // 商品名検索用
  useEffect(() => {
    callFetchBeerList(0, Constant.SEARCH_TYPE_DRINK_NAME);
  }, [searchedText]);

  // 詳細検索用
  useEffect(() => {
    callFetchBeerList(0, Constant.SEARCH_TYPE_DETAIL);
    closeDetailSearchModal();
  }, [detailSearchCondition]);

  // 並び替え用
  useEffect(() => {
    callFetchBeerList();
  }, [order]);

  const callFetchBeerList = (page: number = 0, searchType: string = Constant.SEARCH_TYPE_DEFAULT) => {

    if (searchType == Constant.SEARCH_TYPE_DEFAULT) {
      searchType = currentSearchType;
    } else {
      setCurrentSearchType(searchType);
    }

    const res: Promise<Beer[]> = fetchBeerList(page, searchType);
    res.then(ret => setBeerList(ret));
  }

  async function fetchBeerList(page: number, searchType: string) {

    const queryString: string = createQueryString(page, searchType, searchedText, detailSearchCondition, order);

    try {
      const res = await apiClient().get(env(`${process.env.NEXT_PUBLIC_API_DRINK_BEER}${queryString}`));

      setMaxPage(res.data.maxPage);
      return createBeerList(res.data.beerList);

    } catch(error){
      Router.push('/error');
      return [];
    }
  }

  const openDetailSearchModal = () => setIsDetailSearchModalOpen(true);
  const closeDetailSearchModal = () => setIsDetailSearchModalOpen(false);

  const isNoData = beerList.length == 0;

  return (
    <>
      <div>
        <input type="text" value={searchText} onChange={handleChangeSearchText()} className="searchText" placeholder="商品名を入力してください。" />
        <Button variant="warning" className="searchButton" onClick={() => searchBeerList()} >商品名で検索</Button>

        <BeerSortSelectBox order={order} handleChangeOrder={handleChangeOrder}/>

        <Button variant="warning" className="detailSearchButton" onClick={() => openDetailSearchModal()} >詳細検索</Button>
        {isDetailSearchModalOpen &&
          <BeerDetailSearchModal detailSearchCondition={detailSearchCondition}
            setDetailSearchCondition={setDetailSearchCondition} close={closeDetailSearchModal}/>}
      </div>

      {isNoData || <BeerListTable beerList={beerList} currentPage={currentPage} maxPage={maxPage} paging={paging} />}
      {isNoData && <NoData />}
    </>
  )
}

export default BeerList


export function initDetailSearchCondition() {
  return {drinkName: "", starFrom: "", starTo: "", alcoholFrom: "", alcoholTo: "", bitterFrom: "", bitterTo: "",
          flavorFrom: "", flavorTo: "", hopFrom: "", hopTo: "", sharpFrom: "", sharpTo: "", bodyFrom: "", bodyTo: ""}
}

function createBeerList(responseData: any[]) {

  const beerList :Beer[] = [];

  for (let i = 0 ; i < responseData.length ; i++) {
    beerList.push(new Beer(responseData[i]["id"], responseData[i]["name"], responseData[i]["description"], responseData[i]["drinkCategoryId1"], responseData[i]["drinkCategoryId2"]
    , responseData[i]["infoUrl"], responseData[i]["alcohol"], responseData[i]["star"], responseData[i]["bitter"], responseData[i]["flavor"], responseData[i]["hop"]
    , responseData[i]["sharp"], responseData[i]["body"]))
  }

  return beerList;
}