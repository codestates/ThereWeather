"use strict"
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.STRING,
            },
            post_photo: {
                type: Sequelize.STRING,
            },
            post_title: {
                type: Sequelize.STRING,
            },
            post_content: {
                type: Sequelize.STRING,
            },
            weather: {
                type: Sequelize.STRING,
            },
            wind: {
                type: Sequelize.STRING,
            },
            temp: {
                type: Sequelize.STRING,
            },
            top_id: {
                type: Sequelize.STRING,
            },
            bottom_id: {
                type: Sequelize.STRING,
            },
            xLocation: {
                type: Sequelize.NUMERIC(20, 15),
            },
            yLocation: {
                type: Sequelize.NUMERIC(20, 15),
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
        await queryInterface.dropTable("posts")
    },
}
