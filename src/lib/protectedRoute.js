export function protectedRoute(session, base, role, returnUrl) {
    let hasRole = true;
    if(role) {
        if(session.user) {
            hasRole = session.user[role] != null;
        }
    }
    if(!session.user || (session.user && !hasRole)) {
        return {
            redirect: `/login?returnUrl=${ returnUrl ? Buffer.from(returnUrl).toString('base64') : '' }`,
            status: 303
        }
    }
    return base;
}