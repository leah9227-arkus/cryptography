import { useMemo, useState } from 'react';
import { useHashCypher } from './hooks';
import { OPTIONS } from './constants';

import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [option, setOption] = useState(OPTIONS.MD5);

  const {
    doMD5,
    doSHA,
    SHA_TYPE,
  } = useHashCypher();

  const passwordHashed = useMemo(() => {
    if (!password) {
      return '';
    }

    switch (option) {
      default:
      case OPTIONS.MD5:
        return doMD5(password);
        
      case OPTIONS.SHA256:
        return doSHA({
          shaType: SHA_TYPE.SHA256,
          word: password,
        });

      case OPTIONS.SHA512:
        return doSHA({
          shaType: SHA_TYPE.SHA512,
          word: password,
        });
    }
  }, [password, doSHA, SHA_TYPE, doMD5, option]);

  const onPasswordChanged = ({ target: { value }}) => {
    setPassword(value);
  };

  const onOptionPress = (opt) => () => {
    setOption(opt);
  };

  return (
    <div className="App">
      <fieldset className='App-fieldset'>
        <legend>Crypto type</legend>

        <label htmlFor='md5-input'>
          MD5
          <input
            id='md5-input'
            type='radio'
            checked={option === OPTIONS.MD5}
            onChange={onOptionPress(OPTIONS.MD5)}
          />
        </label>

        <label htmlFor='sha256-input'>
          SHA256
          <input
            id='sha256-input'
            type='radio'
            checked={option === OPTIONS.SHA256}
            onChange={onOptionPress(OPTIONS.SHA256)}
          />
        </label>

        <label htmlFor='sha512-input'>
          SHA512
          <input
            id='sha512-input'
            type='radio'
            checked={option === OPTIONS.SHA512}
            onChange={onOptionPress(OPTIONS.SHA512)}
          />
        </label>
      </fieldset>

      <div className='App-password-container'>
        <label>
          Password

          <input value={password} onChange={onPasswordChanged} />
        </label>
      </div>

      <p>Password hashed: {passwordHashed}</p>
    </div>
  );
}

export default App;
