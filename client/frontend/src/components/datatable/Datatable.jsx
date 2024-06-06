import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Spinner from '../../components/Spinner' // Import the Spinner component
import PropTypes from 'prop-types';

const Datatable = ({ title, rows, columns, getData }) => {
  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="datatable">
      {Array.isArray(rows) && rows.length > 0 ? (
        <DataGrid
          className="dataGrid"
          title={title}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableColumnFilter
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
          getRowId={(row) => row._id}
        />
      ) : (
        <Spinner />
      )}
      
    </div>
  );
};
Datatable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
  
 
};

export default Datatable;