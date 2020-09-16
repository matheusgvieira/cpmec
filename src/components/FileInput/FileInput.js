import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { setArrayFiles, setAllArrayFiles } from '../../store/actions/fileAction';

import './FileInput.scss';

function FileInput(props) {
  const { setFiles, files, nameDocument, setAllFiles } = props;
  const [currentFile, setCurrentFile] = useState({});
  const [threIsFile, setThreIsFile] = useState(false);
  const random = Math.floor(Math.random() * 1000);
  const alert = useAlert();
  let typeName;

  function handleGetFile(e) {
    if (e.target.files) {
      if (e.target.files[0].size > 2000000) {
        alert.error('Arquivo não deve ser maior 2MB');
        return;
      }
      setCurrentFile(e.target.files[0]);
      setThreIsFile(true);
      setFiles(e.target.files[0]);
    }
  }

  function removeFile() {
    typeName = files.map((file) => Object.keys(file).find((element) => element === 'name_origin'));

    if (typeName === 'name_origin') {
      setAllFiles(files.filter((file) => file.name_origin !== currentFile.name_origin));
    } else {
      setAllFiles(files.filter((file) => file.name !== currentFile.name));
    }
    setThreIsFile(false);
  }

  return (
    <div className="file-input-container">
      <div className="name-document">
        {threIsFile ? (
          <div className="file-name">
            {currentFile.name}
            <button type="button" onClick={removeFile}>
              <CloseIcon />
            </button>
          </div>
        ) : (
          <p>{nameDocument}</p>
        )}
      </div>
      <label className="custom-file-upload" htmlFor={`file${random}`}>
        <input
          type="file"
          onChange={handleGetFile}
          id={`file${random}`}
          accept=".pdf, .doc, .jgp, .jpeg, .png"
        />
        <AddIcon />
        <p>Anexar Arquivo</p>
      </label>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    files: state.file.files,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFiles(newState) {
      const action = setArrayFiles(newState);
      dispatch(action);
    },
    setAllFiles(newState) {
      const action = setAllArrayFiles(newState);
      dispatch(action);
    },
  };
}

FileInput.propTypes = {
  setFiles: PropTypes.func.isRequired,
  setAllFiles: PropTypes.func.isRequired,
  files: PropTypes.objectOf(PropTypes.any).isRequired,
  nameDocument: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInput);
