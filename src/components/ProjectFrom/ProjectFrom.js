import React, { useContext, useState, useEffect, Fragment, } from 'react';
import { Formik } from 'formik';
import * as R from 'ramda';
// helpers
import * as H from '../../helpers/index';
// features
import app from "../../firebase-config";
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import MultySelectInputComponent from '../../UI/SelectInput/Select';
import InputFile from '../../UI/InputFile/InputFile';
import Checkbox from '../../UI/Checkbox/Checkbox';
// ui
import classes from './ProjectFrom.module.css';
// settings
import { fieldSettings, fieldSettings2 } from './fields-settings';
// ///////////////////////////////////////////////////////

const GroupBox = (props) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [newGroup, setNewGroup] = useState(null)
  const addGroup = () => {
    const val = {
      text: text,
      image: file,
      imagePath: null
    }
    setText('');
    setFile(null);
    const newGroup = [...props.group];
    newGroup.push(val)
    props.setGroup('details', newGroup);
  }

  const handleChangeText = (value) => {
    const updateGroup = {
      text: value,
      image: file,
      imagePath: R.is(String, file) ? file : null,
    }
    setText(value);
    setNewGroup(updateGroup);
  }
  const updateGroup = (index) => {
    const nGr = [...props.group];
    nGr.splice(index, 1, newGroup);
    props.updateGroupValue(nGr);
  }

  const deleteGroup = (index) => {
    const newGroup = [...props.group];
    newGroup.splice(index, 1);
    props.removeGroupValue(newGroup);
  }

  const handleDeleteDetailsExistImage = (name, i) => {
    setFile(null)
    const detailsVal = R.path(['values', 'details'], props);
    let pickObj = R.path([i], detailsVal);
    pickObj = R.set(R.lensProp('image'), null, pickObj);
    pickObj = R.set(R.lensProp('imagePath'), null, pickObj);
    pickObj = R.set(R.lensProp('text'), text, pickObj);
    setNewGroup(pickObj);
    props.handleDeleteExistImage(null, true, i, R.path(['initValue', 'imagePath'], props))
  }

  const action = props.count ? updateGroup : addGroup;
  useEffect(() => {
    if (props.initValue) {
      R.keys(props.initValue).forEach((key) => {
        if (key === 'text') {
          return setText(props.initValue[key])
        }
        if (key === 'image') {
          return setFile(props.initValue[key])
        }
      })
    }

  }, [props.initValue])
  return (
    <div className={classes.cart}>
      {props.count && <p className={classes.count}>{props.count}</p>}
      {
        fieldSettings2.map((item, i) => {
          if (item.inputType === 'file') {
            return (
              <Fragment key={i}>
                {
                  R.is(String, file)
                  ? (
                    <div className={classes.imgPrev}>
                      <span
                      onClick={() => handleDeleteDetailsExistImage(item.name, i)}
                      >X</span>
                      <p>{item.label}</p>
                      <img src={file} alt=' ' height='150px' width='200px'/>
                    </div>
                  ) : (
                    <InputFile
                      name={item.name}
                      label={item.label}
                      onBlur={props.handleBlur}
                      inputType={item.inputType}
                      validation={item.validation}
                      fileName={file && file.name || file}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  )
                }
              </Fragment>
            )
          }
          return (
            <textarea
              key={i}
              value={text}
              name={item.name}
              rows={30}
              id={props.name}
              type={item.type}
              onBlur={props.handleBlur}
              placeholder={item.placeholder}
              onChange={(e) => handleChangeText(e.target.value)}
            />
          )
        })
      }
      <div className={classes.bottom}>
        {
          props.count 
          ? (
            <div
              className={classes.button}
              onClick={() => deleteGroup(props.index)}
            >
              Delete
            </div>
          ) : null
        }
        <div
          className={classes.button}
          onClick={() => action(props.index)}
        >
          {props.count ? 'Update' : 'Add'}
        </div>
      </div>
    </div>
  )
}

