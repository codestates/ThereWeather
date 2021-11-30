"use strict"
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("emailauths", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            temporary_id: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            code: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("emailauths")
    },
}
