import React, { useState } from 'react';

import SearchIcon from '@material-ui/icons/Search';

import Navbar from '../../components/Navbar/Navbar';
import Backbutton from '../../components/BackButton/Backbutton';
import Input from '../../components/Input/Input';

import { Questions } from './Questions';

import './Faq.scss';
import '../../global.scss';

export default function Faq() {
  const [contentSearch, setContentSearch] = useState('');
  const [toggleSearch, setToggleSearch] = useState(false);
  function handleSearch(e) {
    e.preventDefault();
    if (contentSearch) {
      setToggleSearch(true);
    } else {
      setToggleSearch(false);
    }
  }

  function handleSeachFilter() {
    return Questions.filter((question) => question.question.indexOf(contentSearch) > -1).map(
      (ques) => (
        <div key={ques.value} className="question-answer">
          <strong>{ques.question}</strong>
          <p>{ques.answer}</p>
        </div>
      ),
    );
  }

  function handleListQuestion() {
    return Questions.map((question) => (
      <div key={question.value} className="question-answer">
        <strong>{question.question}</strong>
        <p>{question.answer}</p>
      </div>
    ));
  }
  return (
    <div className="faq-container">
      <header>
        <Navbar />
      </header>

      <main>
        <div className="title">
          <Backbutton Redirect="/" />
          <h1>Me ajuda</h1>
        </div>
        <div className="search">
          <Input label="Pesquisar" onChange={(e) => setContentSearch(e.target.value)} />
          <button type="button" onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>

        <div className="faq">{toggleSearch ? handleSeachFilter() : handleListQuestion()}</div>
      </main>
    </div>
  );
}
