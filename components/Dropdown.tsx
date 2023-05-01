import { useState } from 'react';
import { ChevronDown } from 'react-feather';

interface DropdownProps {
    placeHolder: string;
    options: number[];
    onChange: (value: number) => void;
  }

const Dropdown = ({ placeHolder, options, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [changedHolder, setChangedHolder] = useState<null | number>(null)
  
  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item: number) => {
    onChange(item);
    setIsOpen(false);
    setChangedHolder(item)
  };

  return (
    <div className="relative mr-2">
        {/* {changedHolder !== null && <><label className='text-xs text-slate-400'>{placeHolder}</label>
        <br/></>
        } */}
        <button
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center space-x-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <br/>
        <span>{changedHolder ?? placeHolder}</span>
        <label className='text-xs text-slate-400'>{changedHolder ? placeHolder :''}</label>
        <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="absolute max-h-28 overflow-y-auto z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map(item => {
                return <div onClick={(event) => handleOptionClick(item)} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    {item}
                </div>
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
