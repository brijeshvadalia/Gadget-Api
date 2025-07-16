const codenames = [
  'Nightingale', 'Kraken', 'Phoenix', 'Valkyrie', 'Cerberus', 
  'Griffin', 'Minotaur', 'Sphinx', 'Chimera', 'Basilisk'
];

module.exports = () => {
  const prefix = ['The', 'Operation', 'Project', 'Code'];
  return `${prefix[Math.floor(Math.random() * prefix.length)]} ${codenames[Math.floor(Math.random() * codenames.length)]}`;
};