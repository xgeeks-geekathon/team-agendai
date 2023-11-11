'use strict';

/**
 * jira service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::jira.jira');
