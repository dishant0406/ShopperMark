import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';

const Pageinate = ({page, pages, keyword='', isAdmin=false}) => {
  const history = useHistory()
  // const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    if(!isAdmin){
      if(keyword!==''){
        history.push(`/search/${keyword}/page/${value}`)
      }else{
        history.push(`/page/${value}`)
      }
    }else{
      history.push(`/admin/productlist/page/${value}`)
    }
  };

  return (
    <Stack spacing={2}>
      <Pagination variant="outlined" shape="rounded" count={pages} page={page} onChange={handleChange} />
    </Stack>
  );
  }
export default Pageinate