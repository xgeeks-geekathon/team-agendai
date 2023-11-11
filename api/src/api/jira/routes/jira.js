'use strict';

/**
 * jira router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::jira.jira');