const Form = (props) => {
  const [options, setOptions] = useState([]);
  const [group, setGroup] = useState([]);
  const [deletedImage, setDeletedImage] = useState([]);
  const [selectedOption, setSelectedOptions] = useState([]);
  const handleDeleteExistImage = (name, group, index, path) => {
    const newObj = [...deletedImage];
    if (group) {
      newObj.push(path);
      setDeletedImage(newObj)
      let details = R.path(['values', 'details'], props);
      let changedObj = details[index];
      changedObj = R.set(R.lensProp('image'), null, changedObj);
      changedObj = R.set(R.lensProp('imagePath'), null, changedObj);
      details.splice(index, 1, changedObj);
      props.setFieldValue('deletedImage', newObj)
      return props.setFieldValue('details', details)
    }
    newObj.push(path)
    setDeletedImage(newObj)
    props.setFieldValue(name, null);
    props.setFieldValue(`${name}Path`, null);
    props.setFieldValue('deletedImage', newObj)
  }
  
  const handleChangeFile = (e, name, path) => {
    if (R.is(String, props.values[name])) {
      handleDeleteExistImage(name, null, null, props.values[`${name}Path`])
    }
    props.setFieldValue(name, e.target.files[0])
  }
  const handleChangeCheckbox = (name, value) => {
    props.setFieldValue(name, value)
  }
  const handleChangeOptions = (name, opt) => {
    setSelectedOptions(opt)
    const tags = opt.map(item => item.value)
    props.setFieldValue(name, tags)
  } 
  const addGroupValue = (name, val) => {
    setGroup(val);
    props.setFieldValue(name, val)
  }
  const removeGroupValue = (val) => {
    setGroup(val);
    props.setFieldValue('details', val)
  }
  const updateGroupValue = (val) => {
    setGroup(val);
    props.setFieldValue('details', val)
  }
  useEffect(() => {
    if (props.tagsList && options.lenght !== 0) {
      const opt = props.tagsList.map((item) => {
        return ({
          label: item.label,
          value: item.id,
          category: item.category
        })
      })
      setOptions(opt)
    }
    if (R.values(props.initValues).length !== 0) {
      const tags = R.values(R.pathOr([], ['initValues', 'tags'], props));
      let selectedList = props.tagsList.filter((tg) => {if (R.includes(tg.id, tags)) return tg});

      selectedList = selectedList.map((item) => {
        return ({
          label: item.label,
          value: item.id,
          category: item.category
        })
      })
      const initGroup = R.values(R.path(['initValues', 'details'], props))
      setGroup(initGroup)
      setSelectedOptions(selectedList)
      props.setValues(props.initValues)

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initValues, props.tagsList])
  return (
    <form onSubmit={props.handleSubmit} >
    <div className={classes.wrap}>
      {
        fieldSettings.map((item, i) => {
          if (item.inputType === 'array') {
            return (
              <Fragment key={i}>
                <GroupBox
                  {...item}
                  {...props}
                  group={group}
                  setGroup={addGroupValue}
                  updateGroupValue={updateGroupValue}
                  removeGroupValue={removeGroupValue}
                />
                {
                  group.map((item ,i) => {
                    return (
                      <GroupBox
                        key={i}
                        index={i}
                        count={i+1}
                        group={group}
                        initValue={item}
                        setGroup={addGroupValue}
                        updateGroupValue={updateGroupValue}
                        removeGroupValue={removeGroupValue}
                        handleDeleteExistImage={handleDeleteExistImage}
                      />
                    )
                  })
                }
              </Fragment>
            ) 
          }
          if (item.inputType === 'file') {
            const fileName = props.values[item.name];
            return (
              <Fragment key={i}>
                {
                  R.is(String, props.values[item.name])
                  ? (
                    <div className={classes.imgPrev}>
                      <span
                      onClick={() => handleDeleteExistImage(item.name, null, null, props.values[`${item.name}Path`])}
                      >X</span>
                      <p>{item.label}</p>
                      <img src={props.values[item.name]} alt=' ' height='150px' width='200px'/>
                    </div>
                  ) : null
                }
                <InputFile
                  name={item.name}
                  label={item.label}
                  onBlur={props.handleBlur}
                  inputType={item.inputType}
                  onChange={handleChangeFile}
                  validation={item.validation}
                  fileName={R.pathOr(null, ['name'], fileName)}
                />
              </Fragment>
            ) 
          }
          if (item.inputType === 'checkbox') {
            const fileName = props.values[item.name];
            return (
              <Checkbox
                key={i}
                name={item.name}
                label={item.label}
                onBlur={props.handleBlur}
                inputType={item.inputType}
                checked={props.values[item.name]}
                handleChange={handleChangeCheckbox}
                fileName={R.pathOr(null, ['name'], fileName)}
              />
            ) 
          }

          if (item.inputType === 'multiselect') {
            return (
              <MultySelectInputComponent
                key={i}
                name={item.name}
                options={options}
                autoComplete="off"
                onBlur={props.handleBlur}
                inputType={item.inputType}
                validation={item.validation}
                selectedOption={selectedOption}
                handleChange={handleChangeOptions}
              />
            ) 
          }
          if (item.type === 'textarea') {
            return (
              <textarea
                key={i}
                rows={30}
                id={props.name}
                name={item.name}
                type={item.type}
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                placeholder={item.placeholder}
                value={props.values[item.name]}
              />
            )
          }
          return (
            <Input
              key={i}
              name={item.name}
              type={item.type}
              autoComplete="off"
              onBlur={props.handleBlur}
              validation={item.validation}
              placeholder={item.placeholder}
              value={props.values[item.name]}
              checked={props.values[item.name]}
              handleChange={props.handleChange}
            />
          )
        })
      }
    </div>
    <div className={classes.bottom}>
      <Button type="submit">{ props.appPr ? 'Add Project' : 'Edit Project'}</Button>
    </div>
  </form>
  )
}

const ProjectFrom = (props) => {
  const { tagsList, appPr, initValues, getProject, closeModal, setRecallInit } = props;
  const dafauldFields = {
    featured: false,
    logo: false,
    screenshot: false,
    title: '',
    description: '',
    logoImg: null,
    screenshotImg: null,
    details: [],
    tags: []
  }
  return (
    <div className={classes.ProjectFrom}>
      <h1>{appPr ? 'Add Project' : 'Edit Project'}</h1>
      <Formik
        initialValues={R.or(initValues, dafauldFields)}
        onSubmit={(values) => {
          const getDownloadURL = async (key, value) => {
            try {
              const storageRef = app.storage().ref();
              let formData = new File([value], value.name);
              const urls = await storageRef.child(`projectList/${key}/${value.name}`).put(formData);
              const downloadURL = await urls.ref.getDownloadURL()
                .then((downloadURL) => {
                  return ({url: downloadURL, path: urls.metadata.fullPath})
                })
              return downloadURL;
            } catch (err) {
              console.error(err)
            }
          }
          const deletedImageFromStore = async (deletedImage) => {
            try {
              const storageRef = app.storage().ref();
              const res = await Promise.all(deletedImage.map( async path => {
                const resq = await storageRef.child(path);
                const res = await storageRef.child(path).delete();
                return console.log('delete');
              }))
              console.log('delete');
              return res
            } catch(err) {
              console.error(err)
            }
          } 
          const editProject = async () => {
            try {
              const deletedImage = R.path(['deletedImage'], values);
              if (H.isNotNilAndNotEmpty(deletedImage) && deletedImage.lenght !== 0) {
                deletedImageFromStore(deletedImage)
              }
              let docs = {};
              const checkData = R.keys(values).reduce((prev, next) => {
                const checkData = [
                  'logoImg',
                  'details',
                  'logoImgPath',
                  'screenshotImg',
                  'screenshotImgPath'
                ]
                if (R.includes(next, checkData)) {
                  if(R.is(String, values[next]) || H.isNilOrEmpty(values[next])) {
                    const sentData = Object.assign(prev, {[next]: values[next]});
                    return sentData;
                  }
                  if (R.is(Array, values[next])) {
                    Object.assign(docs, { 'details': values[next] })
                    return prev
                  }

                  Object.assign(docs, {[next]: values[next]})
                  return prev;
                }
                return Object.assign(prev, {[next]: values[next]})
              }, {})
              let dataValue = R.omit([
                'deletedImage',
              ], checkData);
              const doc = await app.firestore().collection("projectList").doc(values.id)
              const res = await doc.set({...dataValue});
              const newDoc = await Promise.all(R.keys(docs).map( async (key) => {
                if (R.is(String, docs[key]) || (H.isNilOrEmpty(docs[key]))) {
                  return  ({ [key]: docs[key], [`${key}Path`]: docs[`${key}Paht`] })
                }
                if (R.is(Array, docs[key])) {
                  const newVal = await Promise.all(docs[key].map( async (item, i) => {
                    if (R.is(String, item.image) || H.isNilOrEmpty(item.image)) {
                      return item
                    }
                    const url = await getDownloadURL(`${values.id}/details/${i}`, item.image);
                    return ({
                      text: item.text,
                      image: url.url,
                      imagePath: url.path
                    })
                  }))
                  return ({ [key]: newVal })
                }
                const url = await getDownloadURL(`${values.id}/${key}`, docs[key]);
                return ({
                  [key]: url.url,
                  [`${key}Path`]: url.path
                })
              })).then(res => {
                const dataWithUrls = res.reduce((prev, next) => {
                  const newD = Object.assign(prev, next);
                  return newD
                }, {})
                const resD = app.firestore().collection("projectList").doc(values.id)
                resD.set({
                  ...dataValue,
                  ...dataWithUrls
                })
                setRecallInit()
                getProject();
                closeModal();
                return console.log('Update Project')
              })
            } catch (err) {
              console.error(err)
            }

          }
          const addProject =  async () =>  {
            try {
              const docs = R.pick(['logoImg', 'screenshotImg', 'details'], values);
              let data = R.omit(['logoImg', 'screenshotImg', 'details'], values);
              const collection = await app.firestore().collection("projectList")
              const prRes = await collection.doc();
              const res = await prRes.set({...data});
              const newDoc = await Promise.all(R.keys(docs).map(async (key) => {
                if (R.and(R.is(Array, docs[key]), R.not(R.isEmpty(docs[key])))) {
                  const detailWithUrl = await Promise.all(docs[key].map( async (subItem, i) => {
                    const data = await getDownloadURL(`${prRes.id}/details/${i}`, subItem.image)
                      .then((res) => {
                        return res;
                      })
                    
                    return ({
                        text: R.path(['text'], subItem),
                        image: data.url,
                        imagePath: data.path
                      });
                  }))

                  return ({
                    details: [...detailWithUrl]
                  })
                }
                if (R.isNil(docs[key])) {
                  return ({})
                }
                const value = await getDownloadURL(`${prRes.id}/${key}`, docs[key])
                return ({
                  [key]: value.url,
                  [`${key}Path`]: value.path
                })
                
              })).then(res => {
                const dataWithUrls = res.reduce((prev, next) => {
                  const newD = Object.assign(prev, next);
                  return newD
                }, {})
                app.firestore().collection("projectList").doc(prRes.id).set({
                  ...data,
                  ...dataWithUrls,
                  id: prRes.id
                })
                setRecallInit()
                getProject();
                closeModal();
                return console.log('Create Project')
              })
            } catch (err) {
              console.error(err)
            }
          }
          if (appPr) {
            return addProject();
          }
          return editProject();
        }}
      >
        {props => (
          <Form
            {...props}
            appPr={appPr}
            tagsList={tagsList}
            initValues={initValues}
          />
        )}
      </Formik>
    </div>
)};

export default ProjectFrom;
