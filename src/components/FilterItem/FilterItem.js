import React from 'react';
import classes from './FilterItem.module.css';
import app from '../../firebase-config';
// /////////////////////////////////////////////////


const FilterItem = ({
  item,
  admin,
  actionAdd,
  activeTags,
  actionRemove,
  isActive=false,
  getTagListData
}) => {
  const activeInMenu = activeTags && activeTags.find(actItem => (actItem.id === item.id))
  const addTagForSearch = (item) => {
    if (actionAdd) {
      actionAdd(item);
    }
  }
  const removeTagForSearch = (e, item) => {
    if (actionRemove) {
      actionRemove(item);
    }
  }
  const handelDeleteTag = (e, item) => {
    e.stopPropagation();
    const db = app.firestore()
      db.collection('tags').doc(item.dataId).delete()
      .then(function() {
        console.log("Tag successfully deleted!");
        getTagListData()
      }).catch(function(error) {
        alert("Error removing document: ", error);
      }
    );
  }
  const cls = [classes.FilterItem];
  if (isActive) {
    cls.push(classes.activeTop);
  }
  if (activeInMenu && activeInMenu !== undefined) {
    cls.push(classes.black);
  } else {
    cls.push(classes.light);
  }
  if (admin) {
    cls.push(classes.activeTop);
  }
  const actin = !isActive && admin ? handelDeleteTag : removeTagForSearch;
  return (
    <div key={item.id} className={cls.join(' ')} onClick={() => addTagForSearch(item)}>
      {item.label}
      <span onClick={(e) => actin(e, item)}></span>
    </div>
  );
};

export default FilterItem;