const router = {
    routes: [{
        method: 'GET',
        path: '/connect/google',
        handler: 'google-auth.connect',
        config: {
            auth: false,
        },
    }, {
        method: 'GET',
        path: '/connect/google/callback',
        handler: 'google-auth.callback',
        config: {
            auth: false,
        },
    }],
};

export default router;
