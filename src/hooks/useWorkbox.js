import { useContext } from 'react';

import { WorkboxContext } from 'src/contexts/WorkboxContext';

const useWorkbox = () => useContext(WorkboxContext);

export default useWorkbox;
