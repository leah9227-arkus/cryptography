import md5 from 'js-md5';
import jsSHA from 'jssha';

const SHA_TYPE = {
  SHA256: 'SHA-256',
  SHA512: 'SHA-512',
};

const useHashCypher = () => {
  // get this from environment variable or json file config
  const passwordSalt = 123124443333;

  const doSHA = ({
    shaType = SHA_TYPE.SHA256,
    word = '',
  }) => {
    // eslint-disable-next-line new-cap
    const shaObj = new jsSHA(shaType, 'TEXT', { encoding: 'UTF8' });
    shaObj.update(`${word}${passwordSalt}`);
    return shaObj.getHash('HEX');
  };

  const doMD5 = (word = '') => {
    const hash = md5.create();
    hash.update(`${passwordSalt}${word}`);
    return hash.hex();
  };

  return {
    doMD5,
    doSHA,
    SHA_TYPE,
  };
};

export { useHashCypher };
