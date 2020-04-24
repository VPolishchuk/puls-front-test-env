import React, { useEffect, useContext } from 'react';
import * as R from 'ramda';
import classes from './PortfolioFilter.module.css';
import FilterItem from "../../components/FilterItem/FilterItem";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import {FilterDrop} from "../../components/FilterDrop/FilterDrop";
import OutsideClickHandler from 'react-outside-click-handler';
import { AuthContext } from '../../firebase-auth';
import TagFrom from '../../components/TagForm/TagFrom';
// ////////////////////////////////////////////////////////////////////
const PortfolioFilter = (props) => {
  const { currentUser } = useContext(AuthContext);
  let admin = false;
  if (currentUser) {
    admin = true;
  }
  const handelAddTag  = (id) => {
    const component = (
      <TagFrom
        tagsList={props.tags}
        closeModal={props.closeModal}
        getTagListData={props.getTagListData}
      />
    );
    props.openModal(component)
  }
  const technology = props.tags.filter((pr) => {if (pr.category === 'technology') return pr});
  const platform = props.tags.filter((pr) => {if (pr.category === 'platform') return pr});
  const industry = props.tags.filter((pr) => {if (pr.category === 'industry') return pr});
  const game_genre = props.tags.filter((pr) => {if (pr.category === 'game_genre') return pr});
  let map = {
    technology,
    platform,
    industry,
  }
  if (props.addGameCatalogue && props.addGameCatalogue.id === 'game') {
    Object.assign(map, { game_genre })
  }
  useEffect(() => {
    if (props.activeTags.length !== 0) {
      props.getFilterData && props.getFilterData(props.activeTags);
    }
    const location = props.location;
    let queryParams = location.search;
    // this check if after reload page need call filterList 
    if (props.tags.length !==0 && queryParams.length !== 0 && props.activeTags.length === 0) {
      return props.setFilterQuery(queryParams)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activeTags, props.tags])
  return (
    <div className={classes.PortfolioFilter}>
      <div className={classes.ActiveTagWrap}>
        <FilterDrop setOpen={props.openFilter ? props.setCloseFilter : props.setOpenFilter} open={props.openFilter} />
        {
          admin
          ? (
            <div
              className={classes.AddTag}
              onClick={() => handelAddTag()}
            >+</div>
          ) : null
        }
        {
          props.activeTags.map((item, i) => (
            <FilterItem
              key={i}
              item={item}
              isActive={true}
              actionRemove={props.removeTag}
            />
          ))
        }
      </div>
      <OutsideClickHandler
        display='contents'
        onOutsideClick={props.setCloseFilter}
      >
        <FilterMenu
          tags={map}
          active={props.openFilter}
          activeTags={props.activeTags}
          actionAdd={props.addActiveTag}
          getTagListData={props.getTagListData}
        />
      </OutsideClickHandler>
    </div>
  );
};

export default PortfolioFilter;
