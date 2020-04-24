import React, { useContext } from 'react';
import classes from './FilterMenu.module.css';
import FilterItem from '../FilterItem/FilterItem';
import { AuthContext } from '../../firebase-auth';

// /////////////////////////////////////////////////

const CategoryBox = ({
  admin,
  title,
  category,
  actionAdd,
  activeTags,
  getTagListData
}) => {
  let catTitle = title;
  if (catTitle.includes('_')) {
    const newTit = catTitle.split('_');
    catTitle = newTit.join(' ');
  }
  return (
    <div className={classes.CategoryBox}>
      <h2>{catTitle}</h2>
      <div className={classes.tagWrap}>
        {
          category.map((item, i) => (
            <FilterItem
              admin={admin}
              key={i}
              item={item}
              actionAdd={actionAdd}
              activeTags={activeTags}
              getTagListData={getTagListData}
            />
          ))
        }
      </div>
    </div>
  )
};

const FilterMenu = ({ active, tags, actionAdd, activeTags, getTagListData }) => {
  const { currentUser } = useContext(AuthContext);
  let admin = false;
  if (currentUser) {
    admin = true;
  } 
  const cls = [classes.FilterMenu];
  if (active) {
    cls.push(classes.active)
  } else {
    cls.push(classes.close)
  }
  const tagsCategoryKeys = Object.keys(tags);
  return (
    <div className={cls.join(' ')}>
      <div>
        {
          tagsCategoryKeys.map((key, i) => {
            return (
              <CategoryBox
                key={i}
                title={key}
                admin={admin}
                category={tags[key]}
                actionAdd={actionAdd}
                activeTags={activeTags}
                getTagListData={getTagListData}
              />
            )
          }) 
        }
      </div>
    </div>
  );
};

export default FilterMenu;