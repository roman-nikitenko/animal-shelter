import React, { useRef, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import classNames from 'classnames';
import { useOnClickOutSide } from '../servoces/useOnClickOutSide';

type Props = {
  title: string;
  subTitle: string;
  dropdownList: string[];
}

export const DropDown: React.FC<Props> = ({ title, dropdownList, subTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState(title)
  const dropdownRef = useRef(null);

  const openHandler = () => {
    setIsOpen(prevState => !prevState)
  }

  useOnClickOutSide(dropdownRef, () => {
    setIsOpen(false);
  })

  const chooseHandler = (item: string) => {
    setInputTitle(item);
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="dropdown">
      <label className="dropdown__box" htmlFor="">
        <p className="dropdown__subtitle">{subTitle}</p>
         <button id="" className="dropdown__button" onClick={openHandler}>
           {inputTitle}
           <IoIosArrowDown className={classNames({
             "rotate" : isOpen,
           })} size={20} />
         </button>
        <div className={classNames("dropdown__list", {
          "is-open" : isOpen,
        })}>
          {dropdownList.map(item => (
            <div onClick={() => chooseHandler(item)} className="dropdown__list-item">{item}</div>
          ))}
        </div>
      </label>

    </div>
  );
};
