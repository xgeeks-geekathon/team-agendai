const router = {
    routes: [{
        method: 'GET',
        path: '/jiras/tickets',
        handler: 'api::jira.jira.tickets',
    }],
};

export default router;