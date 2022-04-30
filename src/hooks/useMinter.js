import { useContext } from 'react';
import MinterContext from '../contexts/MinterContext';

const useMinter = () => useContext(MinterContext);

export default useMinter;
