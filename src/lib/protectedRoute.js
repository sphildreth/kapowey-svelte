export function protectedRoute(session, base, role) {
    let hasRole = role;
    if(hasRole) {
        if(session.user) {
            hasRole = session.user[role] != null;
        }
    }
    console.log({role: role, hasRole: hasRole})
    if(!session.user && hasRole) {
        return {
            redirect: '/login',
            status: 303
        }
    }
    return base;
}