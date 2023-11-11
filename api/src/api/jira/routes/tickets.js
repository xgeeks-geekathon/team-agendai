const routes = {
    routes: [{
        method: 'GET',
        path: '/jira/tickets',
        handler: 'api::jira.jira.tickets',
    }],
};

module.exports = routes;