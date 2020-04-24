import React from 'react';
import * as R from 'ramda';
import Loader from '../../../containers/Loader/index';
import classes from './PortfolioPageLayout.module.css';
import PortfolioFilter from "../../PortfolioFilter/PortfolioFilter";
import LogOutButton from '../../../components/LogOutButton/LogOutButton';
import AddProjectButton from '../../../components/AddProjectButton/AddProjectButton';
import ProjectsBlock from "../../../components/PortfolioProjects/ProjectsBlock/ProjectsBlock";
// helpers
import * as H from '../../../helpers/index'
// firebase api
import app from "../../../firebase-config";
// hocs
import withLayout from '../../../hoc/with-layout';
// /////////////////////////////////////////////////////////

const db = app.firestore();

class PortfolioPageLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
      recall: false,
      tagList: [],
      loader: false,
      activeTags: [],
      projectList: [],
      openFilter: false,
      lastVisible: null,
      limit: 10
    }

    this.removeTag = this.removeTag.bind(this);
    this.getMoreData = this.getMoreData.bind(this);
    this.setActiveTag = this.setActiveTag.bind(this);
    this.addActiveTag = this.addActiveTag.bind(this);
    this.setOpenFilter = this.setOpenFilter.bind(this);
    this.setRecallInit = this.setRecallInit.bind(this);
    this.setFilterQuery = this.setFilterQuery.bind(this);
    this.getTagListData = this.getTagListData.bind(this);
    this.setQueryString = this.setQueryString.bind(this);
    this.setCloseFilter = this.setCloseFilter.bind(this);
    this.getFilterProjects = this.getFilterProjects.bind(this);
    this.removeDeletedPrFromList = this.removeDeletedPrFromList.bind(this);
  }
  setQueryString = (path, query) => {
    const history = this.props.history;
    if (H.isNilOrEmpty(query)) {
      return history.push(path)
    }
    history.push(`${path}${query}`)
  }

  setActiveTag = (actTags) => (this.setState({ activeTags: actTags }))

  setOpenFilter = () =>  this.setState({ openFilter: true })

  setRecallInit = (val=false) =>  this.setState({ recall: val })

  setCloseFilter = () => this.setState({ openFilter: false })

  addActiveTag = (tag) => {
    const isAllow = this.state.activeTags.find((item) => (tag.id === item.id));
    if (isAllow && isAllow !== undefined) {
        return this.removeTag(tag);
    }
    let actTags = [...this.state.activeTags];
    actTags.push(tag)
    this.setActiveTag(actTags);
    const reqData = actTags.map(item => item.id);
    const querySt = String(reqData)
    this.setQueryString('portfolio', `?${querySt}`);
  }

  removeTag = (tag) => {
    const delEl = this.state.activeTags.findIndex((item) => (tag.id === item.id));
    let actTags = [...this.state.activeTags];
    actTags.splice(delEl, 1);
    this.setActiveTag(actTags);
    const reqData = actTags.map(item => item.id);
    const querySt = String(reqData)
    this.setQueryString('portfolio', `?${querySt}`);
    if (actTags.length === 0) {
      this.setState({ hasMore: true });
      this.getProjectsData();
      this.setQueryString('portfolio', null);
    }
  }

  removeDeletedPrFromList = (id) => {
    let list = R.indexBy(R.prop('id'), this.state.projectList);
    list = R.omit([id], list)
    this.setState({ projectList: R.values(list) });
  }
  getLimitData = async (data) => {
    try {
      const res = await data.get();
      let lastVisible = res.docs[res.docs.length-1];
      const list = res.docs.map(doc => {
        let data = doc.data();
        if (!R.has('id', data)) {
          return ({
            ...data,
            id: doc.id
          })
        }
        return ({...data})
      });
      return { list, lastVisible: lastVisible.id }
    } catch(err) {
      this.setState({
        hasMore: false,
        recall: false,
        lastVisible: null
      });
      console.error('Error', err)
    }
  };

  getProjectsData = async () => {
    try {
      const data = this.state.recall
        ? db.collection('projectList')
            .orderBy("id")
            .startAfter(this.state.lastVisible)
            .limit(this.state.limit)
        : db.collection('projectList')
            .orderBy("id")
            .limit(this.state.limit);
      const res = await this.getLimitData(data);
      this.setState({ 
        loader: false,
        lastVisible: res.lastVisible,
        projectList: this.state.projectList.concat(res.list)
      })
    } catch (err) {
      console.error(err);
    }
  }


  getTagListData = async () => {
    try {
      const res = await db.collection('tags').get();
      const data = res.docs.map(doc => ({
        ...doc.data(),
        dataId: doc.id
    }));
      this.setState({ tagList: data })
    } catch (err) {
      console.error(err);
    }
  }
  getFilterProjects = async (activeTags=this.state.activeTags) => {
    try {
      this.setState({
        recall: false,
        hasMore: false,
        lastVisible: null
      })

      const location = this.props.location;
      let queryParams = location.search;
      if (queryParams.length !== 0) {
        queryParams.split('?');
        queryParams.split(',');
      }
      const isDiffCategory = activeTags.reduce((prev, next) => {
        if (prev.prevList.length === 0) {
          prev.prevList.push(next.category);
          return prev;
        }
        if (prev.prevList.length === 1 && prev.prevList.includes(next.category)) {
          prev.status = false;
          return prev;
        } else {
          prev.status = true;
          prev.prevList.push(next.category);
          return prev;
        }
      }, {status:false, prevList: []})
      const reqData = activeTags.map(item => item.id);
      const res =  await db.collection('projectList').where('tags', 'array-contains-any', reqData).get();
      const data = await res.docs.map(doc => {
        return ({
        ...doc.data(),
        id: doc.id
      })});

      if (isDiffCategory.status) {
        const dataFilt = data.filter((pr) => {
          const status = reqData.reduce((prev, next) => {
            if (prev && pr.tags.includes(next)) {
              return prev
            }
            return false;
          }, true);
         if (status) {
          return pr;
         }
        });
        return this.setState({ projectList: dataFilt })
      } 
      this.setState({ projectList: data })
    } catch (err) {
      console.error(err);
    }
  }

  getMoreData = () => {
    this.setState({ recall: true })
    this.getProjectsData()
  }

  getInitProject = () => {
    this.setState({ loader: true })
    this.getProjectsData();
  }

  setFilterQuery = (queryParams) => {
    let queryData = queryParams.split('?');
    queryData = queryData[1].split(',');
    const activeTags = this.state.tagList.filter((item) => {
      if (queryData.includes(item.id)) {
        return item
      }
    });
    this.setActiveTag(activeTags);
  }
  componentDidMount() {
    this.getTagListData();
    const location = this.props.location;
    let queryParams = location.search;
    if (queryParams.length === 0) {
      this.getInitProject();
    }
  }
  render(){
    const getFilterData = (activeTags) => {
      this.getFilterProjects(activeTags);
    }
    const addGameCatalogue = this.state.activeTags.find(item => {
      if (item.id === 'game') {
        return true
      }
      return false;
    });
    const cls = [classes.BgMenu];
    if (this.state.openFilter) {
      cls.push(classes.active)
    } else {
      cls.push(classes.close)
    }
    const location = this.props.location;
    let queryParams = location.search;
    return (
      <div className={classes.PortfolioPageLayout}>
        <div className={cls.join(' ')}></div>
        <main>
          <PortfolioFilter
            tags={this.state.tagList}
            removeTag={this.removeTag}
            getFilterData={getFilterData}
            location={this.props.location}
            openModal={this.props.openModal}
            addActiveTag={this.addActiveTag}
            closeModal={this.props.closeModal}
            activeTags={this.state.activeTags}
            openFilter={this.state.openFilter}
            setOpenFilter={this.setOpenFilter}
            addGameCatalogue={addGameCatalogue}
            getTagListData={this.getTagListData}
            setFilterQuery={this.setFilterQuery}
            setCloseFilter={this.setCloseFilter}
          />
          {
            this.state.loader ?
            <Loader /> :
            <ProjectsBlock
              {...this.props}
              hasMore={this.state.hasMore}
              tagsList={this.state.tagList}
              projects={this.state.projectList}
              setRecallInit={this.setRecallInit}
              removeDeletedPrFromList={this.removeDeletedPrFromList}
              getMoreData={!this.state.hasMore && !this.state.recall ? null : this.getMoreData}
              getProject={queryParams.length === 0 ? this.getProjectsData : this.getFilterProjects}
            />
          }
          <AddProjectButton
            tagsList={this.state.tagList}
            openModal={this.props.openModal}
            setRecallInit={this.setRecallInit}
            closeModal={this.props.closeModal}
            getProject={queryParams.length === 0 ? this.getProjectsData : this.getFilterProjects}
          />
          <LogOutButton/>
        </main>
      </div>
    )
  }
};

export default withLayout(PortfolioPageLayout);
