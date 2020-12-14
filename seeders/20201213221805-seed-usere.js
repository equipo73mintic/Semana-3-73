'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('users', [{

      name: 'Wolfgang Santamaria',
      email: 'santamaria.wolfgang@gmail.com',
      password: '$2y$08$VQh3f1cDQXwHFY8x00WVmur1kTMHlG3P5TZThMHqdmuTBIzBGNuyi', //12345678
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {

      name: 'carlos',
      email: 'ejemplo@gmail.com',
      password: '$2y$08$OQFYylFmPLTLbxFvXpMvhO9d9vl87gPsk0JJaMOqe8eDia/MAGD12', //micontraseña
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});



  }
};
