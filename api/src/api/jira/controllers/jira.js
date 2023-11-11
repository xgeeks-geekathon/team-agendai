'use strict';

/**
 * jira controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::jira.jira');

const controller = createCoreController('api::jira.jira', ({ strapi }) =>  ({
    async tickets(ctx) {
        return ctx.body = 'hello world'
    } }));

module.exports = controller;
