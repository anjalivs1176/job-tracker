import React from 'react';
import { useParams } from 'react-router-dom';

const EditJobPage = () => {
  const { id } = useParams();
  return <h2>Edit Job ID: {id}</h2>;
};

export default EditJobPage;
