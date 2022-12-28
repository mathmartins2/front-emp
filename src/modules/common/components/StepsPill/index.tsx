import ICreate from './interface';
import React from 'react';

import styled from './style.module.scss';

const StepsInPill = ({road, step }:ICreate) => {
    return (
      <div className={styled["container"]}>
        <div className={styled["numberStep"]}>
          {step} 
        </div>
        <div className={styled["border"]}></div>
        <div className={styled["titleStep"]}>
          {road}
        </div>
      </div>
    );
  };
export default StepsInPill