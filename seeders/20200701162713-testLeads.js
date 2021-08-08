'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("leads", [
      {
        company_name: "La Fiorita",
        associated_company_name: null,
        company_phone: "12345678",
        contact_person: "Pietje",
        company_address: "Tweede Tuindwarsstraat 12 H, 1015 RZ Amsterdam",
        supplier: "Makro",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        salesCyclePhaseId: 5,
        contactId: 1,
        lat: 52.377070,
        lng: 4.881680
      },
      {
        company_name: "Scheepskameel",
        associated_company_name: null,
        company_phone: "203379680",
        contact_person: "Pietje",
        company_address: "Gebouw 024A, Kattenburgerstraat 5, 1018 JA Amsterdam",
        supplier: "Hanos",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        salesCyclePhaseId: 2,
        contactId: 3,
        lat: 52.371800,
        lng: 4.916270
      },
      {
        company_name: "Karavaan",
        associated_company_name: "De 3 Wijzen uit 't Oosten",
        company_phone: "202357177",
        contact_person: "Pietje",
        company_address: "Kwakersplein 2, 1053 TZ Amsterdam",
        supplier: "Sligro",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
        salesCyclePhaseId: 1,
        contactId: 2,
        lat: 52.369130,
        lng: 4.870380
      },
      {
        company_name: "Café Cómodo",
        associated_company_name: null,
        company_phone: "202252687",
        contact_person: "Pietje",
        company_address: "Jan Pieter Heijestraat 110, 1054 MH Amsterdam",
        supplier: "de Kweker",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        salesCyclePhaseId: 3,
        contactId: 2,
        lat: 52.362780,
        lng: 4.863690
      },
      {
        company_name: "Festina Lente",
        associated_company_name: null,
        company_phone: "206381412",
        contact_person: "Pietje",
        company_address: "Looiersgracht 40B, 1016 VS Amsterdam",
        supplier: "Hanos",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
        salesCyclePhaseId: 4,
        contactId: 4,        
        lat: 52.368680,
        lng: 4.881410
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("leads", null, {});
  }
};
