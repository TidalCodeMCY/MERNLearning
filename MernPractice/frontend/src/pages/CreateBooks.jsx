import { useState } from "react";
import React from 'react';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CreateBooks() {
  const[title, setTitle] = useState('');
  const[author, setAuthor] = useState('');
  const[publishYear, setPublishYear] = useState('');
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened please check console!');
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Create Book</h1>
      {loading ? <Spinner /> : ''}
      
    </div>
  )
}
