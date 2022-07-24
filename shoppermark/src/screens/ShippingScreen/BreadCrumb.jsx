import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsIcon from '@mui/icons-material/Payments';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ShippingBreadCrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}
  aria-label="breadcrumb">
        <Link
          to="/login"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <LockOpenIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Login
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <LocalShippingIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Shipping
        </Typography>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <PaymentsIcon  sx={{ mr: 0.5 }} fontSize="inherit" />
          Payment
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <ShoppingBagIcon  sx={{ mr: 0.5 }} fontSize="inherit" />
          Place Order
        </Link>
      </Breadcrumbs>
    </div>
  );
}
