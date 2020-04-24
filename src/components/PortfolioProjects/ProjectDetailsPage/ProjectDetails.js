import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import classes from './ProjectDetails.module.css'
import * as H from '../../../helpers/index';
// //////////////////////////////////////////////

export const ProjectDetailsPage = forwardRef(({
  description,
  featured,
  logo,
  screenshot,
  tags,
  logoImg,
  title,
  logoImgPath,
  details=[],
  screenshotImg,
  screenshotImgPath,
}, ref) => {
  const refEl = useRef(null);
  const clsWrap = [classes.DetailsPageWrap]
  const cls = [classes.Project];
  if (H.convertToBoolean(logo)){
    if (H.convertToBoolean(screenshot)) {
      if (!H.convertToBoolean(featured)) {
        cls.push(classes.withScreenshot)
      }
    } else {
      cls.push(classes.withoutScreenshot)
      clsWrap.push(classes.withoutScreenshot)
    }
  } else {
    cls.push(classes.withoutLogo)
  }
  useImperativeHandle(refEl, () => ({
    transformTextFontSize: H.transformTextFontSize(refEl)
  }));
  return (
    <div className={clsWrap.join(' ')}>
      <div className={cls.join(' ')}>
        {
          H.convertToBoolean(featured)
          ? (
            <div className={classes.titleMain}>
              {
                logoImg && 
                <div className={classes.logo}>
                  <img src={logoImg} alt="logo"/>
                </div>
              }
              <div>
                <h1 ref={refEl}>{title}</h1>
              </div>
            </div>
          )
          : (
            <div className={classes.title}>
              {
                logoImg && 
                <div className={classes.logo}>
                  <img src={logoImg} alt="logo"/>
                </div>
              }
              <div>
                <h1 ref={refEl}>{title}</h1>
              </div>
            </div>
          )
        }
        <div className={classes.contentWrap}>
          <div  className={classes.bgBlur} />
          <div>
            {
              details && Object.values(details).map((item, i) => {
                const clsContent = [classes.content]
                if (!item.image) {
                  clsContent.push(classes.noImage)
                }
                return (
                  <div key={i} className={clsContent.join(' ')}>
                    <div className={classes.description}>
                      <p>{item.text}</p>
                    </div>
                    {
                      item.image
                      ? <div className={classes.image}>
                          <img src={item.image} alt="project"/>
                        </div>
                      : null
                    }
                  </div>
              )})
            }
          </div>
        </div>
      </div>
    </div>
  )
});

export default ProjectDetailsPage;
