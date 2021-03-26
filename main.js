// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, arr) => {
  return {
    specimenNum : num,
    dna: arr,
    mutate () {
      randIndex = Math.floor(Math.random()*this.dna.length);
      randBase = this.dna[randIndex];
      while (randBase != this.dna[randIndex]) randBase = returnRandBase();
      this.dna[randIndex] = randBase;
      return this.dna;
    },
    compareDNA(pAequor) {
      let count = 0;
      const sharedLength = 16;
      for (let i = 0 ; i < sharedLength ; i++) {
        if (this.dna[i] == pAequor.dna[i]) count++;
      }
      const percent = (count/sharedLength)*100;
      console.log(`specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percent}% DNA in common`);
    },
    willLikelySurvive(){
      let count = 0;
      this.dna.forEach(base => {if (base == 'C' || base == 'G') count++;});
      if ((count/this.dna.length)>=0.6) return true;
      else return false;
    },
    complementStrand(){
      return this.dna.map(base => {
        switch (base) {
          case 'A':
            return 'T';
          case 'T':
            return 'A';
          case 'G':
            return 'C';
          case 'C':
            return 'G';
          default:
            break;
        }
      });
    },
  };
}

arr = [];

for (let i = 0 ; i < 30; i++) arr.push(pAequorFactory(i, mockUpStrand()));

// console.log(pAequorFactory(1, ['A','A','T','C','G']).complementStrand());