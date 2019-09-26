params => {
  function randomTenCharacterString() {
    // from https://gist.github.com/6174/6062387
    return Math.random().toString(36).substring(2, 15)
  }
  
  return randomTenCharacterString();
}
