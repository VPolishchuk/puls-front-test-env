import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { Formik } from 'formik';
import * as Yup from 'yup';
// features
import app from "../../firebase-config";
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { SelectInputComponent } from '../../UI/SelectInput/Select';
// ui
import classes from './TagFrom.module.css';
// ///////////////////////////////////////////////////////



export const fieldSettings = [
  {
    name: 'category',
    inputType: 'select',
    label: 'category',
    validation: true
  },
  {
    name: 'id',
    inputType: 'text',
    placeholder: 'Id',
    validation: true
  },
  {
    name: 'label',
    inputType: 'text',
    placeholder: 'Label',
    validation: true
  },
]

const Form = (props) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOptions] = useState([]);
  const handleChangeOptions = (name, opt) => {
    setSelectedOptions(opt)
    props.setFieldValue(name, opt.value)
  }
  useEffect(() => {
    if (props.categoryList && options.lenght !== 0) {
      const opt = props.categoryList.map((item) => {
        return ({
          label: item,
          value: item,
        })
      })
      setOptions(opt)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.categoryList])
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.wrap}>
        {
          fieldSettings.map((item, i) => {
            if (item.inputType === 'select') {
              return (
                <SelectInputComponent
                  {...item}
                  key={i}
                  options={options}
                  autoComplete="off"
                  onBlur={props.handleBlur}
                  selectedOption={selectedOption}
                  handleChange={handleChangeOptions}
                />
              ) 
            }
            return (
              <Input
                key={i}
                name={item.name}
                type={item.inputType}
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
        <Button type="submit">Add Tag</Button>
      </div>
   </form>
  )
}

const TagFrom = (props) => {
  const { tagsList, closeModal, getTagListData } = props;
  const categoryList = R.uniq(R.map((item) => item.category, R.values(tagsList)))
  return (
    <div className={classes.TagFrom}>
      <h1>Add Tag</h1>
      <Formik
        initialValues={{
          id: '',
          label: '',
          category: ''
      }}
        onSubmit={(values) => {
          const addTag =  async () =>  {
            try {
              const res = await app.firestore().collection("tags").doc().set({...values});
              getTagListData()
              closeModal();
              return console.log('Tag was added')
            } catch (err) {
              console.error(err);
              closeModal();
            }
          }
            return addTag();
        }}
      >
        {props => (
          <Form {...props} categoryList={categoryList} />
        )}
      </Formik>
    </div>
)};

export default TagFrom;